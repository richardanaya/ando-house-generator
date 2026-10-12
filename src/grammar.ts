import { boxesOverlap, checkInvariants } from './invariants';
import { normalizeParams, type GenerateParams } from './params';
import { hashSeed, makeRng, type Rng } from './rng';
import type {
  Box,
  Circulation,
  Face,
  House,
  Opening,
  OpeningKind,
  OpeningPurpose,
  RectXZ,
  Solid,
  SolidRole,
  WaterFeature,
} from './types';

/**
 * Production rules, applied in order. All rolls happen up front from the seed,
 * then the sliders only enable or suppress already-chosen pieces.
 *
 *   Site     → grid plot, module = 0.15 m × scale (panel 1.8 × 0.9 m)
 *   Primary  → pure two-story volume, split by a view slot
 *   Void     → courtyard subtracted between the volume and a sun wall
 *   Screens  → freestanding planes that frame the south approach
 *   Water    → basins on the court axis and the approach axis
 *   Light    → cruciform, glass slot, and slits on walls facing south
 *   Process  → one ramp or stair from ground to a landing at one story
 */

const PANEL_W = 12;
const PANEL_H = 6;
const T = 3;
const STORY = 24;
const ROOM_H = 48;

const WEST_KEEP = 54;
const PROCESSION = 90;
const FORECOURT = 72;
const NORTH_KEEP = 42;

interface UnitBox extends Box {
  id: string;
  role: SolidRole;
  shape: 'box' | 'cylinder';
}

interface UnitOpening {
  id: string;
  hostId: string;
  face: Face;
  kind: OpeningKind;
  purpose: OpeningPurpose;
  u: number;
  v: number;
  width: number;
  height: number;
  arm: number;
}

interface Plan {
  sw: number;
  sd: number;
  massW: number;
  roomD: number;
  courtD: number;
  crossExtra: number;
  slotW: number;
  glassShift: number;
  enclosureOpen: boolean;
  mirror: boolean;
  wantPavilion: boolean;
  pavilionRound: boolean;
  wingWestW: number;
  wingWestD: number;
  wingNorthD: number;
  screenReturn: boolean;
  circulationRamp: boolean;
  roundWater: boolean;
  garden: boolean;
  slitCount: number;
}

function rollPlan(rng: Rng): Plan {
  return {
    sw: 252 + rng.int(0, 6) * 12,
    sd: 240 + rng.int(0, 5) * 12,
    massW: 72 + rng.int(0, 3) * 12,
    roomD: 36 + rng.int(0, 3) * 6,
    courtD: 36 + rng.int(0, 3) * 6,
    crossExtra: [0, 6, 12][rng.int(0, 2)]!,
    slotW: rng.bool() ? 12 : 6,
    glassShift: rng.int(-1, 1),
    enclosureOpen: rng.bool(0.35),
    mirror: rng.bool(),
    wantPavilion: rng.bool(0.6),
    pavilionRound: rng.bool(0.45),
    wingWestW: 30 + rng.int(0, 2) * 6,
    wingWestD: 24 + rng.int(0, 2) * 6,
    wingNorthD: 24 + rng.int(0, 2) * 6,
    screenReturn: rng.bool(0.65),
    circulationRamp: rng.bool(0.6),
    roundWater: rng.bool(0.4),
    garden: rng.bool(0.75),
    slitCount: rng.int(2, 4),
  };
}

function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

function planHits(rect: RectXZ, solids: readonly UnitBox[], y0 = 0, y1 = 1): boolean {
  const probe: Box = { x: rect.x, y: y0, z: rect.z, w: rect.w, h: Math.max(y1 - y0, 1), d: rect.d };
  return solids.some((solid) => boxesOverlap(probe, solid, 0));
}

function insideSite(box: Pick<Box, 'x' | 'z' | 'w' | 'd'>, site: RectXZ): boolean {
  return box.x >= site.x && box.z >= site.z && box.x + box.w <= site.x + site.w && box.z + box.d <= site.z + site.d;
}

