'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { BadgeGeometry, BadgeSnapshot, Quaternion, Vec3 } from '../lib/badge-physics';

type BadgeSize = { width: number; height: number; badgeTop: number; badgeHeight: number };
type Props = {
  snapshot: BadgeSnapshot;
  geometry: BadgeGeometry;
  size: BadgeSize;
  theme?: 'light' | 'dark';
  onReady?: () => void;
  onError?: () => void;
};

type Controller = {
  draw(snapshot: BadgeSnapshot, geometry: BadgeGeometry, size: BadgeSize, theme?: Props['theme']): void;
  dispose(): void;
};

const STRIP_SEGMENTS = 80;
const STRIP_THICKNESS = 1.1;
const FRONT_FACE_DEPTH = 0.105;
const CAMERA_MARGIN = 160;

function worldPoint(point: Vec3): THREE.Vector3 {
  return new THREE.Vector3(point.x, -point.y, point.z);
}

function worldRotation(rotation: Quaternion): THREE.Quaternion {
  // Physics snapshots are reflected into CSS's downward Y axis.
  return new THREE.Quaternion(-rotation.x, rotation.y, -rotation.z, rotation.w).normalize();
}

function setPose(group: THREE.Object3D, pose: { position: Vec3; rotation: Quaternion }) {
  group.position.copy(worldPoint(pose.position));
  group.quaternion.copy(worldRotation(pose.rotation));
}

function tube(points: Array<[number, number, number]>, radius: number, closed = false): THREE.TubeGeometry {
  return new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), closed, 'centripetal'),
    Math.max(24, points.length * 9), radius, 10, closed,
  );
}

function wovenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#e2e4de';
  context.fillRect(0, 0, 32, 32);
  for (let offset = 0; offset < 32; offset += 4) {
    context.fillStyle = 'rgb(181 190 178 / 42%)';
    context.fillRect(offset, 0, 1, 32);
    context.fillRect(0, offset, 32, 1);
    context.fillStyle = 'rgb(255 255 255 / 28%)';
    context.fillRect(offset + 1, 0, 1, 32);
    context.fillRect(0, offset + 1, 32, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function ribbonGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const vertexCount = (STRIP_SEGMENTS + 1) * 4;
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(vertexCount * 2), 2));
  const indices: number[] = [];
  for (let index = 0; index < STRIP_SEGMENTS; index += 1) {
    const a = index * 4;
    const b = a + 4;
    indices.push(
      a, a + 1, b, b, a + 1, b + 1, // front woven face
      a + 2, b + 2, a + 3, b + 2, b + 3, a + 3, // reverse face
      a + 2, a, b + 2, b + 2, a, b, // first woven edge
      a + 1, a + 3, b + 1, b + 1, a + 3, b + 3, // other edge
    );
  }
  const end = STRIP_SEGMENTS * 4;
  indices.push(0, 2, 1, 1, 2, 3, end, end + 1, end + 2, end + 1, end + 3, end + 2);
  geometry.setIndex(indices);
  return geometry;
}

function foldedTabGeometry(): THREE.BufferGeometry {
  // One continuous piece of webbing passes in front of the ring's top bar,
  // curls underneath it, then returns behind it as the sewn overlap.
  const profile = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 25, 3.7), new THREE.Vector3(0, 14, 3.7),
    new THREE.Vector3(0, 9, 3.6), new THREE.Vector3(0, 6.7, 2),
    new THREE.Vector3(0, 7, -1.1), new THREE.Vector3(0, 10, -2.6),
    new THREE.Vector3(0, 18, -2.6),
  ], false, 'centripetal');
  const geometry = ribbonGeometry();
  const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
  const uvs = geometry.getAttribute('uv') as THREE.BufferAttribute;
  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  let distance = 0;
  let previous = profile.getPoint(0);
  for (let index = 0; index <= STRIP_SEGMENTS; index += 1) {
    const t = index / STRIP_SEGMENTS;
    const center = profile.getPoint(t);
    distance += center.distanceTo(previous);
    previous = center;
    tangent.copy(profile.getTangent(t)).normalize();
    normal.set(0, tangent.z, -tangent.y).normalize().multiplyScalar(STRIP_THICKNESS / 2);
    const halfWidth = (18 - 4 * Math.min(1, t * 2)) / 2;
    const base = index * 4;
    for (let corner = 0; corner < 4; corner += 1) {
      const edge = corner % 2 ? halfWidth : -halfWidth;
      const face = corner < 2 ? 1 : -1;
      positions.setXYZ(base + corner, edge, center.y + normal.y * face, center.z + normal.z * face);
      uvs.setXY(base + corner, corner % 2, distance / 13);
    }
  }
  geometry.computeVertexNormals();
  return geometry;
}

