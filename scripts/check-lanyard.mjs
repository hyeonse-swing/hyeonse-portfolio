import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as THREE from 'three';
import ts from 'typescript';

const portfolio = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(process.argv[2] || `${portfolio}/src/components/Lanyard.tsx`, 'utf8');
const prefix = source.slice(source.indexOf('const CARD_SIZES'), source.indexOf('const buildEnvironment'));
const simulation = source.slice(source.indexOf('const createSimulation'), source.indexOf('const Lanyard = ('));
const frameView = source.slice(source.indexOf('    const frameView = () => {'), source.indexOf('    const apply = () => {'));
const physics = source.slice(source.indexOf('    const physics = (): Physics => {'), source.indexOf('    const snapshotVisualPose = () => {'));
const band = source.slice(source.indexOf('    const updateBand = () => {'), source.indexOf('    const render = () => {'));
assert(prefix.includes('const buildBandGeometry'));
assert(prefix.includes('const buildClampGeometry'));
assert(simulation.includes('const stepSimulation'));
const javascript = ts.transpileModule(`${prefix}\n${simulation}\n${frameView}\n${physics}\n${band}`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None }
}).outputText;
const context = vm.createContext({ THREE, console });
vm.runInContext(javascript, context);
vm.runInContext(`
  const sim = createSimulation();
  const layout = cardLayout('portrait', 0.2, 0.785);
  sim.rest = 0.5;
  const view = { width: 1440, height: 880 };
  const settingsRef = { current: {
    cardRect: { left: 557, top: 360, width: 326, height: 326 / 0.785 },
    size: 0.6, anchor: 'center', strapLength: 0.5,
    gravity: 1, elasticity: 0.45, damping: 0.7, breeze: 0
  } };
  const foilUniforms = {
    foilKey: { value: new THREE.Vector3() },
    foilFill: { value: new THREE.Vector3() },
    foilTop: { value: new THREE.Vector3() }
  };
  const controlPoints = Array.from({ length: 2 }, () => []);
  const curves = controlPoints.map(points => new THREE.CatmullRomCurve3(points, false, 'centripetal'));
  const cordNodes = Array.from({ length: 2 }, () =>
    Array.from({ length: JOINTS }, () => new THREE.Vector3()));
  const attachments = [new THREE.Vector3(), new THREE.Vector3()];
  const approaches = [new THREE.Vector3(), new THREE.Vector3()];
  const terminalBends = [new THREE.Vector3(), new THREE.Vector3()];
  const terminalLeads = [new THREE.Vector3(), new THREE.Vector3()];
  const tucks = [new THREE.Vector3(), new THREE.Vector3()];
  const points = Array.from({ length: 2 }, () =>
    Array.from({ length: SAMPLES }, () => new THREE.Vector3()));
  const sides = Array.from({ length: 2 }, () =>
    Array.from({ length: SAMPLES }, () => new THREE.Vector3()));
  const tangents = Array.from({ length: 2 }, () =>
    Array.from({ length: SAMPLES }, () => new THREE.Vector3()));
  const cordRows = Array.from({ length: 2 }, () =>
    Array.from({ length: SAMPLES }, () =>
      BAND_COLUMNS.map(() => new THREE.Vector3())));
  const protectedRows = Array.from({ length: SAMPLES }, () => false);
  const bends = BAND_BEND.map(angle => [Math.cos(angle), Math.sin(angle)]);
  const inverseCardRotation = new THREE.Quaternion();
  let contactSide = 1;
  let clearContactFrames = 5;
  const work = {
    tangent: new THREE.Vector3(), toCamera: new THREE.Vector3(), across: new THREE.Vector3(),
    facing: new THREE.Vector3(), radial: new THREE.Vector3(), sideCandidate: new THREE.Vector3(),
    cardUp: new THREE.Vector3(), cardRight: new THREE.Vector3(), worldRight: new THREE.Vector3()
  };
  const bandGeometries = Array.from({ length: 2 }, () => buildBandGeometry(SAMPLES));
  const bandShadowGeometries = Array.from({ length: 2 }, () => buildBandGeometry(SAMPLES));
  const clampGroups = [-1, 1].map(() => {
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(buildClampGeometry(STRAP_WIDTH * 0.4));
    mesh.position.y = EYELET_RADIUS + CLAMP_BODY / 2 - 0.004;
    group.add(mesh);
    return group;
  });
  const camera = new THREE.PerspectiveCamera(FOV, view.width / view.height, 0.1, 100);
  const strapScale = STRAP_WIDTH * 0.4;
  const tileRatio = 2;
  let bandBackZ = Infinity;
  globalThis.harness = {
    sim, layout, view, settingsRef, camera, attachments, approaches, terminalBends, terminalLeads, tucks, cordNodes, controlPoints, points, protectedRows,
    bandGeometries, clampGroups, strapScale, cardGeometry: buildCardGeometry(layout), updateBand, frameView, physics,
    placeHanging, stepSimulation,
    state: () => ({ contactSide, clearContactFrames }),
    reset: () => { contactSide = 1; clearContactFrames = 5; sides.forEach(rows => rows.forEach(v => v.set(0, 0, 0))); }
  };
`, context);

