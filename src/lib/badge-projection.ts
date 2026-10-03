import type { Quaternion, Vec3 } from './badge-physics';

export type Projection = { x: number; y: number; distance: number };
export type RibbonSurface = { back: string[]; front: string[]; edge: string; frontEdge: string };

export function rotatePoint(v: Vec3, q: Quaternion): Vec3 {
  const tx = 2 * (q.y * v.z - q.z * v.y);
  const ty = 2 * (q.z * v.x - q.x * v.z);
  const tz = 2 * (q.x * v.y - q.y * v.x);
  return { x: v.x + q.w * tx + q.y * tz - q.z * ty, y: v.y + q.w * ty + q.z * tx - q.x * tz, z: v.z + q.w * tz + q.x * ty - q.y * tx };
}

export function projectPoint(point: Vec3, camera: Projection) {
  const scale = camera.distance / Math.max(camera.distance * 0.08, camera.distance - point.z);
  return { x: camera.x + point.x * scale, y: camera.y + point.y * scale };
}

export function cardShadowPath(card: { position: Vec3; rotation: Quaternion }, width: number, height: number, camera: Projection): string {
  const wall = -height * 1.2 / 4.44;
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => {
    const point = rotatePoint({ x: x * width / 2, y: y * height / 2, z: 0 }, card.rotation);
    const depth = Math.max(0, point.z + card.position.z - wall);
    return projectPoint({ x: point.x + card.position.x + depth * 0.4, y: point.y + card.position.y + depth * 0.7, z: wall }, camera);
  });
  return corners.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join('') + 'Z';
}

function subtract(a: Vec3, b: Vec3): Vec3 { return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }; }
function cross(a: Vec3, b: Vec3): Vec3 { return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x }; }
function normalize(v: Vec3): Vec3 { const length = Math.hypot(v.x, v.y, v.z) || 1; return { x: v.x / length, y: v.y / length, z: v.z / length }; }
function dot(a: Vec3, b: Vec3) { return a.x * b.x + a.y * b.y + a.z * b.z; }

function sampleCurve(points: Vec3[]) {
  const sampled: Vec3[] = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[Math.max(0, index - 1)], p1 = points[index], p2 = points[index + 1], p3 = points[Math.min(points.length - 1, index + 2)];
    for (let step = 0; step < 5; step += 1) {
      const t = step / 5, t2 = t * t, t3 = t2 * t;
      const axis = (key: keyof Vec3) => 0.5 * ((2 * p1[key]) + (-p0[key] + p2[key]) * t + (2 * p0[key] - 5 * p1[key] + 4 * p2[key] - p3[key]) * t2 + (-p0[key] + 3 * p1[key] - 3 * p2[key] + p3[key]) * t3);
      sampled.push({ x: axis('x'), y: axis('y'), z: axis('z') });
    }
  }
  sampled.push(points[points.length - 1]);
  return sampled;
}

/** Project both edges of a 3D cloth strip, including its narrowing and twist. */
export function ribbonSurface(points: Vec3[], endRotation: Quaternion, width: number, camera: Projection, card: { position: Vec3; rotation: Quaternion }, cardSize: { width: number; height: number }): RibbonSurface {
  const surface: RibbonSurface = { back: ['', '', ''], front: ['', '', ''], edge: '', frontEdge: '' };
  if (points.length < 2) return surface;
  // Contact keeps physics particles outside the card. Keep interpolated cloth
  // between those particles outside its surface as well, including at corners.
  const inverse = { x: -card.rotation.x, y: -card.rotation.y, z: -card.rotation.z, w: card.rotation.w };
  const avoidCard = (point: Vec3) => {
    const local = rotatePoint(subtract(point, card.position), inverse);
    const half = { x: cardSize.width / 2 + width / 2, y: cardSize.height / 2 + width / 2, z: cardSize.height / 4.44 * 0.14 };
    const gap = { x: half.x - Math.abs(local.x), y: half.y - Math.abs(local.y), z: half.z - Math.abs(local.z) };
    if (gap.x <= 0 || gap.y <= 0 || gap.z <= 0) return point;
    const axis = gap.x < gap.y && gap.x < gap.z ? 'x' : gap.y < gap.z ? 'y' : 'z';
    local[axis] = Math.sign(local[axis] || 1) * half[axis];
    const outside = rotatePoint(local, card.rotation);
    return { x: outside.x + card.position.x, y: outside.y + card.position.y, z: outside.z + card.position.z };
  };
  const sampled = sampleCurve(points).map(avoidCard);
  const endNormal = rotatePoint({ x: 0, y: 0, z: 1 }, endRotation);
  const cardNormal = rotatePoint({ x: 0, y: 0, z: 1 }, card.rotation);
  const light = normalize({ x: -0.4, y: -0.3, z: 1 });
  let previousSide: Vec3 = { x: -1, y: 0, z: 0 };
  const strips = sampled.map((point, index) => {
    const tangent = normalize(subtract(sampled[Math.min(sampled.length - 1, index + 1)], sampled[Math.max(0, index - 1)]));
    const blend = (index / (sampled.length - 1)) ** 3;
    const normal = normalize({ x: endNormal.x * blend, y: endNormal.y * blend, z: 1 + (endNormal.z - 1) * blend });
    const axis = cross(tangent, normal);
    let side = Math.hypot(axis.x, axis.y, axis.z) > 0.05 ? normalize(axis) : previousSide;
    if (dot(side, previousSide) < 0) side = { x: -side.x, y: -side.y, z: -side.z };
    previousSide = side;
    const edge = (sign: number) => projectPoint(avoidCard({ x: point.x + side.x * width / 2 * sign, y: point.y + side.y * width / 2 * sign, z: point.z + side.z * width / 2 * sign }), camera);
    const facing = Math.abs(dot(normalize(cross(side, tangent)), light));
    return { point, left: edge(-1), right: edge(1), shade: facing < 0.45 ? 0 : facing < 0.82 ? 1 : 2 };
  });
  for (let index = 0; index < strips.length - 1; index += 1) {
    const a = strips[index], b = strips[index + 1];
    const isFront = dot(subtract(a.point, card.position), cardNormal) > 2;
    const group = isFront ? surface.front : surface.back;
    group[a.shade] += `M${a.left.x},${a.left.y}L${a.right.x},${a.right.y}L${b.right.x},${b.right.y}L${b.left.x},${b.left.y}Z`;
    const edge = `M${a.left.x},${a.left.y}L${b.left.x},${b.left.y}`;
    if (isFront) surface.frontEdge += edge;
    else surface.edge += edge;
  }
  return surface;
}