function keepOutsideCard(
  point: THREE.Vector3,
  cardPosition: THREE.Vector3,
  inverseCardRotation: THREE.Quaternion,
  cardRotation: THREE.Quaternion,
  geometry: BadgeGeometry,
  width: number,
) {
  const local = point.clone().sub(cardPosition).applyQuaternion(inverseCardRotation);
  const half = {
    x: geometry.width / 2 + width / 2,
    y: geometry.height / 2 + width / 2,
    z: geometry.height / 4.44 * 0.14,
  };
  const gap = { x: half.x - Math.abs(local.x), y: half.y - Math.abs(local.y), z: half.z - Math.abs(local.z) };
  if (gap.x <= 0 || gap.y <= 0 || gap.z <= 0) return point;
  const axis = gap.x < gap.y && gap.x < gap.z ? 'x' : gap.y < gap.z ? 'y' : 'z';
  // A strand already behind the card must stay behind when its interpolated
  // curve enters the collider; pushing it toward the camera exposes it there.
  const direction = axis === 'z'
    ? (local.z > geometry.height / 4.44 * FRONT_FACE_DEPTH ? 1 : -1)
    : Math.sign(local[axis] || 1);
  local[axis] = direction * half[axis];
  return point.copy(local.applyQuaternion(cardRotation).add(cardPosition));
}

function updateRibbon(
  mesh: THREE.Mesh<THREE.BufferGeometry>,
  points: Vec3[],
  side: -1 | 1,
  connector: BadgeSnapshot['connector'],
  card: BadgeSnapshot,
  geometry: BadgeGeometry,
  width: number,
) {
  mesh.visible = points.length >= 2;
  if (!mesh.visible) return;
  const connectorRotation = worldRotation(connector.rotation);
  const connectorPosition = worldPoint(connector.position);
  const end = new THREE.Vector3(side * 4.2, 22, 3.2)
    .applyQuaternion(connectorRotation).add(connectorPosition);
  // The final physics node lies inside the folded tab. Let the visible webbing
  // enter its upper edge without curling back around that hidden node.
  const controls = points.slice(0, points.length > 3 ? -2 : -1).map(worldPoint);
  controls.push(end);
  const curve = new THREE.CatmullRomCurve3(controls, false, 'centripetal');
  const cardPosition = worldPoint(card.position);
  const cardRotation = worldRotation(card.rotation);
  const inverseCardRotation = cardRotation.clone().invert();
  const sampled = Array.from({ length: STRIP_SEGMENTS + 1 }, (_, index) =>
    keepOutsideCard(curve.getPoint(index / STRIP_SEGMENTS), cardPosition, inverseCardRotation, cardRotation, geometry, width));
  const positions = mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
  const uvs = mesh.geometry.getAttribute('uv') as THREE.BufferAttribute;
  const identity = new THREE.Quaternion();
  const orientation = new THREE.Quaternion();
  const normal = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  let previousSide = new THREE.Vector3(-1, 0, 0);
  let distance = 0;

  for (let index = 0; index <= STRIP_SEGMENTS; index += 1) {
    const t = index / STRIP_SEGMENTS;
    if (index) distance += sampled[index].distanceTo(sampled[index - 1]);
    tangent.subVectors(sampled[Math.min(index + 1, STRIP_SEGMENTS)], sampled[Math.max(0, index - 1)]).normalize();
    const turn = THREE.MathUtils.clamp((t - 0.62) / 0.38, 0, 1);
    orientation.slerpQuaternions(identity, connectorRotation, turn * turn * (3 - 2 * turn));
    normal.set(0, 0, 1).applyQuaternion(orientation);
    sideVector.crossVectors(tangent, normal);
    if (sideVector.lengthSq() < 0.0025) sideVector.copy(previousSide);
    else sideVector.normalize();
    if (sideVector.dot(previousSide) < 0) sideVector.negate();
    previousSide.copy(sideVector);
    const taper = THREE.MathUtils.clamp((t - 0.68) / 0.32, 0, 1);
    const halfWidth = width * (1 - 0.38 * taper * taper * (3 - 2 * taper)) / 2;
    const front = normal.clone().multiplyScalar(STRIP_THICKNESS / 2);
    const edge = sideVector.clone().multiplyScalar(halfWidth);
    const base = index * 4;
    const vertices = [
      sampled[index].clone().sub(edge).add(front),
      sampled[index].clone().add(edge).add(front),
      sampled[index].clone().sub(edge).sub(front),
      sampled[index].clone().add(edge).sub(front),
    ];
    vertices.forEach((vertex, corner) => {
      positions.setXYZ(base + corner, vertex.x, vertex.y, vertex.z);
      uvs.setXY(base + corner, corner % 2, distance / 13);
    });
  }
  positions.needsUpdate = true;
  uvs.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
}