const h = context.harness;
const cardBox = new THREE.Box3(
  new THREE.Vector3(-h.layout.width / 2, -h.layout.height / 2, -0.016),
  new THREE.Vector3(h.layout.width / 2, h.layout.height / 2, 0.016)
);
const tri = new THREE.Triangle();
const inverse = new THREE.Quaternion();
const vertices = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
const face = h.cardGeometry.face;
const facePositions = face.getAttribute('position');
const faceIndex = face.getIndex();
for (const slot of h.layout.slots) {
  assert(Math.abs(slot.x) + slot.width / 2 < h.layout.width / 2, 'slot exceeds card width');
  assert(h.layout.ringY - 0.095 >= slot.y - slot.height / 2,
    'ring lower arc misses its slot');
  const holeCenter = new THREE.Vector3(slot.x, slot.y, 0);
  const faceCount = faceIndex?.count ?? facePositions.count;
  for (let i = 0; i < faceCount; i += 3) {
    for (let j = 0; j < 3; j++)
      vertices[j].fromBufferAttribute(facePositions, faceIndex ? faceIndex.getX(i + j) : i + j);
    tri.set(vertices[0], vertices[1], vertices[2]);
    assert(!tri.containsPoint(holeCenter), `card face covers slot at x=${slot.x}`);
  }
}
const assertClear = label => {
  inverse.copy(h.sim.body.quaternion).invert();
  for (let cord = 0; cord < 2; cord++) {
    const geometry = h.bandGeometries[cord];
    const position = geometry.getAttribute('position');
    const index = geometry.getIndex();
    for (let i = 0; i < index.count; i += 3) {
      for (let j = 0; j < 3; j++) {
        vertices[j].fromBufferAttribute(position, index.getX(i + j))
          .sub(h.sim.body.position).applyQuaternion(inverse);
      }
      tri.set(vertices[0], vertices[1], vertices[2]);
      assert(!cardBox.intersectsTriangle(tri), `${label}: strap ${cord} triangle ${i / 3} enters card`);
    }
    const group = h.clampGroups[cord];
    group.updateMatrixWorld(true);
    const clampMesh = group.children[0];
    const clampPosition = clampMesh.geometry.getAttribute('position');
    const clampIndex = clampMesh.geometry.getIndex();
    const count = clampIndex?.count ?? clampPosition.count;
    for (let i = 0; i < count; i += 3) {
      for (let j = 0; j < 3; j++) {
        vertices[j].fromBufferAttribute(clampPosition, clampIndex ? clampIndex.getX(i + j) : i + j)
          .applyMatrix4(clampMesh.matrixWorld).sub(h.sim.body.position).applyQuaternion(inverse);
      }
      tri.set(vertices[0], vertices[1], vertices[2]);
      assert(!cardBox.intersectsTriangle(tri), `${label}: clamp ${cord} triangle ${i / 3} enters card`);
    }
    const last = (72 - 1) * 4;
    const attachment = h.attachments[cord];
    const expected = new THREE.Vector3((cord === 0 ? -1 : 1) * h.layout.width * 0.32,
      h.layout.height / 2 + 0.04, 0).applyQuaternion(h.sim.body.quaternion).add(h.sim.body.position);
    assert(attachment.distanceTo(expected) < 1e-8, `${label}: attachment not bound to card corner`);
    assert(group.position.distanceTo(attachment) < 1e-8, `${label}: clamp not joined to attachment`);
    const left = new THREE.Vector3().fromBufferAttribute(position, last);
    const right = new THREE.Vector3().fromBufferAttribute(position, last + 3);
    assert(left.add(right).multiplyScalar(0.5).distanceTo(h.tucks[cord]) < 1e-5,
      `${label}: strap terminal detached from clamp`);
  }
};

