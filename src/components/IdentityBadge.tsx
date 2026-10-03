'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import type { Locale } from '../lib/locale';
import type { BadgeGeometry, BadgePhysics, BadgeSnapshot, Point, Quaternion, Vec3 } from '../lib/badge-physics';
import { cardShadowPath, ribbonSurface, rotatePoint } from '../lib/badge-projection';
import styles from './IdentityBadge.module.css';

const BadgeAccessories3D = dynamic(() => import('./BadgeAccessories3D'), { ssr: false });

type Size = { width: number; height: number; badgeTop: number; badgeHeight: number };
const INITIAL_SIZE: Size = { width: 700, height: 880, badgeTop: 300, badgeHeight: 389 };
const INITIAL_GEOMETRY: BadgeGeometry = { width: 305, height: 389, anchorY: -389 * 9.35 / 4.44, anchorHalfWidth: 389 * 2.6 / 4.44 };
const IDENTITY: Quaternion = { x: 0, y: 0, z: 0, w: 1 };

function restingView(geometry: BadgeGeometry): BadgeSnapshot {
  const ring = { x: 0, y: -geometry.height / 2 - 54 - geometry.height / 4.44 * 0.04, z: 0 };
  const hardware = (offset: number) => ({ position: { x: 0, y: -geometry.height / 2 + offset, z: 0 }, rotation: { ...IDENTITY } });
  return {
    position: { x: 0, y: 0, z: 0 }, rotation: { ...IDENTITY },
    connector: hardware(-54), eye: hardware(-30), clasp: hardware(3),
    leftStrap: [{ x: -geometry.anchorHalfWidth, y: geometry.anchorY, z: 0 }, { ...ring, x: -1.5 }],
    rightStrap: [{ x: geometry.anchorHalfWidth, y: geometry.anchorY, z: 0 }, { ...ring, x: 1.5 }],
  };
}

function staticView(geometry: BadgeGeometry, position: Vec3): BadgeSnapshot {
  const view = restingView(geometry);
  const moveEnd = (points: Vec3[]) => points.map((point, index) => index === points.length - 1
    ? { x: point.x + position.x, y: point.y + position.y, z: position.z } : point);
  const moveHardware = (part: BadgeSnapshot['connector']) => ({ ...part, position: { x: part.position.x + position.x, y: part.position.y + position.y, z: part.position.z + position.z } });
  return { ...view, position, connector: moveHardware(view.connector), eye: moveHardware(view.eye), clasp: moveHardware(view.clasp), leftStrap: moveEnd(view.leftStrap), rightStrap: moveEnd(view.rightStrap) };
}

function rotationMatrix({ x, y, z, w }: Quaternion) {
  return [
    1 - 2 * (y * y + z * z), 2 * (x * y + z * w), 2 * (x * z - y * w), 0,
    2 * (x * y - z * w), 1 - 2 * (x * x + z * z), 2 * (y * z + x * w), 0,
    2 * (x * z + y * w), 2 * (y * z - x * w), 1 - 2 * (x * x + y * y), 0,
    0, 0, 0, 1,
  ].join(',');
}

function hardwareTransform(part: BadgeSnapshot['connector']): CSSProperties {
  return { transform: `translate3d(calc(-50% + ${part.position.x}px), calc(-50% + ${part.position.y}px), ${part.position.z}px) matrix3d(${rotationMatrix(part.rotation)})` };
}