function clipGeometry(height: number): THREE.TubeGeometry {
  const slotY = height * 0.45675 - (height / 2 - 3);
  const hardwareZ = 0.03 * height / 4.44;
  const frontZ = height / 4.44 * FRONT_FACE_DEPTH + 4.5 - hardwareZ;
  // The crossbar lies on the card/clasp hinge axis, inside the slot. The
  // visible branches curl forward from that axis and remain rigid with clasp.
  const points = [
    new THREE.Vector3(-1.8, 20, 0), new THREE.Vector3(-1.8, 9, 0),
    new THREE.Vector3(-2.2, 6, frontZ),
    new THREE.Vector3(-2.2, slotY + 7, frontZ),
    new THREE.Vector3(-2.2, slotY + 1.5, frontZ - 2),
    new THREE.Vector3(-2.2, slotY, 0),
    new THREE.Vector3(0, slotY, 0),
    new THREE.Vector3(2.2, slotY, 0),
    new THREE.Vector3(2.2, slotY + 1.5, frontZ - 2),
    new THREE.Vector3(2.2, slotY + 7, frontZ),
    new THREE.Vector3(2.2, 6, frontZ),
    new THREE.Vector3(2.7, 6, 3), new THREE.Vector3(2.7, 18, 0.5),
    new THREE.Vector3(0, 22, 0), new THREE.Vector3(-1.8, 20, 0),
  ];
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, 'centripetal'), 48, 1.15, 8, false);
}

function cardMaskGeometry(width: number, height: number, depth: number): THREE.ExtrudeGeometry {
  const slotWidth = width * 0.21;
  const slotHeight = height * 0.0165;
  const slotY = height * 0.45675;
  const outline = new THREE.Shape();
  outline.moveTo(-width / 2, -height / 2);
  outline.lineTo(width / 2, -height / 2);
  outline.lineTo(width / 2, height / 2);
  outline.lineTo(-width / 2, height / 2);
  outline.closePath();
  const slot = new THREE.Path();
  slot.moveTo(-slotWidth / 2, slotY - slotHeight / 2);
  slot.lineTo(-slotWidth / 2, slotY + slotHeight / 2);
  slot.lineTo(slotWidth / 2, slotY + slotHeight / 2);
  slot.lineTo(slotWidth / 2, slotY - slotHeight / 2);
  slot.closePath();
  outline.holes.push(slot);
  const mask = new THREE.ExtrudeGeometry(outline, { depth: depth * 2, bevelEnabled: false, steps: 1 });
  mask.translate(0, 0, -depth);
  return mask;
}

