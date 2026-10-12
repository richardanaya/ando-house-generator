import type { Face, Opening, Solid } from './types';

export interface Rect2 {
  x: number;
  y: number;
  w: number;
  h: number;
}

const SLIVER = 1e-6;

export function faceSize(solid: Pick<Solid, 'w' | 'h' | 'd'>, face: Face): { u: number; v: number } {
  if (face === 'px' || face === 'nx') return { u: solid.d, v: solid.h };
  return { u: solid.w, v: solid.h };
}

/** Outward unit normal of a face. */
export function faceNormal(face: Face): { x: number; y: number; z: number } {
  switch (face) {
    case 'px':
      return { x: 1, y: 0, z: 0 };
    case 'nx':
      return { x: -1, y: 0, z: 0 };
    case 'pz':
      return { x: 0, y: 0, z: 1 };
    case 'nz':
      return { x: 0, y: 0, z: -1 };
  }
}

/** True when the face looks toward design south (+Z). */
export function facesSun(face: Face): boolean {
  return face === 'pz';
}

/**
 * Cruciform holes are the vertical and horizontal arms, centered in the
 * opening rectangle and spanning it. Other kinds are a single rectangle.
 */
export function openingHoles(op: Pick<Opening, 'kind' | 'u' | 'v' | 'width' | 'height' | 'arm'>): Rect2[] {
  if (op.kind !== 'cruciform') {
    return [{ x: op.u, y: op.v, w: op.width, h: op.height }];
  }
  const arm = op.arm;
  return [
    {
      x: op.u + (op.width - arm) / 2,
      y: op.v,
      w: arm,
      h: op.height,
    },
    {
      x: op.u,
      y: op.v + (op.height - arm) / 2,
      w: op.width,
      h: arm,
    },
  ];
}

/** Subtract one axis-aligned hole. Remaining pieces do not overlap. */
export function subtractRect(host: Rect2, hole: Rect2): Rect2[] {
  const x0 = Math.max(host.x, hole.x);
  const y0 = Math.max(host.y, hole.y);
  const x1 = Math.min(host.x + host.w, hole.x + hole.w);
  const y1 = Math.min(host.y + host.h, hole.y + hole.h);
  if (x1 - x0 <= SLIVER || y1 - y0 <= SLIVER) return [host];

  const out: Rect2[] = [];
  const leftW = x0 - host.x;
  const rightW = host.x + host.w - x1;
  const botH = y0 - host.y;
  const topH = host.y + host.h - y1;
  if (leftW > SLIVER) out.push({ x: host.x, y: host.y, w: leftW, h: host.h });
  if (rightW > SLIVER) out.push({ x: x1, y: host.y, w: rightW, h: host.h });
  if (botH > SLIVER) out.push({ x: x0, y: host.y, w: x1 - x0, h: botH });
  if (topH > SLIVER) out.push({ x: x0, y: y1, w: x1 - x0, h: topH });
  return out;
}

export function subtractMany(host: Rect2, holes: readonly Rect2[]): Rect2[] {
  let parts: Rect2[] = [host];
  for (const hole of holes) {
    const next: Rect2[] = [];
    for (const part of parts) next.push(...subtractRect(part, hole));
    parts = next;
  }
  return parts.filter((part) => part.w > SLIVER && part.h > SLIVER);
}

export function rectsOverlap(a: Rect2, b: Rect2, eps = 1e-4): boolean {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return ox > eps && oy > eps;
}

export function containsRect(host: Rect2, inner: Rect2, eps = 1e-4): boolean {
  return (
    inner.x >= host.x - eps &&
    inner.y >= host.y - eps &&
    inner.x + inner.w <= host.x + host.w + eps &&
    inner.y + inner.h <= host.y + host.h + eps
  );
}
