import { containsRect, faceNormal, faceSize, openingHoles, rectsOverlap } from './openings';
import type { Box, House, Opening, Solid } from './types';

const EPS = 1e-4;

export function overlap1(a0: number, a1: number, b0: number, b1: number): number {
  return Math.min(a1, b1) - Math.max(a0, b0);
}

export function boxesOverlap(a: Box, b: Box, eps = EPS): boolean {
  return (
    overlap1(a.x, a.x + a.w, b.x, b.x + b.w) > eps &&
    overlap1(a.y, a.y + a.h, b.y, b.y + b.h) > eps &&
    overlap1(a.z, a.z + a.d, b.z, b.z + b.d) > eps
  );
}

function finiteBox(box: Box): boolean {
  return [box.x, box.y, box.z, box.w, box.h, box.d].every((n) => Number.isFinite(n));
}

function insideSite(box: Pick<Box, 'x' | 'z' | 'w' | 'd'>, site: House['site'], eps = 1e-3): boolean {
  return (
    box.x >= site.x - eps &&
    box.z >= site.z - eps &&
    box.x + box.w <= site.x + site.w + eps &&
    box.z + box.d <= site.z + site.d + eps
  );
}

function planOverlap(a: Pick<Box, 'x' | 'z' | 'w' | 'd'>, b: Pick<Box, 'x' | 'z' | 'w' | 'd'>, eps = EPS): boolean {
  return overlap1(a.x, a.x + a.w, b.x, b.x + b.w) > eps && overlap1(a.z, a.z + a.d, b.z, b.z + b.d) > eps;
}

function openingRect(op: Opening) {
  return { x: op.u, y: op.v, w: op.width, h: op.height };
}

function pointOnLanding(solid: Solid, x: number, y: number, z: number): boolean {
  const top = solid.y + solid.h;
  return (
    Math.abs(y - top) <= 1e-3 &&
    x >= solid.x - 0.05 &&
    x <= solid.x + solid.w + 0.05 &&
    z >= solid.z - 0.05 &&
    z <= solid.z + solid.d + 0.05
  );
}

/**
 * Grammar invariants. An empty list means the house is valid.
 * Solids may touch on faces; their interiors must be disjoint.
 */