const ribbonMetrics = () => {
  let minWidth = Infinity;
  let minProjected = Infinity;
  let minAdjacent = Infinity;
  let adjacentAt = '';
  for (const [cord, geometry] of h.bandGeometries.entries()) {
    const position = geometry.getAttribute('position');
    let previous = null;
    for (let row = 0; row < 72; row++) {
      const left = new THREE.Vector3().fromBufferAttribute(position, row * 4);
      const right = new THREE.Vector3().fromBufferAttribute(position, row * 4 + 3);
      const width = right.sub(left);
      minWidth = Math.min(minWidth, width.length());
      minProjected = Math.min(minProjected, Math.hypot(width.x, width.y));
      if (previous) {
        const dot = width.clone().normalize().dot(previous);
        if (dot < minAdjacent) { minAdjacent = dot; adjacentAt = `${cord}:${row}`; }
      }
      previous = width.normalize();
    }
  }
  return { minWidth, minProjected, minAdjacent, adjacentAt };
};

// A compact measured viewport yields a short, valid hanging segment. The old
// fixed approach control sat above the last physics guide and folded the cord back.
h.view.width = 390;
h.view.height = 600;
h.settingsRef.current.cardRect = { left: 82.5, top: 132, width: 225, height: 225 / 0.785 };
h.frameView();
h.placeHanging(h.sim, h.layout, false);
h.updateBand();
assert(h.controlPoints[0][3].y > h.approaches[0].y,
  'short initial rest: centerline doubles back before the metal');
h.sim.rest = 0.5;
h.camera.position.set(0, 0, 10);

const setNodes = (rotation, lift, zBias = 0) => {
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation));
  h.sim.body.quaternion.copy(q);
  h.sim.body.position.set(0, 0, 0);
  const hang = new THREE.Vector3(0, h.layout.hangY, 0).applyQuaternion(q);
  if (lift) {
    h.sim.nodes[0].set(-0.5, 2.1, zBias);
    h.sim.nodes[1].set(-0.35, 1.35, zBias);
    h.sim.nodes[2].set(-0.18, 0.9, zBias);
    h.sim.nodes[3].set(-0.03, 0.58, zBias);
  } else {
    h.sim.nodes[0].copy(hang).add(new THREE.Vector3(0, 2, zBias));
    h.sim.nodes[1].copy(hang).add(new THREE.Vector3(0, 1.4, zBias));
    h.sim.nodes[2].copy(hang).add(new THREE.Vector3(0, 0.9, zBias));
    h.sim.nodes[3].copy(hang).add(new THREE.Vector3(0, 0.45, zBias));
  }
  h.sim.nodes[4].copy(hang);
};

let cases = 0;
for (const [name, rotation, lift] of [
  ['rest', [0, 0, 0], false],
  ['upward-lift', [0, 0, 0], true],
  ['back-lift', [0, Math.PI, 0], true],
  ['side-lift', [0, Math.PI / 2, 0], true],
  ['inverted-lift', [0, 0, Math.PI], true],
  ['tilted-front', [0.25, 0.45, -0.3], true]
]) {
  h.reset();
  setNodes(rotation, lift);
  h.updateBand();
  assertClear(name);
  const metrics = ribbonMetrics();
  assert(metrics.minWidth > 0.1439, `${name}: ribbon loses its specified width`);
  assert(metrics.minAdjacent > 0.2, `${name}: adjacent width axes invert ${JSON.stringify(metrics)}`);
  cases++;
}

// A centered lift makes the physics chain and each strap's attachment collinear.
// The outward turn must still open a visible return path without moving the endpoint.
h.reset();
setNodes([0, 0, 0], false);
h.sim.nodes[0].set(0, 2.1, 0);
h.sim.nodes[1].set(0, 1.35, 0);
h.sim.nodes[2].set(0, 0.9, 0);
h.sim.nodes[3].set(0, 0.58, 0);
h.updateBand();
assertClear('centered lift');
for (let cord = 0; cord < 2; cord++) {
  const sign = cord === 0 ? -1 : 1;
  const outwardReturn = sign * (h.cordNodes[cord][3].x - h.attachments[cord].x);
  assert(outwardReturn > 0.17, `strap ${cord}: compressed return does not open outward`);
  assert(Math.abs(h.terminalLeads[cord].x - h.attachments[cord].x) < 1e-8,
    `cord ${cord}: endpoint lead lost its straight top tangent`);
}
cases++;