function createController(host: HTMLDivElement): Controller {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  try {
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.82;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.pointerEvents = 'none';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 12000);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x49554b, 0.95));
  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(-250, 330, 570);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -1300;
  key.shadow.camera.right = 1300;
  key.shadow.camera.top = 1600;
  key.shadow.camera.bottom = -1000;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 3000;
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.bias = -0.0002;
  key.shadow.radius = 3.5;
  key.shadow.blurSamples = 6;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcadce0, 0.35);
  fill.position.set(260, -160, 380);
  scene.add(fill);

  const fabricTexture = wovenTexture();
  const fabric = new THREE.MeshStandardMaterial({
    color: 0x252b25, map: fabricTexture, roughness: 0.96, metalness: 0.02, side: THREE.DoubleSide,
  });
  const tabFabric = new THREE.MeshStandardMaterial({
    color: 0x272e27, map: fabricTexture, roughness: 0.94, metalness: 0.02, side: THREE.DoubleSide,
  });
  const stitch = new THREE.MeshStandardMaterial({ color: 0x768273, roughness: 0.95 });
  const steel = new THREE.MeshStandardMaterial({
    color: 0x85958e, metalness: 1, roughness: 0.27, envMapIntensity: 0.75,
  });
  const darkSteel = new THREE.MeshStandardMaterial({
    color: 0x63756c, metalness: 1, roughness: 0.33, envMapIntensity: 0.65,
  });
  const occluderMaterial = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true, side: THREE.DoubleSide });
  const shadowMaterial = new THREE.ShadowMaterial({ color: 0x090d0b, opacity: 0.12 });
  const shadowReceiver = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMaterial);
  shadowReceiver.receiveShadow = true;
  scene.add(shadowReceiver);
  const ribbons = [
    new THREE.Mesh(ribbonGeometry(), fabric),
    new THREE.Mesh(ribbonGeometry(), fabric),
  ] as const;
  ribbons.forEach(mesh => { mesh.frustumCulled = false; mesh.castShadow = true; scene.add(mesh); });

  // This shape writes depth only. The actual badge remains the interactive DOM card.
  const cardMask = new THREE.Mesh<THREE.BufferGeometry>(new THREE.BoxGeometry(1, 1, 1), occluderMaterial);
  cardMask.renderOrder = -100;
  scene.add(cardMask);

  const connector = new THREE.Group();
  const ring = new THREE.Mesh(tube([
    [-11, 10, 0], [-12, -5, 0], [-10, -13, 0], [-5, -17, 0],
    [0, -18, 0], [5, -17, 0], [10, -13, 0], [12, -5, 0], [11, 10, 0], [0, 11, 0],
  ], 1.85, true), steel);
  connector.add(ring);
  const tab = new THREE.Mesh(foldedTabGeometry(), tabFabric);
  connector.add(tab);
  for (const y of [19, 16]) {
    const seam = new THREE.Mesh(tube([[-6.3, y, 4.3], [0, y, 4.3], [6.3, y, 4.3]], 0.28), stitch);
    connector.add(seam);
  }
  connector.traverse(object => { if (object instanceof THREE.Mesh) object.castShadow = true; });
  scene.add(connector);

  const eye = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 25, 14), steel);
  eye.add(stem);
  const swivel = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.7, 5.5, 14), darkSteel);
  swivel.position.y = -1;
  eye.add(swivel);
  stem.castShadow = true;
  swivel.castShadow = true;
  scene.add(eye);

  const clasp = new THREE.Group();
  const wire = new THREE.Mesh(new THREE.BufferGeometry(), steel);
  wire.castShadow = true;
  clasp.add(wire);
  scene.add(clasp);

  let cameraSize = '';
  let cardWidth = 0;
  let cardHeight = 0;

  function draw(snapshot: BadgeSnapshot, geometry: BadgeGeometry, size: BadgeSize, theme?: Props['theme']) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dimensionKey = [size.width, size.height, size.badgeTop, size.badgeHeight, geometry.height, geometry.perspective,
      viewportWidth, viewportHeight, window.devicePixelRatio].join('/');
    if (cameraSize !== dimensionKey) {
      cameraSize = dimensionKey;
      const rect = host.getBoundingClientRect();
      const left = Math.ceil(Math.max(350, rect.left + CAMERA_MARGIN));
      const right = Math.ceil(Math.max(350, viewportWidth - rect.right + CAMERA_MARGIN));
      const top = Math.ceil(Math.max(350, rect.top + CAMERA_MARGIN));
      const bottom = Math.ceil(Math.max(350, viewportHeight - rect.bottom + CAMERA_MARGIN));
      const canvasWidth = Math.ceil(size.width + left + right);
      const canvasHeight = Math.ceil(size.height + top + bottom);
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(8_000_000 / (canvasWidth * canvasHeight)));
      renderer.setPixelRatio(dpr);
      renderer.setSize(canvasWidth, canvasHeight, false);
      renderer.domElement.style.width = `${canvasWidth}px`;
      renderer.domElement.style.height = `${canvasHeight}px`;
      renderer.domElement.style.left = `${-left}px`;
      renderer.domElement.style.top = `${-top}px`;
      const distance = geometry.perspective ?? geometry.height * 3.4;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(canvasHeight / (2 * distance)));
      camera.aspect = canvasWidth / canvasHeight;
      camera.position.set(0, 0, distance);
      camera.updateProjectionMatrix();
      const cx = left + size.width / 2;
      const cy = top + size.badgeTop + size.badgeHeight / 2;
      camera.projectionMatrix.elements[8] = 1 - 2 * cx / canvasWidth;
      camera.projectionMatrix.elements[9] = 2 * cy / canvasHeight - 1;
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    }

    const isDark = theme === 'dark' || (theme === undefined && document.documentElement.dataset.theme === 'dark');
    fabric.color.setHex(isDark ? 0x424b3e : 0x252b25);
    tabFabric.color.setHex(isDark ? 0x394238 : 0x272e27);
    shadowMaterial.opacity = isDark ? 0.18 : 0.12;
    shadowReceiver.position.z = -geometry.height * 1.2 / 4.44;
    shadowReceiver.scale.set(Math.max(size.width, viewportWidth) * 2, Math.max(size.height, viewportHeight) * 2, 1);
    setPose(cardMask, snapshot);
    const depth = geometry.height / 4.44 * FRONT_FACE_DEPTH;
    if (geometry.width !== cardWidth || geometry.height !== cardHeight) {
      cardMask.geometry.dispose();
      cardMask.geometry = cardMaskGeometry(geometry.width, geometry.height, depth);
      wire.geometry.dispose();
      wire.geometry = clipGeometry(geometry.height);
      cardWidth = geometry.width;
      cardHeight = geometry.height;
    }
    setPose(connector, snapshot.connector);
    setPose(eye, snapshot.eye);
    setPose(clasp, snapshot.clasp);
    const ribbonWidth = size.width <= 500 ? 12 : 14;
    updateRibbon(ribbons[0], snapshot.leftStrap, -1, snapshot.connector, snapshot, geometry, ribbonWidth);
    updateRibbon(ribbons[1], snapshot.rightStrap, 1, snapshot.connector, snapshot, geometry, ribbonWidth);
    renderer.render(scene, camera);
  }

  function dispose() {
    ribbons.forEach(mesh => mesh.geometry.dispose());
    cardMask.geometry.dispose();
    shadowReceiver.geometry.dispose();
    connector.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
    eye.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
    clasp.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
    [fabric, tabFabric, stitch, steel, darkSteel, occluderMaterial, shadowMaterial].forEach(material => material.dispose());
    fabricTexture.dispose();
    environment.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }

  return { draw, dispose };
  } catch (error) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    throw error;
  }
}

