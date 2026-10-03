import type { Collider, RevoluteImpulseJoint, RigidBody, World } from '@dimforge/rapier3d-compat';

export type Point = { x: number; y: number };
export type Vec3 = Point & { z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type BadgeGeometry = {
  width: number;
  height: number;
  anchorY: number;
  anchorHalfWidth: number;
  perspective?: number;
};
export type HardwarePose = { position: Vec3; rotation: Quaternion };
export type BadgeSnapshot = {
  position: Vec3;
  rotation: Quaternion;
  connector: HardwarePose;
  eye: HardwarePose;
  clasp: HardwarePose;
  leftStrap: Vec3[];
  rightStrap: Vec3[];
};

export interface BadgePhysics {
  snapshot(): BadgeSnapshot;
  grab(pointer: Point): void;
  moveGrab(pointer: Point): void;
  nudge(pointer: Point, movement: Point): void;
  release(): void;
  step(elapsedSeconds: number): BadgeSnapshot;
  isSettled(): boolean;
  reset(): BadgeSnapshot;
  dispose(): void;
}

type RapierModule = typeof import('@dimforge/rapier3d-compat');
type Grip = { local: Vec3; target: Vec3 };
type Rig = {
  world: World;
  card: RigidBody;
  clasp: RigidBody;
  eye: RigidBody;
  yoke: RigidBody;
  straps: [RigidBody[], RigidBody[]];
  strapColliders: [Collider[], Collider[]];
};

const DT = 1 / 120;
const MAX_CATCHUP = 1 / 10;
const SEGMENTS = 12;
const DRAG_STIFFNESS = 144;
const DRAG_DAMPING = 24;
const MAX_DRAG_FORCE = 99.36;
const RING_HALF_SPAN_PX = 1.5;
const STRAP_END_Y = 0.04;
const FRONT_FACE_DEPTH = 0.105;
const STRAP_RADIUS = 0.11;
const WALL_DEPTH = -1;
const CARD_CONTACT_GROUP = 0x00010006;
const STRAP_CONTACT_GROUP = 0x00020005;
const WALL_CONTACT_GROUP = 0x0004000b;
const HARDWARE_CONTACT_GROUP = 0x00080004;
const SPRING_SETTINGS = [
  { stiffness: 54, damping: 1.15 },
  { stiffness: 90, damping: 1.485 },
  { stiffness: 40.5, damping: 0.996 },
] as const;
const ZERO: Vec3 = { x: 0, y: 0, z: 0 };
const IDENTITY: Quaternion = { x: 0, y: 0, z: 0, w: 1 };

let rapierReady: Promise<RapierModule> | undefined;

function loadRapier(): Promise<RapierModule> {
  rapierReady ??= import('@dimforge/rapier3d-compat')
    .then(async rapier => {
      await rapier.init();
      return rapier;
    })
    .catch(error => {
      rapierReady = undefined;
      throw error;
    });
  return rapierReady;
}

function ringHeight(geometry: BadgeGeometry): number {
  return geometry.height / 2 + 54;
}

function claspHeight(geometry: BadgeGeometry): number {
  return geometry.height / 2 - 3;
}

function eyeHeight(geometry: BadgeGeometry): number {
  return geometry.height / 2 + 30;
}

function cardAttachmentHeight(geometry: BadgeGeometry): number {
  return geometry.height * 0.45675;
}

function toPhysics(point: Vec3, pixelsPerMeter: number): Vec3 {
  return { x: point.x / pixelsPerMeter, y: -point.y / pixelsPerMeter, z: point.z / pixelsPerMeter };
}

function toCss(point: Vec3, pixelsPerMeter: number): Vec3 {
  return { x: point.x * pixelsPerMeter, y: -point.y * pixelsPerMeter, z: point.z * pixelsPerMeter };
}

function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function subtract(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function scale(v: Vec3, amount: number): Vec3 {
  return { x: v.x * amount, y: v.y * amount, z: v.z * amount };
}

function magnitude(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}

function rotationFromY(direction: Vec3): Quaternion {
  const length = magnitude(direction);
  if (length < 1e-8) return IDENTITY;
  const unit = scale(direction, 1 / length);
  if (unit.y < -1 + 1e-8) return { x: 1, y: 0, z: 0, w: 0 };
  const quaternion = { x: unit.z, y: 0, z: -unit.x, w: 1 + unit.y };
  const norm = Math.hypot(quaternion.x, quaternion.z, quaternion.w);
  return { x: quaternion.x / norm, y: 0, z: quaternion.z / norm, w: quaternion.w / norm };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function rotate(v: Vec3, q: Quaternion): Vec3 {
  const cross = {
    x: q.y * v.z - q.z * v.y,
    y: q.z * v.x - q.x * v.z,
    z: q.x * v.y - q.y * v.x,
  };
  const doubled = scale(cross, 2);
  return add(v, add(scale(doubled, q.w), {
    x: q.y * doubled.z - q.z * doubled.y,
    y: q.z * doubled.x - q.x * doubled.z,
    z: q.x * doubled.y - q.y * doubled.x,
  }));
}

function inverseRotate(v: Vec3, q: Quaternion): Vec3 {
  return rotate(v, { x: -q.x, y: -q.y, z: -q.z, w: q.w });
}

function yawOf(q: Quaternion): number {
  return Math.atan2(
    2 * (q.x * q.z + q.w * q.y),
    1 - 2 * (q.x * q.x + q.y * q.y),
  );
}

function isFinitePoint(point: Point): boolean {
  return Number.isFinite(point.x) && Number.isFinite(point.y);
}

function restingStrap(geometry: BadgeGeometry, side: -1 | 1): Vec3[] {
  const top = { x: side * geometry.anchorHalfWidth, y: geometry.anchorY, z: -0.25 * geometry.height / 4.44 };
  const end = {
    x: side * RING_HALF_SPAN_PX,
    y: -ringHeight(geometry) - STRAP_END_Y * geometry.height / 4.44,
    z: 0.03 * geometry.height / 4.44,
  };
  return Array.from({ length: SEGMENTS + 2 }, (_, index) => {
    const t = Math.min(index / SEGMENTS, 1);
    return { x: top.x * (1 - t) + end.x * t, y: top.y * (1 - t) + end.y * t, z: top.z * (1 - t) + end.z * t };
  });
}

export function createRestSnapshot(geometry: BadgeGeometry): BadgeSnapshot {
  const hardwareZ = 0.03 * geometry.height / 4.44;
  return {
    position: { x: 0, y: 0, z: 0 },
    rotation: { ...IDENTITY },
    connector: { position: { x: 0, y: -ringHeight(geometry), z: hardwareZ }, rotation: { ...IDENTITY } },
    eye: { position: { x: 0, y: -eyeHeight(geometry), z: hardwareZ }, rotation: { ...IDENTITY } },
    clasp: { position: { x: 0, y: -claspHeight(geometry), z: hardwareZ }, rotation: { ...IDENTITY } },
    leftStrap: restingStrap(geometry, -1),
    rightStrap: restingStrap(geometry, 1),
  };
}

class RapierBadgePhysics implements BadgePhysics {
  private readonly pixelsPerMeter: number;
  private readonly ringHalfSpan: number;
  private readonly cameraDistance: number;
  private rig: Rig | undefined;
  private grip: Grip | undefined;
  private accumulator = 0;
  private quietSteps = 0;
  private restPosition: Vec3 = ZERO;
  private lastSnapshot: BadgeSnapshot;

  constructor(private readonly rapier: RapierModule, private readonly geometry: BadgeGeometry) {
    this.pixelsPerMeter = geometry.height / 4.44;
    this.ringHalfSpan = RING_HALF_SPAN_PX / this.pixelsPerMeter;
    this.cameraDistance = (geometry.perspective ?? geometry.height * 3.4) / this.pixelsPerMeter;
    this.lastSnapshot = createRestSnapshot(geometry);
    this.reset();
  }

  private buildRig(): Rig {
    const { rapier, geometry } = this;
    const world = new rapier.World({ x: 0, y: -9.81, z: 0 });
    world.timestep = DT;
    world.numSolverIterations = 32;
    world.numInternalPgsIterations = 4;

    const ringY = ringHeight(geometry) / this.pixelsPerMeter;
    const eyeY = eyeHeight(geometry) / this.pixelsPerMeter;
    const claspY = claspHeight(geometry) / this.pixelsPerMeter;
    const cardAttachY = cardAttachmentHeight(geometry) / this.pixelsPerMeter;
    const hardwareZ = 0.03;
    const wall = world.createRigidBody(rapier.RigidBodyDesc.fixed().setTranslation(0, 0, WALL_DEPTH));
    world.createCollider(
      new rapier.ColliderDesc(new rapier.HalfSpace({ x: 0, y: 0, z: 1 }))
        .setCollisionGroups(WALL_CONTACT_GROUP),
      wall,
    );
    const card = world.createRigidBody(
      rapier.RigidBodyDesc.dynamic()
        .setTranslation(0, 0, 0)
        .setLinearDamping(0.45)
        .setAngularDamping(0.65)
        .setCcdEnabled(true)
        .setCanSleep(false),
    );
    world.createCollider(
      rapier.ColliderDesc.cuboid(
        geometry.width / (2 * this.pixelsPerMeter),
        geometry.height / (2 * this.pixelsPerMeter),
        FRONT_FACE_DEPTH,
      ).setMass(0.72).setCollisionGroups(CARD_CONTACT_GROUP).setFriction(0.45).setRestitution(0),
      card,
    );

    const clasp = world.createRigidBody(
      rapier.RigidBodyDesc.dynamic()
        .setTranslation(0, claspY, hardwareZ)
        .setLinearDamping(0.5)
        .setAngularDamping(0.6)
        .setCcdEnabled(true)
        .setCanSleep(false),
    );
    world.createCollider(rapier.ColliderDesc.cuboid(0.21, 0.33, 0.13).setMass(0.09).setCollisionGroups(HARDWARE_CONTACT_GROUP).setFriction(0.45).setRestitution(0), clasp);
    world.createImpulseJoint(
      rapier.JointData.revolute(
        { x: 0, y: cardAttachY, z: hardwareZ },
        { x: 0, y: -(claspY - cardAttachY), z: 0 },
        { x: 1, y: 0, z: 0 },
      ),
      card,
      clasp,
      true,
    );

    const eye = world.createRigidBody(
      rapier.RigidBodyDesc.dynamic()
        .setTranslation(0, eyeY, hardwareZ)
        .setLinearDamping(0.5)
        .setAngularDamping(0.6)
        .setCcdEnabled(true)
        .setCanSleep(false),
    );
    world.createCollider(rapier.ColliderDesc.cuboid(0.22, 0.21, 0.09).setMass(0.055).setCollisionGroups(HARDWARE_CONTACT_GROUP).setFriction(0.45).setRestitution(0), eye);
    const claspEyeGap = eyeY - claspY;
    world.createImpulseJoint(
      rapier.JointData.revolute(
        { x: 0, y: claspEyeGap * 0.59, z: 0 },
        { x: 0, y: -claspEyeGap * 0.41, z: 0 },
        { x: 0, y: 1, z: 0 },
      ),
      clasp,
      eye,
      true,
    );

    const yoke = world.createRigidBody(
      rapier.RigidBodyDesc.dynamic()
        .setTranslation(0, ringY, hardwareZ)
        .setLinearDamping(0.5)
        .setAngularDamping(0.6)
        .setCcdEnabled(true)
        .setCanSleep(false),
    );
    world.createCollider(rapier.ColliderDesc.cuboid(0.1, 0.22, 0.08).setMass(0.045).setCollisionGroups(STRAP_CONTACT_GROUP).setFriction(0.45).setRestitution(0), yoke);
    const eyeYokeGap = ringY - eyeY;
    const eyeYokeJoint = rapier.JointData.revolute(
      { x: 0, y: eyeYokeGap * 0.45, z: 0 },
      { x: 0, y: -eyeYokeGap * 0.55, z: 0 },
      { x: 1, y: 0, z: 0 },
    );
    const foldJoint = world.createImpulseJoint(eyeYokeJoint, eye, yoke, true) as RevoluteImpulseJoint;
    foldJoint.setLimits(-1.15, 1.15);

    const straps: [RigidBody[], RigidBody[]] = [[], []];
    const strapColliders: [Collider[], Collider[]] = [[], []];
    for (const [strapIndex, side] of [-1, 1].entries()) {
      const anchor = toPhysics({ x: side * geometry.anchorHalfWidth, y: geometry.anchorY, z: -0.25 * this.pixelsPerMeter }, this.pixelsPerMeter);
      const ringEnd = { x: side * this.ringHalfSpan, y: ringY + STRAP_END_Y, z: hardwareZ };
      const strandLength = magnitude(subtract(anchor, ringEnd));
      const sectionLength = strandLength / SEGMENTS;
      const nodes: RigidBody[] = [
        world.createRigidBody(rapier.RigidBodyDesc.fixed().setTranslation(anchor.x, anchor.y, anchor.z)),
      ];
      const colliders: Collider[] = [];

      for (let index = 1; index <= SEGMENTS; index += 1) {
        const fraction = index / SEGMENTS;
        const node = world.createRigidBody(
          rapier.RigidBodyDesc.dynamic()
            .setTranslation(
              anchor.x * (1 - fraction) + ringEnd.x * fraction,
              anchor.y * (1 - fraction) + ringEnd.y * fraction,
              anchor.z * (1 - fraction) + hardwareZ * fraction,
            )
            .setLinearDamping(1.6)
            .setCcdEnabled(true)
            .setCanSleep(false),
        );
        node.setEnabledRotations(false, false, false, false);
        colliders.push(world.createCollider(
          rapier.ColliderDesc.capsule(sectionLength / 2, STRAP_RADIUS)
            .setMass(0.0125)
            .setCollisionGroups(STRAP_CONTACT_GROUP).setFriction(0.45).setRestitution(0),
          node,
        ));
        nodes.push(node);
      }
      nodes.push(yoke);

      for (let index = 1; index <= SEGMENTS; index += 1) {
        world.createImpulseJoint(
          rapier.JointData.rope(sectionLength * 1.001, ZERO, ZERO),
          nodes[index - 1],
          nodes[index],
          true,
        );
        for (let span = 1; span <= SPRING_SETTINGS.length && span <= index; span += 1) {
          const spring = SPRING_SETTINGS[span - 1];
          world.createImpulseJoint(
            rapier.JointData.spring(
              sectionLength * span,
              spring.stiffness,
              spring.damping,
              ZERO,
              ZERO,
            ),
            nodes[index - span],
            nodes[index],
            true,
          );
        }
      }
      world.createImpulseJoint(
        rapier.JointData.spherical(ZERO, { x: side * this.ringHalfSpan, y: STRAP_END_Y, z: 0 }),
        nodes[SEGMENTS],
        yoke,
        true,
      );
      straps[strapIndex] = nodes;
      strapColliders[strapIndex] = colliders;
    }
    return { world, card, clasp, eye, yoke, straps, strapColliders };
  }

  private updateStrapColliders(): void {
    const rig = this.rig!;
    for (const side of [0, 1] as const) {
      const nodes = rig.straps[side];
      for (let index = 1; index <= SEGMENTS; index += 1) {
        const previous = nodes[index - 1].translation();
        const current = nodes[index].translation();
        const segment = subtract(current, previous);
        const collider = rig.strapColliders[side][index - 1];
        collider.setTranslationWrtParent(scale(segment, -0.5));
        collider.setRotationWrtParent(rotationFromY(segment));
      }
    }
  }

  private applyForces(): void {
    const rig = this.rig!;
    const card = rig.card;
    card.resetForces(false);
    card.resetTorques(false);

    // The swivel permits pitch and roll; axial torque resists an unreadable full yaw.
    const q = card.rotation();
    const depth = card.translation().z;
    const depthSpeed = card.linvel().z;
    card.addForce({ x: 0, y: 0, z: -1.25 * depth - 1.6 * depthSpeed }, false);
    const yawError = yawOf(q);
    const yawSpeed = card.angvel().y;
    const yawRatio = Math.abs(yawError) / Math.PI;
    const torqueRate = -2.2 * yawError * (1 + 3 * yawRatio * yawRatio)
      - 0.65 * Math.sqrt(2.2) * yawSpeed;
    card.applyTorqueImpulse({ x: 0, y: Math.max(-18, Math.min(18, torqueRate)) * DT, z: 0 }, false);

    const yokeYaw = yawOf(rig.yoke.rotation());
    const yokeYawSpeed = rig.yoke.angvel().y;
    const yokeMoment = rig.yoke.principalInertia().y;
    const yokeImpulse = -(2 * yokeYaw + 0.12 * yokeYawSpeed) * DT
      / (1 + 0.12 * DT / yokeMoment + 2 * DT * DT / yokeMoment);
    rig.yoke.applyTorqueImpulse({ x: 0, y: yokeImpulse, z: 0 }, false);

    const dampJoint = (first: RigidBody, second: RigidBody, localAxis: Vec3, damping: number) => {
      const axis = rotate(localAxis, first.rotation());
      const relativeSpeed = dot(subtract(second.angvel(), first.angvel()), axis);
      const inverseMoment = (body: RigidBody) => {
        const inertia = body.effectiveWorldInvInertia();
        return axis.x * axis.x * inertia.m11 + axis.y * axis.y * inertia.m22 + axis.z * axis.z * inertia.m33
          + 2 * axis.x * axis.y * inertia.m12 + 2 * axis.x * axis.z * inertia.m13
          + 2 * axis.y * axis.z * inertia.m23;
      };
      const totalInverseMoment = inverseMoment(first) + inverseMoment(second);
      if (totalInverseMoment <= 0) return;
      // A fraction of the exact canceling impulse damps the free joint axis
      // without overshooting the tiny inertia of the metal links.
      const impulse = scale(axis, relativeSpeed * damping / totalInverseMoment);
      first.applyTorqueImpulse(impulse, false);
      second.applyTorqueImpulse(scale(impulse, -1), false);
    };
    dampJoint(rig.clasp, rig.eye, { x: 0, y: 1, z: 0 }, 0.15);
    dampJoint(rig.eye, rig.yoke, { x: 1, y: 0, z: 0 }, 0.14);

    // The clip bears against the narrow card slot. Its compliant angular
    // spring damps pitch around the free hinge axis only.
    const cardUp = rotate({ x: 0, y: 1, z: 0 }, q);
    const clipUp = rotate({ x: 0, y: 1, z: 0 }, rig.clasp.rotation());
    const hingeAxis = rotate({ x: 1, y: 0, z: 0 }, q);
    const axis = {
      x: clipUp.y * cardUp.z - clipUp.z * cardUp.y,
      y: clipUp.z * cardUp.x - clipUp.x * cardUp.z,
      z: clipUp.x * cardUp.y - clipUp.y * cardUp.x,
    };
    const pitch = Math.atan2(dot(axis, hingeAxis), dot(clipUp, cardUp));
    const pitchSpeed = dot(subtract(rig.clasp.angvel(), card.angvel()), hingeAxis);
    const moment = rig.clasp.principalInertia().x;
    const slotImpulse = scale(hingeAxis, (1.2 * pitch - 0.09 * pitchSpeed)
      * DT / (1 + 0.09 * DT / moment + 1.2 * DT * DT / moment));
    rig.clasp.applyTorqueImpulse(slotImpulse, false);
    card.applyTorqueImpulse(scale(slotImpulse, -1), false);

    if (!this.grip) return;
    const picked = add(card.translation(), rotate(this.grip.local, q));
    const error = subtract(this.grip.target, picked);
    const velocity = card.velocityAtPoint(picked);
    const armSquared = this.grip.local.x ** 2 + this.grip.local.y ** 2 + this.grip.local.z ** 2;
    const effectiveMass = 0.72 / (1 + armSquared / 0.65);
    const stiffness = DRAG_STIFFNESS * effectiveMass;
    const damping = DRAG_DAMPING * effectiveMass;
    const implicitFactor = 1 + (damping * DT + stiffness * DT * DT) / effectiveMass;
    let force = scale(subtract(scale(error, stiffness), scale(velocity, damping)), 1 / implicitFactor);
    const size = magnitude(force);
    if (size > MAX_DRAG_FORCE) force = scale(force, MAX_DRAG_FORCE / size);
    card.addForceAtPoint(force, picked, true);
  }

  private readSnapshot(): BadgeSnapshot {
    const rig = this.rig!;
    const q = rig.card.rotation();
    const pose = (body: RigidBody): HardwarePose => {
      const rotation = body.rotation();
      return {
        position: toCss(body.translation(), this.pixelsPerMeter),
        rotation: { x: -rotation.x, y: rotation.y, z: -rotation.z, w: rotation.w },
      };
    };
    const strapPoints = (nodes: RigidBody[], side: -1 | 1) => nodes.map((body, index) => {
      const point = index === nodes.length - 1
        ? add(body.translation(), rotate({ x: side * this.ringHalfSpan, y: STRAP_END_Y, z: 0 }, body.rotation()))
        : body.translation();
      return toCss(point, this.pixelsPerMeter);
    });
    return {
      position: toCss(rig.card.translation(), this.pixelsPerMeter),
      // Reflect Rapier's Y-up frame into the CSS Y-down frame.
      rotation: { x: -q.x, y: q.y, z: -q.z, w: q.w },
      connector: pose(rig.yoke),
      eye: pose(rig.eye),
      clasp: pose(rig.clasp),
      leftStrap: strapPoints(rig.straps[0], -1),
      rightStrap: strapPoints(rig.straps[1], 1),
    };
  }

  private updateSettled(): void {
    if (this.grip) {
      this.quietSteps = 0;
      return;
    }
    const rig = this.rig!;
    const card = rig.card;
    const position = subtract(card.translation(), this.restPosition);
    const q = card.rotation();
    const moving = magnitude(card.linvel()) > 0.025
      || magnitude(card.angvel()) > 0.035
      || magnitude(position) > 0.018
      || Math.hypot(q.x, q.y, q.z) > 0.025
      || [rig.clasp, rig.eye, rig.yoke].some(body => magnitude(body.linvel()) > 0.035 || magnitude(body.angvel()) > 0.05)
      || rig.straps.some(strap => strap.slice(1, -1).some(node => magnitude(node.linvel()) > 0.035));
    this.quietSteps = moving ? 0 : Math.min(this.quietSteps + 1, 24);
  }

  snapshot(): BadgeSnapshot {
    return this.rig ? this.readSnapshot() : this.lastSnapshot;
  }

  grab(pointer: Point): void {
    if (!this.rig || !isFinitePoint(pointer)) return;
    const card = this.rig.card;
    const center = card.translation();
    const q = card.rotation();
    const normal = rotate({ x: 0, y: 0, z: 1 }, q);
    const front = add(center, scale(normal, FRONT_FACE_DEPTH));
    const camera = { x: 0, y: 0, z: this.cameraDistance };
    const ray = {
      x: pointer.x / this.pixelsPerMeter,
      y: -pointer.y / this.pixelsPerMeter,
      z: -this.cameraDistance,
    };
    const denominator = dot(normal, ray);
    const distance = Math.abs(denominator) > 1e-6
      ? dot(normal, subtract(front, camera)) / denominator
      : (this.cameraDistance - front.z) / this.cameraDistance;
    const hit = add(camera, scale(ray, distance));
    this.grip = { local: inverseRotate(subtract(hit, center), q), target: hit };
    this.quietSteps = 0;
  }

  moveGrab(pointer: Point): void {
    if (!this.grip || !isFinitePoint(pointer)) return;
    const depthScale = (this.cameraDistance - this.grip.target.z) / this.cameraDistance;
    this.grip.target = {
      x: pointer.x / this.pixelsPerMeter * depthScale,
      y: -pointer.y / this.pixelsPerMeter * depthScale,
      z: this.grip.target.z,
    };
  }

  release(): void {
    this.grip = undefined;
    this.rig?.card.resetForces(true);
  }

  nudge(pointer: Point, movement: Point): void {
    if (!this.rig || this.grip || !isFinitePoint(pointer) || !isFinitePoint(movement)) return;
    const card = this.rig.card;
    const center = card.translation();
    const rotation = card.rotation();
    const scaleAtDepth = (this.cameraDistance - center.z) / this.cameraDistance;
    const local = inverseRotate(subtract({
      x: pointer.x / this.pixelsPerMeter * scaleAtDepth,
      y: -pointer.y / this.pixelsPerMeter * scaleAtDepth,
      z: center.z + FRONT_FACE_DEPTH,
    }, center), rotation);
    const point = add(center, rotate({
      x: Math.max(-this.geometry.width / this.pixelsPerMeter / 2, Math.min(this.geometry.width / this.pixelsPerMeter / 2, local.x)),
      y: Math.max(-this.geometry.height / this.pixelsPerMeter / 2, Math.min(this.geometry.height / this.pixelsPerMeter / 2, local.y)),
      z: FRONT_FACE_DEPTH,
    }, rotation));
    // Integrate cursor travel rather than event frequency, so a high-rate mouse
    // does not produce a stronger hover response. A nudge never creates a grip.
    const impulse = {
      x: Math.max(-32, Math.min(32, movement.x)) / this.pixelsPerMeter * 0.16,
      y: -Math.max(-32, Math.min(32, movement.y)) / this.pixelsPerMeter * 0.08,
      z: 0,
    };
    if (magnitude(impulse) < 0.00001) return;
    card.applyImpulseAtPoint(impulse, point, true);
    this.quietSteps = 0;
  }

  step(elapsedSeconds: number): BadgeSnapshot {
    if (!this.rig || !Number.isFinite(elapsedSeconds) || elapsedSeconds <= 0) return this.snapshot();
    this.accumulator = Math.min(this.accumulator + Math.min(elapsedSeconds, MAX_CATCHUP), MAX_CATCHUP);
    while (this.accumulator >= DT - 1e-9) {
      this.applyForces();
      this.updateStrapColliders();
      this.rig.world.step();
      this.accumulator -= DT;
      this.updateSettled();
    }
    this.lastSnapshot = this.readSnapshot();
    return this.lastSnapshot;
  }

  isSettled(): boolean {
    return !this.grip && this.quietSteps >= 24;
  }

  reset(): BadgeSnapshot {
    this.rig?.world.free();
    this.rig = this.buildRig();
    this.grip = undefined;
    this.accumulator = 0;

    // Begin from a reproducible equilibrium, rather than showing rope assembly dropping in.
    for (let index = 0; index < 600; index += 1) {
      this.applyForces();
      this.updateStrapColliders();
      this.rig.world.step();
    }
    for (const body of [
      this.rig.card,
      this.rig.clasp,
      this.rig.eye,
      this.rig.yoke,
      ...this.rig.straps[0].slice(1, -1),
      ...this.rig.straps[1].slice(1, -1),
    ]) {
      body.setLinvel(ZERO, false);
      body.setAngvel(ZERO, false);
    }
    this.rig.card.resetForces(false);
    this.rig.card.resetTorques(false);
    this.restPosition = this.rig.card.translation();
    this.quietSteps = 24;
    this.lastSnapshot = this.readSnapshot();
    return this.lastSnapshot;
  }

  dispose(): void {
    if (!this.rig) return;
    this.lastSnapshot = this.readSnapshot();
    this.rig.world.free();
    this.rig = undefined;
    this.grip = undefined;
  }
}

export async function createBadgePhysics(geometry: BadgeGeometry): Promise<BadgePhysics> {
  const rapier = await loadRapier();
  return new RapierBadgePhysics(rapier, geometry);
}