h.reset();
const contactSides = [];
for (let i = 0; i <= 12; i++) {
  setNodes([0, Math.PI * i / 12, 0], true, 0.08);
  h.updateBand();
  assertClear(`flip frame ${i}`);
  assert(ribbonMetrics().minAdjacent > 0.2, `flip frame ${i}: adjacent width axes invert`);
  if (h.protectedRows.some(Boolean)) contactSides.push(h.state().contactSide);
}
assert(contactSides.length > 3 && contactSides.every(side => side === contactSides[0]),
  `contact side popped: ${contactSides}`);
const geometrySnapshot = () => h.bandGeometries.map(geometry =>
  Array.from(geometry.getAttribute('position').array));
const assertSwivel = label => {
  h.sim.twist = 0;
  h.reset();
  h.updateBand();
  const reference = geometrySnapshot();
  for (const twist of [-Math.PI * 2, -Math.PI, Math.PI, Math.PI * 2]) {
    h.sim.twist = twist;
    h.reset();
    h.updateBand();
    const positions = geometrySnapshot();
    for (let cord = 0; cord < 2; cord++) {
      for (let i = 0; i < positions[cord].length; i++) {
        assert(Math.abs(positions[cord][i] - reference[cord][i]) < 1e-5,
          `${label}: accumulated physics twist ${twist} deforms ribbon ${cord} vertex ${i}`);
      }
    }
  }
};
const assertBroad = label => {
  const metrics = ribbonMetrics();
  assert(metrics.minWidth > 0.1439, `${label}: ribbon narrower than 0.144`);
  assert(metrics.minProjected > 0.12, `${label}: broad face pinches edge-on`);
  assert(metrics.minAdjacent > 0.5, `${label}: adjacent width axes invert`);
};

const restLengths = {};
for (const [label, viewportWidth, viewportHeight, top, cardWidth] of [
  ['desktop', 1440, 880, 360, 326],
  ['mobile', 390, 772, 312, 225],
  ['short-rest', 390, 600, 132, 225]
]) {
  h.view.width = viewportWidth;
  h.view.height = viewportHeight;
  h.settingsRef.current.cardRect = {
    left: (viewportWidth - cardWidth) / 2,
    top,
    width: cardWidth,
    height: cardWidth / 0.785
  };
  h.frameView();
  h.placeHanging(h.sim, h.layout, false);
  h.reset();
  h.updateBand();
  restLengths[label] = h.sim.rest;
  assertBroad(`${label} initial rest`);
  assertClear(`${label} initial rest`);
  for (let cord = 0; cord < 2; cord++) {
    const attachment = h.attachments[cord];
    const controls = h.controlPoints[cord];
    for (let i = 0; i < controls.length - 1; i++) {
      assert(controls[i].y >= controls[i + 1].y - 1e-8,
        `${label}: centerline doubles back at control ${i}`);
    }
    const approachHeight = h.approaches[cord].y - attachment.y;
    const bendHeight = h.terminalBends[cord].y - attachment.y;
    const leadHeight = h.terminalLeads[cord].y - attachment.y;
    const clampTop = 0.036 + 0.15 - 0.004;
    assert(approachHeight - clampTop < 0.1 && approachHeight - clampTop > 0.04,
      `${label}: fabric becomes rigid too far above the clamp`);
    assert(approachHeight > bendHeight && bendHeight > leadHeight && leadHeight > clampTop,
      `${label}: terminal approach controls are not ordered above clamp`);
  }
  assertSwivel(`${label} initial rest`);
  if (label !== 'short-rest') {
    h.sim.turn = Math.PI;
    h.sim.body.angular.set(0, 9, 0);
    for (let frame = 0; frame < 300; frame++) h.stepSimulation(h.sim, 1 / 60, h.physics(), frame / 60);
    h.reset();
    h.updateBand();
    assert(Math.abs(h.sim.twist - Math.PI) < 0.01 && h.sim.calm > 1,
      'source physics did not settle at the flipped pose');
    assertBroad('settled flipped');
    assertClear('settled flipped');
    assertSwivel('settled flipped');
    h.sim.turn = 0;
    h.sim.body.angular.set(0, -9, 0);
    for (let frame = 0; frame < 300; frame++) h.stepSimulation(h.sim, 1 / 60, h.physics(), 5 + frame / 60);
    h.reset();
    h.updateBand();
    assert(Math.abs(h.sim.twist) < 0.01 && h.sim.calm > 1,
      'source physics did not settle back at the front pose');
    assertBroad('settled returned front');
    assertClear('settled returned front');
  }
}
console.log(`PASS ${cases} posed twin-strap/clamp cases, ${contactSides.length} flip-contact frames, desktop/mobile/short rest ${Object.values(restLengths).map(x => x.toFixed(3)).join('/')}, desktop/mobile settled flip and return`);