export function checkInvariants(house: House): string[] {
  const errors: string[] = [];
  const { solids, openings, waters, circulation, site, story, levels } = house;

  if (solids.length < 5) errors.push(`expected a precinct of solids, found ${solids.length}`);
  if (circulation.length !== 1) errors.push(`expected one circulation run, found ${circulation.length}`);
  if (levels.length !== 2 || Math.abs(levels[0]!) > 1e-6 || Math.abs(levels[1]! - story) > 1e-6) {
    errors.push('levels must be ground and one story');
  }
  if (house.designSun.z < 0.99 || Math.abs(house.designSun.x) > 1e-6) {
    errors.push('design sun must face +Z');
  }
  if (waters.length > house.params.water) {
    errors.push(`water features ${waters.length} exceed slider ${house.params.water}`);
  }
  if (house.params.water === 0 && waters.length !== 0) errors.push('dry slider still produced water');

  const logical =
    1 + solids.filter((solid) => solid.role === 'wing' || solid.role === 'pavilion').length;
  if (logical > house.params.volumes) {
    errors.push(`logical volumes ${logical} exceed slider ${house.params.volumes}`);
  }

  const panelW = 12 * house.unit;
  const panelH = 6 * house.unit;
  if (Math.abs(house.panel.w - panelW) > 1e-6 || Math.abs(house.panel.h - panelH) > 1e-6) {
    errors.push('panel size must be 12×6 grammar units');
  }
  if (Math.abs(house.panel.w / house.params.scale - 1.8) > 1e-6) {
    errors.push('scale 1 panel width must be 1.8 m');
  }

  for (const solid of solids) {
    if (!finiteBox(solid) || solid.w <= EPS || solid.h <= EPS || solid.d <= EPS) {
      errors.push(`degenerate solid ${solid.id}`);
      continue;
    }
    if (solid.y < -EPS) errors.push(`${solid.id} is below ground`);
    if (!insideSite(solid, site)) errors.push(`${solid.id} leaves the site`);
  }

  for (let i = 0; i < solids.length; i++) {
    for (let j = i + 1; j < solids.length; j++) {
      if (boxesOverlap(solids[i]!, solids[j]!)) {
        errors.push(`solids overlap: ${solids[i]!.id} ∩ ${solids[j]!.id}`);
      }
    }
  }

  if (!insideSite(house.court, site)) errors.push('court leaves the site');
  for (const solid of solids) {
    if (solid.role === 'pavilion') {
      const inside =
        solid.x >= house.court.x - 1e-3 &&
        solid.z >= house.court.z - 1e-3 &&
        solid.x + solid.w <= house.court.x + house.court.w + 1e-3 &&
        solid.z + solid.d <= house.court.z + house.court.d + 1e-3;
      if (!inside) errors.push(`pavilion ${solid.id} is not inside the court`);
    } else if (planOverlap(house.court, solid)) {
      errors.push(`court overlaps solid ${solid.id}`);
    }
  }

  const hosts = new Map<string, Solid>(solids.map((solid) => [solid.id, solid]));
  const cruciform = openings.filter((op) => op.kind === 'cruciform');
  if (cruciform.length !== 1) errors.push(`expected one cruciform, found ${cruciform.length}`);

  const byFace = new Map<string, Opening[]>();
  for (const op of openings) {
    if (![op.u, op.v, op.width, op.height, op.arm].every((n) => Number.isFinite(n) && n > 0)) {
      errors.push(`opening ${op.id} has a non-positive dimension`);
      continue;
    }
    const host = hosts.get(op.hostId);
    if (!host) {
      errors.push(`opening ${op.id} has no host ${op.hostId}`);
      continue;
    }
    const size = faceSize(host, op.face);
    const faceRect = { x: 0, y: 0, w: size.u, h: size.v };
    const rect = openingRect(op);
    if (!containsRect(faceRect, rect)) {
      errors.push(`opening ${op.id} is not inside ${host.id} ${op.face}`);
    }
    if (op.kind === 'cruciform') {
      if (op.face !== 'pz' || op.purpose !== 'sun') errors.push('cruciform must be a sun opening on +Z');
      if (op.arm >= op.width || op.arm >= op.height) errors.push('cruciform arm does not fit its rectangle');
      const normal = faceNormal(op.face);
      if (normal.z < 0.5) errors.push('cruciform face does not look south');
    }
    if (op.kind === 'slit' || op.kind === 'glass-slot') {
      const margin = Math.min(op.u, op.v, size.u - (op.u + op.width), size.v - (op.v + op.height));
      if (margin < 0.02) errors.push(`opening ${op.id} is not framed by its wall`);
    }
    for (const hole of openingHoles(op)) {
      if (!containsRect(faceRect, hole)) errors.push(`hole of ${op.id} leaves the wall`);
    }
    const key = `${op.hostId}:${op.face}`;
    const list = byFace.get(key) ?? [];
    list.push(op);
    byFace.set(key, list);
  }

  for (const [key, list] of byFace) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (rectsOverlap(openingRect(list[i]!), openingRect(list[j]!))) {
          errors.push(`openings overlap on ${key}: ${list[i]!.id} ∩ ${list[j]!.id}`);
        }
      }
    }
  }

  for (const run of circulation) {
    if (!finiteBox(run.bounds) || ![run.x0, run.y0, run.z0, run.x1, run.y1, run.z1].every(Number.isFinite)) {
      errors.push('circulation is not finite');
      continue;
    }
    const yLow = Math.min(run.y0, run.y1);
    const yHigh = Math.max(run.y0, run.y1);
    if (Math.abs(yLow) > 1e-3) errors.push('circulation does not start at ground');
    if (Math.abs(yHigh - story) > 1e-3) errors.push('circulation does not reach the upper level');
    const runLen = Math.hypot(run.x1 - run.x0, run.z1 - run.z0);
    const slope = runLen / Math.max(yHigh - yLow, EPS);
    if (run.kind === 'ramp' && slope < 3.9) errors.push(`ramp is steeper than 1:4 (${slope.toFixed(2)})`);
    if (run.kind === 'stair' && (slope < 1.5 || slope > 2.2)) {
      errors.push(`stair proportion is off (${slope.toFixed(2)})`);
    }
    const top = run.y0 >= run.y1 ? { x: run.x0, y: run.y0, z: run.z0 } : { x: run.x1, y: run.y1, z: run.z1 };
    const landings = solids.filter((solid) => solid.role === 'landing');
    if (!landings.some((solid) => pointOnLanding(solid, top.x, top.y, top.z))) {
      errors.push('upper end of circulation does not meet a landing');
    }
    if (!insideSite({ x: run.x0 - run.width / 2, z: Math.min(run.z0, run.z1), w: run.width, d: Math.abs(run.z1 - run.z0) }, site) &&
        !insideSite(run.bounds, site)) {
      errors.push('circulation leaves the site');
    }
    if (!insideSite(run.bounds, site)) errors.push('circulation bounds leave the site');
    for (const solid of solids) {
      if (boxesOverlap(run.bounds, solid)) errors.push(`circulation overlaps ${solid.id}`);
    }
  }

  for (const water of waters) {
    const slab: Box = {
      x: water.x,
      y: water.y - water.depth,
      z: water.z,
      w: water.w,
      h: water.depth,
      d: water.d,
    };
    if (!finiteBox(slab) || water.w <= EPS || water.d <= EPS || water.depth <= EPS) {
      errors.push(`degenerate water ${water.id}`);
      continue;
    }
    if (!insideSite(water, site)) errors.push(`water ${water.id} leaves the site`);
    for (const solid of solids) {
      if (boxesOverlap(slab, solid)) errors.push(`water ${water.id} overlaps ${solid.id}`);
    }
  }
  for (let i = 0; i < waters.length; i++) {
    for (let j = i + 1; j < waters.length; j++) {
      if (planOverlap(waters[i]!, waters[j]!)) errors.push(`waters overlap: ${waters[i]!.id} ∩ ${waters[j]!.id}`);
    }
  }

  if (house.garden) {
    if (!insideSite(house.garden, site)) errors.push('garden leaves the site');
    for (const solid of solids) {
      if (planOverlap(house.garden, solid)) errors.push(`garden overlaps ${solid.id}`);
    }
    for (const water of waters) {
      if (planOverlap(house.garden, water)) errors.push(`garden overlaps ${water.id}`);
    }
    if (planOverlap(house.garden, house.court)) errors.push('garden overlaps the court');
  }

  const sunOpenings = openings.filter((op) => op.purpose === 'sun');
  if (!sunOpenings.some((op) => op.kind === 'cruciform')) {
    errors.push('sun rule did not place a cruciform');
  }

  return errors;
}