function generateUnits(plan: Plan, params: GenerateParams): {
  site: RectXZ;
  court: RectXZ;
  solids: UnitBox[];
  openings: UnitOpening[];
  waters: Array<RectXZ & { id: string; shape: 'rect' | 'circle' }>;
  circulation: {
    kind: 'ramp' | 'stair';
    x0: number;
    y0: number;
    z0: number;
    x1: number;
    y1: number;
    z1: number;
    width: number;
    bounds: Box;
  };
  garden: RectXZ | null;
  entrySide: 'east' | 'west';
  enclosure: 'closed' | 'open-side';
} {
  const site: RectXZ = { x: -plan.sw / 2, z: -plan.sd / 2, w: plan.sw, d: plan.sd };
  const massD = plan.roomD + plan.courtD + 2 * T;
  const extraW = plan.sw - WEST_KEEP - plan.massW - PROCESSION;
  const extraD = plan.sd - NORTH_KEEP - massD - FORECOURT;
  if (extraW < 0 || extraD < 0) {
    throw new Error(`site cannot hold the mass (extra ${extraW}, ${extraD})`);
  }

  const x0 = site.x + WEST_KEEP + Math.floor(extraW / 2);
  const z0 = site.z + NORTH_KEEP + Math.floor(extraD / 2);
  const massW = plan.massW;
  const roomD = plan.roomD;
  const courtD = plan.courtD;
  const crossH = ROOM_H + plan.crossExtra;

  const free = massW - plan.slotW;
  let leftW = Math.round((Math.floor(free / 2) + plan.glassShift * 6) / 3) * 3;
  leftW = clamp(leftW, 15, free - 15);
  const slotW = plan.slotW;
  const rightW = massW - slotW - leftW;
  if (rightW < 15) throw new Error('view slot consumes the primary volume');

  const facadeZ = z0 + roomD;
  const courtZ = facadeZ + T;
  const crossZ = courtZ + courtD;
  const massEast = x0 + massW;

  const solids: UnitBox[] = [];
  const openings: UnitOpening[] = [];

  const add = (solid: UnitBox, optional = false): boolean => {
    if (solid.w <= 0 || solid.h <= 0 || solid.d <= 0 || !insideSite(solid, site)) {
      if (optional) return false;
      throw new Error(`solid ${solid.id} does not fit the site`);
    }
    if (solids.some((other) => boxesOverlap(solid, other, 0))) {
      if (optional) return false;
      const hit = solids.find((other) => boxesOverlap(solid, other, 0));
      throw new Error(`solid ${solid.id} overlaps ${hit?.id}`);
    }
    solids.push(solid);
    return true;
  };

  add({ id: 'primary-west', role: 'primary', shape: 'box', x: x0, y: 0, z: z0, w: leftW, h: ROOM_H, d: roomD });
  add({
    id: 'primary-east',
    role: 'primary',
    shape: 'box',
    x: x0 + leftW + slotW,
    y: 0,
    z: z0,
    w: rightW,
    h: ROOM_H,
    d: roomD,
  });
  add({ id: 'facade', role: 'wall', shape: 'box', x: x0, y: 0, z: facadeZ, w: massW, h: ROOM_H, d: T });
  add({ id: 'sun-wall', role: 'wall', shape: 'box', x: x0, y: 0, z: crossZ, w: massW, h: crossH, d: T });
  add({ id: 'court-west', role: 'wall', shape: 'box', x: x0, y: 0, z: courtZ, w: T, h: ROOM_H, d: courtD });
  if (!plan.enclosureOpen) {
    add({
      id: 'court-east',
      role: 'wall',
      shape: 'box',
      x: massEast - T,
      y: 0,
      z: courtZ,
      w: T,
      h: ROOM_H,
      d: courtD,
    });
  }

  const court: RectXZ = { x: x0 + T, z: courtZ, w: massW - 2 * T, d: courtD };

  openings.push({
    id: 'cruciform',
    hostId: 'sun-wall',
    face: 'pz',
    kind: 'cruciform',
    purpose: 'sun',
    u: PANEL_H,
    v: PANEL_H,
    width: massW - 2 * PANEL_H,
    height: crossH - 2 * PANEL_H,
    arm: 2,
  });
  openings.push({
    id: 'court-glass',
    hostId: 'facade',
    face: 'pz',
    kind: 'glass-slot',
    purpose: 'sun',
    u: leftW,
    v: T,
    width: slotW,
    height: ROOM_H - 2 * T,
    arm: slotW,
  });

  const balW = 12;
  const balD = 16;
  const balSlab = 2;
  const balX = massEast;
  const balZ = z0;
  add({
    id: 'landing',
    role: 'landing',
    shape: 'box',
    x: balX,
    y: STORY - balSlab,
    z: balZ,
    w: balW,
    h: balSlab,
    d: balD,
  });

  openings.push({
    id: 'entry-door',
    hostId: 'primary-east',
    face: 'px',
    kind: 'glass-slot',
    purpose: 'entry',
    u: 3,
    v: STORY,
    width: 10,
    height: 14,
    arm: 10,
  });

  const rise = STORY;
  const pathW = 8;
  const pathX = balX + Math.floor((balW - pathW) / 2);
  const topZ = balZ + balD;
  const available = site.z + site.d - 6 - topZ;
  let kind: 'ramp' | 'stair' = 'stair';
  let run = rise * 2;
  if (plan.circulationRamp && available >= rise * 4) {
    kind = 'ramp';
    run = Math.floor(Math.min(available, rise * 6) / 3) * 3;
  }
  if (run < rise * 2 || topZ + run > site.z + site.d - 4) {
    throw new Error(`circulation run ${run} does not fit (available ${available})`);
  }

  const circulation = {
    kind,
    x0: pathX + pathW / 2,
    y0: STORY,
    z0: topZ,
    x1: pathX + pathW / 2,
    y1: 0,
    z1: topZ + run,
    width: pathW,
    bounds: { x: pathX, y: 0, z: topZ, w: pathW, h: STORY, d: run },
  };
  if (solids.some((solid) => boxesOverlap(circulation.bounds, solid, 0))) {
    const hit = solids.find((solid) => boxesOverlap(circulation.bounds, solid, 0));
    throw new Error(`circulation overlaps ${hit?.id}`);
  }

  let budget = params.volumes - 1;
  if (budget > 0) {
    const wingD = Math.min(plan.wingWestD, roomD);
    const placed = add(
      {
        id: 'wing-west',
        role: 'wing',
        shape: 'box',
        x: x0 - plan.wingWestW,
        y: 0,
        z: z0,
        w: plan.wingWestW,
        h: STORY,
        d: wingD,
      },
      true,
    );
    if (placed) {
      budget -= 1;
      const count = plan.slitCount;
      const margin = 4;
      const inner = plan.wingWestW - 2 * margin;
      const step = Math.floor(inner / count);
      if (step >= 3) {
        for (let i = 0; i < count; i++) {
          const slitW = 1;
          const u = margin + i * step + Math.floor((step - slitW) / 2);
          openings.push({
            id: `wing-slit-${i}`,
            hostId: 'wing-west',
            face: 'pz',
            kind: 'slit',
            purpose: 'sun',
            u,
            v: 6,
            width: slitW,
            height: 12,
            arm: slitW,
          });
        }
      }
    }
  }

  if (budget > 0) {
    const northW = Math.min(leftW, 36);
    const placed = add(
      {
        id: 'wing-north',
        role: 'wing',
        shape: 'box',
        x: x0,
        y: 0,
        z: z0 - plan.wingNorthD,
        w: northW,
        h: STORY,
        d: plan.wingNorthD,
      },
      true,
    );
    if (placed) budget -= 1;
  }

  if (budget > 0 && plan.wantPavilion && court.w >= 28 && court.d >= 28) {
    const ps = 18;
    add(
      {
        id: 'pavilion',
        role: 'pavilion',
        shape: plan.pavilionRound ? 'cylinder' : 'box',
        x: court.x + Math.floor((court.w - ps) / 2),
        y: 0,
        z: court.z + 4,
        w: ps,
        h: STORY,
        d: ps,
      },
      true,
    );
  }

  const crossTop = crossH;
  const westScreen: UnitBox = {
    id: 'screen-west',
    role: 'screen',
    shape: 'box',
    x: x0 - 15 - T,
    y: 0,
    z: crossZ - 9,
    w: T,
    h: crossTop,
    d: 72,
  };
  if (westScreen.z + westScreen.d > site.z + site.d - 4) {
    westScreen.d = site.z + site.d - 4 - westScreen.z;
  }
  add(westScreen);
  openings.push({
    id: 'screen-west-slit',
    hostId: 'screen-west',
    face: 'px',
    kind: 'slit',
    purpose: 'procession',
    u: Math.max(4, Math.floor(westScreen.d * 0.35)),
    v: 8,
    width: 2,
    height: Math.min(18, westScreen.h - 12),
    arm: 2,
  });

  if (plan.screenReturn) {
    const retX = westScreen.x + T;
    const retW = Math.min(24, x0 - 6 - retX);
    if (retW >= 9) {
      add(
        {
          id: 'screen-return',
          role: 'screen',
          shape: 'box',
          x: retX,
          y: 0,
          z: westScreen.z + westScreen.d - T,
          w: retW,
          h: Math.min(crossTop, ROOM_H),
          d: T,
        },
        true,
      );
    }
  }

  const screenZ = Math.max(site.z + 4, z0 - 12);
  const screenEnd = Math.min(site.z + site.d - 4, topZ + run + 8);
  const eastScreen: UnitBox = {
    id: 'screen-east',
    role: 'screen',
    shape: 'box',
    x: site.x + site.w - 8 - T,
    y: 0,
    z: screenZ,
    w: T,
    h: crossTop,
    d: screenEnd - screenZ,
  };
  add(eastScreen);
  openings.push({
    id: 'screen-east-slit',
    hostId: 'screen-east',
    face: 'nx',
    kind: 'slit',
    purpose: 'procession',
    u: Math.max(4, Math.floor(eastScreen.d * 0.45)),
    v: 8,
    width: 2,
    height: Math.min(18, eastScreen.h - 12),
    arm: 2,
  });

  const waters: Array<RectXZ & { id: string; shape: 'rect' | 'circle' }> = [];
  const want = params.water;

  const pushWater = (id: string, rect: RectXZ, shape: 'rect' | 'circle'): boolean => {
    if (rect.w < 6 || rect.d < 6 || !insideSite(rect, site)) return false;
    if (planHits(rect, solids, 0, 2)) return false;
    if (waters.some((other) => boxesOverlap({ ...rect, y: 0, h: 1 }, { ...other, y: 0, h: 1 }, 0))) return false;
    waters.push({ id, ...rect, shape });
    return true;
  };

  if (want >= 1) {
    const pavilion = solids.find((solid) => solid.id === 'pavilion');
    const zStart = pavilion ? pavilion.z + pavilion.d + 3 : court.z + 4;
    const zEnd = court.z + court.d - 4;
    const basinD = zEnd - zStart;
    if (basinD >= 10) {
      const inset = 4;
      pushWater('court-basin', {
        x: court.x + inset,
        z: zStart,
        w: court.w - inset * 2,
        d: basinD,
      }, 'rect');
    }
  }

  if (waters.length < want) {
    const pool: RectXZ = {
      x: x0 + 8,
      z: crossZ + T + 8,
      w: massW - 16,
      d: 20,
    };
    const shape = plan.roundWater ? 'circle' : 'rect';
    if (shape === 'circle') {
      const side = Math.min(pool.w, pool.d);
      pool.x += Math.floor((pool.w - side) / 2);
      pool.z += Math.floor((pool.d - side) / 2);
      pool.w = side;
      pool.d = side;
    }
    pushWater('approach-pool', pool, shape);
  }

  if (waters.length < want) {
    const channel: RectXZ = { x: x0 - 12, z: crossZ + T + 6, w: 8, d: 28 };
    if (!pushWater('side-channel', channel, 'rect')) {
      const north: RectXZ = { x: x0 + leftW + slotW + 4, z: z0 - 16, w: Math.max(8, rightW - 8), d: 10 };
      pushWater('north-basin', north, 'rect');
    }
  }

  let garden: RectXZ | null = null;
  if (plan.garden) {
    const patch: RectXZ = { x: site.x + 8, z: site.z + 8, w: 30, d: 22 };
    const blocked =
      planHits(patch, solids, 0, 1) ||
      waters.some((water) => boxesOverlap({ ...patch, y: 0, h: 1 }, { ...water, y: 0, h: 1 }, 0)) ||
      boxesOverlap({ ...patch, y: 0, h: 1 }, { ...court, y: 0, h: 1 }, 0);
    if (!blocked && insideSite(patch, site)) garden = patch;
  }

  let entrySide: 'east' | 'west' = 'east';
  let enclosure: 'closed' | 'open-side' = plan.enclosureOpen ? 'open-side' : 'closed';
  if (plan.mirror) {
    mirrorX(site, solids, openings, waters, circulation, garden, court);
    entrySide = 'west';
  }

  return { site, court, solids, openings, waters, circulation, garden, entrySide, enclosure };
}