function InitialAccessories({ metalId }: { metalId: string }) {
  return <div className={styles.initialAccessories} data-initial-accessories aria-hidden="true">
    <div className={styles.initialLanyard} />
    <div className={styles.initialHardware}>
      <svg className={styles.initialRing} viewBox="-30 -40 60 80">
        <defs><linearGradient id={metalId}><stop stopColor="#66776f" /><stop offset="0.3" stopColor="#bac4bc" /><stop offset="0.58" stopColor="#7e9085" /><stop offset="0.85" stopColor="#b2bdb4" /><stop offset="1" stopColor="#64796b" /></linearGradient></defs>
        <path d="M-11-10H11Q14 4 10 13Q7 18 0 18Q-7 18-10 13Q-14 4-11-10Z" fill="none" stroke={`url(#${metalId})`} strokeWidth="3.7" />
        <path className={styles.fabricTab} d="M-9-25H9L7-7Q0-3-7-7Z" />
        <path className={styles.tabStitch} d="M-6.3-19H6.3M-6.3-16H6.3" />
      </svg>
      <svg className={styles.initialEye} viewBox="-30 -40 60 80">
        <rect x="-2.3" y="-12.5" width="4.6" height="25" rx="2" fill={`url(#${metalId})`} />
        <rect x="-3.7" y="-1.75" width="7.4" height="5.5" rx="1" fill={`url(#${metalId})`} />
      </svg>
      <svg className={styles.initialClasp} viewBox="-6 0 12 40" preserveAspectRatio="none">
        <path d="M-1.8 3V34Q-1.8 40 0 40Q2.2 40 2.2 34V4Q2.7 0 0 0Q-1.8 0-1.8 3" fill="none" stroke={`url(#${metalId})`} strokeWidth="2.3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  </div>;
}