export default function BadgeAccessories3D({ snapshot, geometry, size, theme, onReady, onError }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const latestRef = useRef({ snapshot, geometry, size, theme });
  const readyRef = useRef(onReady);
  const errorRef = useRef(onError);
  latestRef.current = { snapshot, geometry, size, theme };
  readyRef.current = onReady;
  errorRef.current = onError;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let controller: Controller | null = null;
    try {
      controller = createController(host);
      controllerRef.current = controller;
      const current = latestRef.current;
      controller.draw(current.snapshot, current.geometry, current.size, current.theme);
      readyRef.current?.();
    } catch (error) {
      controller?.dispose();
      controllerRef.current = null;
      console.warn('Badge 3D accessories could not start.', error);
      errorRef.current?.();
      return;
    }
    const redraw = () => {
      const current = latestRef.current;
      controller.draw(current.snapshot, current.geometry, current.size, current.theme);
    };
    const observeTheme = new MutationObserver(() => {
      if (latestRef.current.theme === undefined) redraw();
    });
    observeTheme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', redraw);
    return () => {
      window.removeEventListener('resize', redraw);
      observeTheme.disconnect();
      controllerRef.current = null;
      controller.dispose();
    };
  }, []);

  useEffect(() => {
    controllerRef.current?.draw(snapshot, geometry, size, theme);
  }, [snapshot, geometry, size, theme]);

  return <div ref={hostRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'visible', pointerEvents: 'none' }} />;
}