function mirrorX(
  site: RectXZ,
  solids: UnitBox[],
  openings: UnitOpening[],
  waters: Array<RectXZ & { id: string }>,
  circulation: { x0: number; x1: number; bounds: Box },
  garden: RectXZ | null,
  court: RectXZ,
): void {
  const flip = (box: { x: number; w: number }) => {
    box.x = -box.x - box.w;
  };
  flip(site);
  flip(court);
  for (const solid of solids) flip(solid);
  for (const water of waters) flip(water);
  if (garden) flip(garden);
  circulation.x0 = -circulation.x0;
  circulation.x1 = -circulation.x1;
  flip(circulation.bounds);
  for (const opening of openings) {
    const host = solids.find((solid) => solid.id === opening.hostId);
    if (!host) throw new Error(`mirror lost host ${opening.hostId}`);
    if (opening.face === 'px') opening.face = 'nx';
    else if (opening.face === 'nx') opening.face = 'px';
    else opening.u = host.w - opening.u - opening.width;
  }
}

function scaleBox<T extends Box>(box: T, unit: number): T {
  return { ...box, x: box.x * unit, y: box.y * unit, z: box.z * unit, w: box.w * unit, h: box.h * unit, d: box.d * unit };
}

function scaleRect(rect: RectXZ, unit: number): RectXZ {
  return { x: rect.x * unit, z: rect.z * unit, w: rect.w * unit, d: rect.d * unit };
}