export default function IdentityBadge({ className = '', locale = 'ko' }: { className?: string; locale?: Locale }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<BadgePhysics | null>(null);
  const geometryRef = useRef<BadgeGeometry>(INITIAL_GEOMETRY);
  const viewRef = useRef<BadgeSnapshot>(restingView(INITIAL_GEOMETRY));
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const movingRef = useRef(false);
  const pointerRef = useRef<{ id: number; origin: Point; target: Point; position: Vec3 } | null>(null);
  const keyboardRef = useRef<Point | null>(null);
  const [view, setView] = useState<BadgeSnapshot>(viewRef.current);
  const [size, setSize] = useState<Size>(INITIAL_SIZE);
  const [dragging, setDragging] = useState(false);
  const [moving, setMoving] = useState(false);
  const [ready, setReady] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [accessoriesReady, setAccessoriesReady] = useState(false);
  const [rendererFailed, setRendererFailed] = useState(false);
  const onAccessoriesReady = useCallback(() => setAccessoriesReady(true), []);
  const onAccessoriesError = useCallback(() => { setRendererFailed(true); setAccessoriesReady(false); }, []);
  const hintId = useId();

  const paint = useCallback((next: BadgeSnapshot) => {
    viewRef.current = next;
    setView(next);
  }, []);

  const markMoving = useCallback((active: boolean) => {
    if (movingRef.current === active) return;
    movingRef.current = active;
    setMoving(active);
  }, []);

  const stopMotion = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    lastFrameRef.current = 0;
  }, []);

  const step = useCallback(function physicsFrame(time: number) {
    const physics = physicsRef.current;
    if (!physics || reducedMotionRef.current) {
      frameRef.current = null;
      markMoving(false);
      return;
    }
    const elapsed = lastFrameRef.current ? Math.min((time - lastFrameRef.current) / 1000, 1 / 20) : 1 / 60;
    lastFrameRef.current = time;
    paint(physics.step(elapsed));
    if (!pointerRef.current && !keyboardRef.current && physics.isSettled()) {
      frameRef.current = null;
      lastFrameRef.current = 0;
      markMoving(false);
      return;
    }
    frameRef.current = requestAnimationFrame(physicsFrame);
  }, [markMoving, paint]);

  const startMotion = useCallback(() => {
    if (reducedMotionRef.current || !physicsRef.current) return;
    markMoving(true);
    if (frameRef.current === null) {
      lastFrameRef.current = 0;
      frameRef.current = requestAnimationFrame(step);
    }
  }, [markMoving, step]);

  const cancelGrip = useCallback(() => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    keyboardRef.current = null;
    setDragging(false);
    if (pointer && badgeRef.current?.hasPointerCapture(pointer.id)) badgeRef.current.releasePointerCapture(pointer.id);
    physicsRef.current?.release();
  }, []);

  const reset = useCallback(() => {
    cancelGrip();
    stopMotion();
    paint(physicsRef.current?.reset() ?? restingView(geometryRef.current));
    markMoving(false);
  }, [cancelGrip, markMoving, paint, stopMotion]);

  useEffect(() => {
    let disposed = false;
    let generation = 0;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const loadPhysics = (geometry: BadgeGeometry) => {
      const current = ++generation;
      stopMotion();
      physicsRef.current?.dispose();
      physicsRef.current = null;
      setReady(false);
      if (reducedMotionRef.current) {
        paint(restingView(geometry));
        markMoving(false);
        setInitialized(true);
        return;
      }
      // Keep the static badge in the initial page; load the simulation after hydration.
      void import('../lib/badge-physics').then(module => module.createBadgePhysics(geometry)).then(physics => {
        if (disposed || current !== generation || reducedMotionRef.current) { physics.dispose(); return; }
        physicsRef.current = physics;
        paint(physics.snapshot());
        setReady(true);
        setInitialized(true);
        const pointer = pointerRef.current;
        if (pointer) {
          physics.grab(pointer.origin);
          physics.moveGrab(pointer.target);
          startMotion();
        } else {
          markMoving(false);
        }
      }).catch(error => {
        if (disposed || current !== generation) return;
        console.warn('Badge motion could not start.', error);
        markMoving(false);
        setInitialized(true);
      });
    };
    const updateMotion = (preference?: string) => {
      const requested = preference === 'full' || preference === 'reduced' ? preference : document.documentElement.dataset.motion;
      const reduced = motionQuery.matches || requested === 'reduced';
      if (reduced === reducedMotionRef.current) return;
      reducedMotionRef.current = reduced;
      reset();
      loadPhysics(geometryRef.current);
    };
    reducedMotionRef.current = motionQuery.matches || document.documentElement.dataset.motion === 'reduced';
    const onMotionChange = () => updateMotion();
    const onPreferences = (event: Event) => updateMotion((event as CustomEvent<{ motion?: string }>).detail?.motion);
    motionQuery.addEventListener('change', onMotionChange);
    window.addEventListener('portfolio:preferences', onPreferences);
    const releaseOnBlur = () => {
      if (!pointerRef.current && !keyboardRef.current) return;
      cancelGrip();
      if (reducedMotionRef.current) reset();
      else startMotion();
    };
    window.addEventListener('blur', releaseOnBlur);

    const scene = sceneRef.current;
    const badge = badgeRef.current;
    let hasMeasured = false;
    const measure = () => {
      if (!scene || !badge) return;
      const badgeWidth = parseFloat(getComputedStyle(badge).width);
      const badgeHeight = parseFloat(getComputedStyle(badge).height);
      const nextSize = { width: scene.clientWidth, height: scene.clientHeight, badgeTop: badge.offsetTop, badgeHeight };
      setSize(previous => JSON.stringify(previous) === JSON.stringify(nextSize) ? previous : nextSize);
      // The anchors sit above the visible page, leaving a long, flexible lanyard.
      const geometry = {
        width: badgeWidth,
        height: badgeHeight,
        anchorY: -badgeHeight * 9.35 / 4.44,
        anchorHalfWidth: nextSize.width <= 500 ? nextSize.width * 0.22 : badgeHeight * 2.6 / 4.44,
        perspective: badgeHeight * 3.4,
      };
      const changed = !hasMeasured || Object.keys(geometry).some(key => geometry[key as keyof BadgeGeometry] !== geometryRef.current[key as keyof BadgeGeometry]);
      if (!changed) return;
      hasMeasured = true;
      setMeasured(true);
      geometryRef.current = geometry;
      cancelGrip();
      paint(restingView(geometry));
      loadPhysics(geometry);
    };
    measure();
    const observer = scene ? new ResizeObserver(measure) : null;
    if (scene) observer?.observe(scene);
    if (badge) observer?.observe(badge);
    window.addEventListener('resize', measure);
    return () => {
      disposed = true;
      generation += 1;
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('portfolio:preferences', onPreferences);
      window.removeEventListener('blur', releaseOnBlur);
      window.removeEventListener('resize', measure);
      observer?.disconnect();
      stopMotion();
      physicsRef.current?.dispose();
      physicsRef.current = null;
    };
  }, [cancelGrip, markMoving, paint, reset, startMotion, stopMotion]);

  useEffect(() => {
    let previous: { x: number; y: number; time: number } | null = null;
    const clear = () => { previous = null; };
    const onHover = (event: globalThis.PointerEvent) => {
      const scene = sceneRef.current;
      const badge = badgeRef.current;
      const physics = physicsRef.current;
      if (!scene || !badge || !physics || reducedMotionRef.current || pointerRef.current || keyboardRef.current
        || event.pointerType !== 'mouse' || event.buttons !== 0
        || (event.target instanceof Element && event.target.closest('a, button, input, select, textarea'))) {
        clear();
        return;
      }
      const current = { x: event.clientX, y: event.clientY, time: event.timeStamp };
      const before = previous;
      previous = current;
      if (!before || current.time - before.time > 150) return;
      const bounds = badge.getBoundingClientRect();
      const distance = Math.hypot(
        Math.max(bounds.left - current.x, 0, current.x - bounds.right),
        Math.max(bounds.top - current.y, 0, current.y - bounds.bottom),
      );
      if (distance >= 48) return;
      const weight = (1 - distance / 48) ** 2;
      const movement = { x: (current.x - before.x) * weight, y: (current.y - before.y) * weight };
      if (Math.hypot(movement.x, movement.y) < 0.1) return;
      const sceneBounds = scene.getBoundingClientRect();
      physics.nudge({
        x: current.x - sceneBounds.left - sceneBounds.width / 2,
        y: current.y - sceneBounds.top - badge.offsetTop - geometryRef.current.height / 2,
      }, movement);
      startMotion();
    };
    window.addEventListener('pointermove', onHover, { passive: true });
    window.addEventListener('blur', clear);
    document.documentElement.addEventListener('pointerleave', clear);
    return () => {
      window.removeEventListener('pointermove', onHover);
      window.removeEventListener('blur', clear);
      document.documentElement.removeEventListener('pointerleave', clear);
    };
  }, [startMotion]);

  const pointerPosition = (event: PointerEvent<HTMLDivElement>): Point => {
    const scene = sceneRef.current!.getBoundingClientRect();
    return { x: event.clientX - scene.left - scene.width / 2, y: event.clientY - scene.top - badgeRef.current!.offsetTop - geometryRef.current.height / 2 };
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.pointerType === 'mouse' && event.button !== 0) || pointerRef.current) return;
    const target = pointerPosition(event);
    pointerRef.current = { id: event.pointerId, origin: target, target, position: { ...viewRef.current.position } };
    keyboardRef.current = null;
    physicsRef.current?.grab(target);
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    markMoving(true);
    startMotion();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    pointer.target = pointerPosition(event);
    if (reducedMotionRef.current || !physicsRef.current) {
      paint(staticView(geometryRef.current, { x: pointer.position.x + pointer.target.x - pointer.origin.x, y: pointer.position.y + pointer.target.y - pointer.origin.y, z: 0 }));
      return;
    }
    // Only the target changes. The local point follows through a force, not a teleport.
    physicsRef.current.moveGrab(pointer.target);
    startMotion();
  };

  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current || pointerRef.current.id !== event.pointerId) return;
    cancelGrip();
    if (reducedMotionRef.current || !physicsRef.current) reset();
    else startMotion();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Home' || event.key === 'Escape') { event.preventDefault(); reset(); return; }
    const movement: Record<string, Point> = { ArrowLeft: { x: -18, y: 0 }, ArrowRight: { x: 18, y: 0 }, ArrowUp: { x: 0, y: -18 }, ArrowDown: { x: 0, y: 18 } };
    const move = movement[event.key];
    if (!move || pointerRef.current) return;
    event.preventDefault();
    if (reducedMotionRef.current || !physicsRef.current) {
      paint(staticView(geometryRef.current, { ...viewRef.current.position, x: viewRef.current.position.x + move.x, y: viewRef.current.position.y + move.y }));
      return;
    }
    if (!keyboardRef.current) {
      keyboardRef.current = { x: viewRef.current.position.x, y: viewRef.current.position.y };
      physicsRef.current.grab(keyboardRef.current);
    }
    keyboardRef.current = { x: keyboardRef.current.x + move.x, y: keyboardRef.current.y + move.y };
    physicsRef.current.moveGrab(keyboardRef.current);
    startMotion();
  };

  const releaseKeyboard = () => {
    if (!keyboardRef.current) return;
    keyboardRef.current = null;
    physicsRef.current?.release();
    startMotion();
  };

  const camera = { x: size.width / 2, y: size.badgeTop + size.badgeHeight / 2, distance: geometryRef.current.perspective ?? size.badgeHeight * 3.4 };
  const dynamicFallback = measured && rendererFailed;
  const ribbons = !dynamicFallback ? [] : [view.leftStrap, view.rightStrap].map((points, index) => {
    const tip = rotatePoint({ x: (index ? 1 : -1) * 4.2, y: -22, z: 3.2 }, view.connector.rotation);
    const end = { x: view.connector.position.x + tip.x, y: view.connector.position.y + tip.y, z: view.connector.position.z + tip.z };
    const curve = [...points.slice(0, points.length > 3 ? -2 : -1), end];
    return ribbonSurface(curve, view.connector.rotation, size.width <= 500 ? 12 : 14, camera, view, geometryRef.current);
  });
  const metalId = `${hintId}-metal`;
  const shadowId = `${hintId}-shadow`;
  const projectionStyle = { perspective: `${camera.distance}px`, perspectiveOrigin: `${camera.x}px ${camera.y}px`, '--badge-height': `${size.badgeHeight}px` } as CSSProperties;
  const badgeStyle: CSSProperties = {
    transformOrigin: '50% 50%',
    transform: `translate3d(calc(-50% + ${view.position.x}px), ${view.position.y}px, ${view.position.z}px) matrix3d(${rotationMatrix(view.rotation)})`,
  };

  return (
    <div className={`${styles.scene} ${className}`} ref={sceneRef} data-moving={moving ? 'true' : 'false'} data-physics={ready ? 'ready' : 'static'} data-renderer={accessoriesReady ? 'webgl' : 'fallback'}>
      {!accessoriesReady && !dynamicFallback && <InitialAccessories metalId={`${metalId}-initial`} />}
      <svg className={styles.lanyard} viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" aria-hidden="true">
        <defs><filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10" /></filter></defs>
        <path className={styles.castShadow} filter={`url(#${shadowId})`} d={cardShadowPath(view, geometryRef.current.width, size.badgeHeight, camera)} />
        {ribbons.map((ribbon, index) => <g key={index} className={styles.ribbonShadow}>{ribbon.back.map((path, shade) => <path key={shade} className={styles.ribbon} data-shade={shade} d={path} />)}<path className={styles.ribbonEdge} d={ribbon.edge} /></g>)}
      </svg>
      <div className={styles.projection} style={projectionStyle}>
      <div
        ref={badgeRef}
        className={`${styles.badge} ${dragging ? styles.dragging : ''}`}
        style={badgeStyle}
        tabIndex={0}
        role="group"
        aria-label={locale === 'ko' ? '임현세 포트폴리오 배지' : 'Hyeonse Im portfolio badge'}
        aria-describedby={hintId}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onKeyDown={onKeyDown}
        onKeyUp={event => { if (event.key.startsWith('Arrow')) releaseKeyboard(); }}
        onBlur={releaseKeyboard}
      >
        <div className={styles.sleeve}>
          <div className={styles.slot} aria-hidden="true" />
          <div className={styles.touchHandle} aria-hidden="true" />
          <div className={styles.insert}>
            <div className={styles.insertHeader}>
              <span>PORTFOLIO / ENGINEERING</span>
              <span>SEOUL · KR</span>
            </div>
            <div className={styles.markRow}>
              <div className={styles.mark} aria-hidden="true"><span>H<span className={styles.markM}>M</span></span></div>
              <div className={styles.markAside} aria-hidden="true">
                <span>HM</span>
                <span className={styles.markIndex}>01 / 04</span>
                <i />
              </div>
            </div>
            <div className={styles.identity}>
              <span className={styles.fieldLabel}>{locale === 'ko' ? 'NAME / 이름' : 'NAME'}</span>
              <strong>HYEONSE IM</strong>
              <span className={styles.koreanName} lang="ko">임현세</span>
            </div>
            <div className={styles.insertFooter}>
              <div className={styles.roleLine}><span className={styles.blueSquare} />FRONTEND ENGINEER</div>
              <div className={styles.footerRule} />
              <div className={styles.footerMeta}><span>React / TypeScript</span><span>2022—NOW</span></div>
            </div>
          </div>
          <div className={styles.sleeveSheen} aria-hidden="true" />
        </div>
      </div>
      </div>
      <svg className={`${styles.lanyard} ${styles.lanyardFront}`} viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" aria-hidden="true">
        {ribbons.map((ribbon, index) => <g key={index}>{ribbon.front.map((path, shade) => <path key={shade} className={styles.ribbon} data-shade={shade} d={path} />)}<path className={styles.ribbonEdge} d={ribbon.frontEdge} /></g>)}
      </svg>
      {dynamicFallback && <div className={`${styles.projection} ${styles.hardwareProjection}`} style={projectionStyle}>
      <svg className={styles.hardwarePart} data-hardware="connector" style={hardwareTransform(view.connector)} viewBox="-30 -40 60 80" aria-hidden="true">
        <defs><linearGradient id={metalId}><stop offset="0" stopColor="#84918f" /><stop offset="0.24" stopColor="#f7faf8" /><stop offset="0.53" stopColor="#aeb9b6" /><stop offset="0.79" stopColor="#f0f5f2" /><stop offset="1" stopColor="#74837f" /></linearGradient></defs>
        <path d="M-11-10L-13 9Q-13 17 0 17Q13 17 13 9L11-10Z" fill="none" stroke="#697975" strokeWidth="4.5" />
        <path d="M-11-10L-13 9Q-13 17 0 17Q13 17 13 9L11-10Z" fill="none" stroke={`url(#${metalId})`} strokeWidth="3" />
        <path className={styles.fabricTab} d="M-9-25H9L7-7Q0-3-7-7Z" />
        <path className={styles.tabStitch} d="M-6.3-19H6.3M-6.3-16H6.3" />
      </svg>
      <svg className={styles.hardwarePart} data-hardware="eye" style={hardwareTransform(view.eye)} viewBox="-30 -40 60 80" aria-hidden="true">
        <rect x="-2.5" y="-12" width="5" height="25" rx="2" fill={`url(#${metalId})`} stroke="#84948f" strokeWidth="0.5" />
        <rect x="-3.5" y="-2" width="7" height="6" rx="1.5" fill={`url(#${metalId})`} stroke="#8c9a95" strokeWidth="0.6" />
      </svg>
      <svg className={styles.hardwarePart} data-hardware="clasp" style={hardwareTransform(view.clasp)} viewBox="-30 -40 60 80" aria-hidden="true">
        <path d={`M-1.5-20V${size.badgeHeight * 0.04325 - 6}Q-1.5 ${size.badgeHeight * 0.04325 - 2} 1 ${size.badgeHeight * 0.04325 - 3}Q2.5 ${size.badgeHeight * 0.04325 - 4} 2.5 ${size.badgeHeight * 0.04325 - 7}V-18Q2.5-22 0-22Q-1.5-22-1.5-20Z`} fill="none" stroke="#6d7f78" strokeWidth="2.5" />
        <path d={`M-1.5-20V${size.badgeHeight * 0.04325 - 6}Q-1.5 ${size.badgeHeight * 0.04325 - 2} 1 ${size.badgeHeight * 0.04325 - 3}Q2.5 ${size.badgeHeight * 0.04325 - 4} 2.5 ${size.badgeHeight * 0.04325 - 7}V-18Q2.5-22 0-22Q-1.5-22-1.5-20Z`} fill="none" stroke={`url(#${metalId})`} strokeWidth="1.5" />
      </svg>
      </div>}
      {measured && initialized && !rendererFailed && <div className={styles.accessories} style={{ visibility: accessoriesReady ? 'visible' : 'hidden' }}>
        <BadgeAccessories3D snapshot={view} geometry={geometryRef.current} size={size} onReady={onAccessoriesReady} onError={onAccessoriesError} />
      </div>}
      <p id={hintId} className={styles.hint}>{locale === 'ko' ? '드래그해 보세요' : 'Try dragging'} <span aria-hidden="true">↙</span><span className={styles.srOnly}>{locale === 'ko' ? '방향키로 배지를 움직이고 Home 키로 제자리로 돌릴 수 있습니다.' : 'Use the arrow keys to move the badge and the Home key to return it to its original position.'}</span></p>
    </div>
  );
}