export function generateHouse(partial: Partial<GenerateParams> = {}): House {
  const params = normalizeParams(partial);
  const rng = makeRng(hashSeed(params.seed));
  const plan = rollPlan(rng);
  const model = generateUnits(plan, params);
  const unit = 0.15 * params.scale;
  const story = STORY * unit;

  const solids: Solid[] = model.solids.map((solid) => scaleBox(solid, unit));
  const openings: Opening[] = model.openings.map((op) => ({
    ...op,
    u: op.u * unit,
    v: op.v * unit,
    width: op.width * unit,
    height: op.height * unit,
    arm: op.arm * unit,
  }));
  const waters: WaterFeature[] = model.waters.map((water) => ({
    id: water.id,
    ...scaleRect(water, unit),
    y: 0.28 * unit,
    depth: 0.12 * unit,
    shape: water.shape,
  }));
  const circulation: Circulation[] = [
    {
      id: 'procession',
      kind: model.circulation.kind,
      x0: model.circulation.x0 * unit,
      y0: model.circulation.y0 * unit,
      z0: model.circulation.z0 * unit,
      x1: model.circulation.x1 * unit,
      y1: model.circulation.y1 * unit,
      z1: model.circulation.z1 * unit,
      width: model.circulation.width * unit,
      bounds: scaleBox(model.circulation.bounds, unit),
    },
  ];

  const logical = 1 + solids.filter((solid) => solid.role === 'wing' || solid.role === 'pavilion').length;
  const enclosureLabel = model.enclosure === 'closed' ? 'enclosed court' : 'court open to the entry';
  const summary = `${enclosureLabel} · ${circulation[0]!.kind} · ${logical} volume${logical === 1 ? '' : 's'} · ${waters.length} basin${waters.length === 1 ? '' : 's'}`;

  const house: House = {
    seed: params.seed,
    params,
    unit,
    panel: { w: PANEL_W * unit, h: PANEL_H * unit },
    wallThickness: T * unit,
    story,
    levels: [0, story],
    site: scaleRect(model.site, unit),
    designSun: { x: 0, y: 0, z: 1 },
    entrySide: model.entrySide,
    enclosure: model.enclosure,
    court: scaleRect(model.court, unit),
    solids,
    openings,
    waters,
    circulation,
    garden: model.garden ? scaleRect(model.garden, unit) : null,
    summary,
  };

  const errors = checkInvariants(house);
  if (errors.length > 0) {
    throw new Error(`seed ${params.seed} broke the grammar: ${errors.join('; ')}`);
  }
  return house;
}
