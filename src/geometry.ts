import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  type MeshPhysicalMaterial,
  type MeshStandardMaterial,
  PlaneGeometry,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { openingHoles } from './openings';
import type { Box, Circulation, Face, House, Opening, Solid } from './types';

export interface BuiltModel {
  content: Group;
  shafts: MeshBasicMaterial[];
  dispose: () => void;
}

interface Piece extends Box {}

export function buildModel(
  house: House,
  materials: {
    concrete: MeshStandardMaterial;
    glassClear: MeshPhysicalMaterial;
    glassDark: MeshPhysicalMaterial;
    steel: MeshStandardMaterial;
    gravel: MeshStandardMaterial;
    court: MeshStandardMaterial;
    grass: MeshStandardMaterial;
    ground: MeshStandardMaterial;
  },
): BuiltModel {
  const concretePieces: BufferGeometry[] = [];
  const clearPieces: BufferGeometry[] = [];
  const darkPieces: BufferGeometry[] = [];
  const steelPieces: BufferGeometry[] = [];
  const shaftMaterials: MeshBasicMaterial[] = [];
  const content = new Group();
  content.name = 'house';

  const pavilion = house.solids.find((solid) => solid.role === 'pavilion');
  const sunWall = house.solids.find((solid) => solid.id === 'sun-wall');
  let crossShaft = house.court.d * 0.82;
  if (pavilion && sunWall) {
    const gap = sunWall.z - (pavilion.z + pavilion.d);
    crossShaft = Math.max(house.unit * 8, gap - house.unit * 1.5);
  }

  for (const solid of house.solids) {
    if (solid.shape === 'cylinder') {
      concretePieces.push(cylinderPiece(solid, house.panel.w, house.panel.h));
      continue;
    }
    const hosted = house.openings.filter((op) => op.hostId === solid.id);
    const cut = hosted.filter((op) => isPlanarWall(solid, op.face, house.wallThickness));
    const pieces = cut.length ? cutWall(solid, cut) : [solid];
    for (const piece of pieces) {
      if (piece.w < 0.02 || piece.h < 0.02 || piece.d < 0.02) continue;
      concretePieces.push(boxPiece(piece, house.panel.w, house.panel.h));
    }
    for (const op of hosted) {
      addOpeningMesh(
        solid,
        op,
        house,
        cut.includes(op),
        crossShaft,
        cut.includes(op) ? clearPieces : darkPieces,
        steelPieces,
        content,
        shaftMaterials,
      );
    }
  }

  for (const run of house.circulation) {
    if (run.kind === 'stair') addStairs(run, house, concretePieces);
    else concretePieces.push(rampPiece(run, house.panel.w, house.panel.h));
  }

  pushMerged(content, concretePieces, materials.concrete, true);
  pushMerged(content, clearPieces, materials.glassClear, false);
  pushMerged(content, darkPieces, materials.glassDark, false);
  pushMerged(content, steelPieces, materials.steel, true);

  const ground = new Mesh(new PlaneGeometry(220, 220), materials.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  ground.name = 'ground';
  content.add(ground);

  const padMat = materials.gravel.clone();
  padMat.map = materials.gravel.map;
  const pad = new Mesh(new PlaneGeometry(house.site.w, house.site.d), padMat);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(house.site.x + house.site.w / 2, 0.01, house.site.z + house.site.d / 2);
  pad.receiveShadow = true;
  content.add(pad);

  const court = new Mesh(new PlaneGeometry(Math.max(0.2, house.court.w - 0.08), Math.max(0.2, house.court.d - 0.08)), materials.court);
  court.rotation.x = -Math.PI / 2;
  court.position.set(house.court.x + house.court.w / 2, 0.02, house.court.z + house.court.d / 2);
  court.receiveShadow = true;
  content.add(court);

  if (house.garden) {
    const grass = new Mesh(new PlaneGeometry(house.garden.w, house.garden.d), materials.grass);
    grass.rotation.x = -Math.PI / 2;
    grass.position.set(house.garden.x + house.garden.w / 2, 0.018, house.garden.z + house.garden.d / 2);
    grass.receiveShadow = true;
    content.add(grass);
  }

  return {
    content,
    shafts: shaftMaterials,
    dispose: () => {
      content.traverse((obj) => {
        const mesh = obj as Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      for (const mat of shaftMaterials) mat.dispose();
      padMat.dispose();
    },
  };
}

function isPlanarWall(solid: Solid, face: Face, wallT: number): boolean {
  const thickness = face === 'px' || face === 'nx' ? solid.w : solid.d;
  return thickness <= wallT * 1.15;
}

function cutWall(solid: Solid, openings: Opening[]): Piece[] {
  const face = openings[0]!.face;
  if (face === 'px' || face === 'nx') {
    const profile = { x: solid.z, y: solid.y, w: solid.d, h: solid.h };
    const holes = openings.flatMap((op) =>
      openingHoles(op).map((hole) => ({ x: solid.z + hole.x, y: solid.y + hole.y, w: hole.w, h: hole.h })),
    );
    return subtractProfile(profile, holes).map((part) => ({
      x: solid.x,
      y: part.y,
      z: part.x,
      w: solid.w,
      h: part.h,
      d: part.w,
    }));
  }
  const profile = { x: solid.x, y: solid.y, w: solid.w, h: solid.h };
  const holes = openings.flatMap((op) =>
    openingHoles(op).map((hole) => ({ x: solid.x + hole.x, y: solid.y + hole.y, w: hole.w, h: hole.h })),
  );
  return subtractProfile(profile, holes).map((part) => ({
    x: part.x,
    y: part.y,
    z: solid.z,
    w: part.w,
    h: part.h,
    d: solid.d,
  }));
}

function subtractProfile(
  host: { x: number; y: number; w: number; h: number },
  holes: { x: number; y: number; w: number; h: number }[],
): { x: number; y: number; w: number; h: number }[] {
  let parts = [host];
  for (const hole of holes) {
    const next: typeof parts = [];
    for (const part of parts) next.push(...subtractOne(part, hole));
    parts = next;
  }
  return parts;
}

function subtractOne(
  host: { x: number; y: number; w: number; h: number },
  hole: { x: number; y: number; w: number; h: number },
): { x: number; y: number; w: number; h: number }[] {
  const x0 = Math.max(host.x, hole.x);
  const y0 = Math.max(host.y, hole.y);
  const x1 = Math.min(host.x + host.w, hole.x + hole.w);
  const y1 = Math.min(host.y + host.h, hole.y + hole.h);
  if (x1 - x0 <= 1e-5 || y1 - y0 <= 1e-5) return [host];
  const out: { x: number; y: number; w: number; h: number }[] = [];
  if (x0 - host.x > 1e-4) out.push({ x: host.x, y: host.y, w: x0 - host.x, h: host.h });
  if (host.x + host.w - x1 > 1e-4) out.push({ x: x1, y: host.y, w: host.x + host.w - x1, h: host.h });
  if (y0 - host.y > 1e-4) out.push({ x: x0, y: host.y, w: x1 - x0, h: y0 - host.y });
  if (host.y + host.h - y1 > 1e-4) out.push({ x: x0, y: y1, w: x1 - x0, h: host.y + host.h - y1 });
  return out;
}

function addOpeningMesh(
  solid: Solid,
  op: Opening,
  house: House,
  cutThrough: boolean,
  crossShaft: number,
  glass: BufferGeometry[],
  steel: BufferGeometry[],
  content: Group,
  shafts: MeshBasicMaterial[],
): void {
  const holes = openingHoles(op);
  const frame = op.kind === 'glass-slot';
  for (const hole of holes) {
    if (op.kind !== 'slit' || !cutThrough) {
        glass.push(glassPiece(solid, op.face, hole, cutThrough, op.kind === 'glass-slot' ? 0.04 : 0.008));
    }
    if (frame) steel.push(...framePieces(solid, op.face, hole, cutThrough));
    if (!cutThrough || op.purpose === 'entry') continue;
    const shaft = shaftPiece(solid, op, hole, house, crossShaft);
    if (!shaft) continue;
    const gain = op.kind === 'cruciform' ? 0.16 : 0.07;
    const material = new MeshBasicMaterial({
      color: 0xfff0d2,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: AdditiveBlending,
      side: DoubleSide,
    });
    material.userData.gain = gain;
    const mesh = new Mesh(boxPiece(shaft, house.panel.w, house.panel.h), material);
    mesh.userData.shaft = true;
    content.add(mesh);
    shafts.push(material);
  }
}

function glassPiece(
  solid: Solid,
  face: Face,
  hole: { x: number; y: number; w: number; h: number },
  cutThrough: boolean,
  inset: number,
): BufferGeometry {
  const pane = 0.02;
  if (face === 'pz' || face === 'nz') {
    const z = cutThrough ? solid.z + solid.d / 2 - pane / 2 : face === 'pz' ? solid.z + solid.d - pane : solid.z;
    return boxPiece(
      {
        x: solid.x + hole.x + inset,
        y: solid.y + hole.y + inset,
        z,
        w: Math.max(0.02, hole.w - inset * 2),
        h: Math.max(0.02, hole.h - inset * 2),
        d: pane,
      },
      1,
      1,
    );
  }
  const x = cutThrough ? solid.x + solid.w / 2 - pane / 2 : face === 'px' ? solid.x + solid.w - pane : solid.x;
  return boxPiece(
    {
      x,
      y: solid.y + hole.y + inset,
      z: solid.z + hole.x + inset,
      w: pane,
      h: Math.max(0.02, hole.h - inset * 2),
      d: Math.max(0.02, hole.w - inset * 2),
    },
    1,
    1,
  );
}

function framePieces(
  solid: Solid,
  face: Face,
  hole: { x: number; y: number; w: number; h: number },
  cutThrough: boolean,
): BufferGeometry[] {
  const t = 0.028;
  const depth = 0.045;
  const boxes: Piece[] = [];
  if (face === 'pz' || face === 'nz') {
    const z = cutThrough ? solid.z + (solid.d - depth) / 2 : face === 'pz' ? solid.z + solid.d - depth * 0.35 : solid.z - depth * 0.65;
    const x = solid.x + hole.x;
    const y = solid.y + hole.y;
    boxes.push(
      { x, y, z, w: hole.w, h: t, d: depth },
      { x, y: y + hole.h - t, z, w: hole.w, h: t, d: depth },
      { x, y: y + t, z, w: t, h: Math.max(0.02, hole.h - 2 * t), d: depth },
      { x: x + hole.w - t, y: y + t, z, w: t, h: Math.max(0.02, hole.h - 2 * t), d: depth },
    );
  } else {
    const x = cutThrough ? solid.x + (solid.w - depth) / 2 : face === 'px' ? solid.x + solid.w - depth * 0.35 : solid.x - depth * 0.65;
    const z = solid.z + hole.x;
    const y = solid.y + hole.y;
    boxes.push(
      { x, y, z, w: depth, h: t, d: hole.w },
      { x, y: y + hole.h - t, z, w: depth, h: t, d: hole.w },
      { x, y: y + t, z, w: depth, h: Math.max(0.02, hole.h - 2 * t), d: t },
      { x, y: y + t, z: z + hole.w - t, w: depth, h: Math.max(0.02, hole.h - 2 * t), d: t },
    );
  }
  return boxes.map((box) => boxPiece(box, 1, 1));
}

function shaftPiece(solid: Solid, op: Opening, hole: { x: number; y: number; w: number; h: number }, house: House, crossShaft: number): Piece | null {
  if (op.face === 'pz' && op.kind === 'cruciform') {
    return {
      x: solid.x + hole.x,
      y: solid.y + hole.y,
      z: solid.z - crossShaft,
      w: hole.w,
      h: hole.h,
      d: crossShaft,
    };
  }
  if (op.face === 'pz' && op.id === 'court-glass') {
    const length = Math.min(house.court.d * 0.55, 4.5);
    return {
      x: solid.x + hole.x,
      y: solid.y + hole.y,
      z: solid.z - length,
      w: hole.w,
      h: hole.h,
      d: length,
    };
  }
  if (op.purpose !== 'procession') return null;
  const length = 2.4 * house.params.scale;
  if (op.face === 'px') {
    return {
      x: solid.x + solid.w,
      y: solid.y + hole.y,
      z: solid.z + hole.x,
      w: length,
      h: hole.h,
      d: hole.w,
    };
  }
  if (op.face === 'nx') {
    return {
      x: solid.x - length,
      y: solid.y + hole.y,
      z: solid.z + hole.x,
      w: length,
      h: hole.h,
      d: hole.w,
    };
  }
  return null;
}

function addStairs(run: Circulation, house: House, out: BufferGeometry[]): void {
  const rise = Math.abs(run.y0 - run.y1);
  const steps = Math.max(2, Math.round(rise / house.unit));
  const riser = rise / steps;
  const tread = Math.abs(run.z1 - run.z0) / steps;
  const zBottom = Math.max(run.z0, run.z1);
  for (let i = 0; i < steps; i++) {
    out.push(
      boxPiece(
        {
          x: run.bounds.x,
          y: i * riser,
          z: zBottom - (i + 1) * tread + 0.01,
          w: run.bounds.w,
          h: riser,
          d: Math.max(0.04, tread - 0.012),
        },
        house.panel.w,
        house.panel.h,
      ),
    );
  }
}

function rampPiece(run: Circulation, panelW: number, panelH: number): BufferGeometry {
  const dz = run.z1 - run.z0;
  const dy = run.y0 - run.y1;
  const length = Math.max(0.2, Math.hypot(dz, dy) - 0.04);
  const angle = Math.atan2(Math.abs(dy), Math.abs(dz));
  const thickness = 0.16;
  const geo = new BoxGeometry(run.width, thickness, length);
  // Walking surface on local y = 0, slab hanging below, +Z end dropping.
  geo.translate(0, -thickness / 2, 0);
  geo.rotateX(dz * dy >= 0 ? angle : -angle);
  geo.translate((run.x0 + run.x1) / 2, (run.y0 + run.y1) / 2, (run.z0 + run.z1) / 2);
  applyWorldPanelUVs(geo, panelW, panelH);
  return geo;
}

function boxPiece(box: Piece, panelW: number, panelH: number): BufferGeometry {
  const geo = new BoxGeometry(box.w, box.h, box.d);
  geo.translate(box.x + box.w / 2, box.y + box.h / 2, box.z + box.d / 2);
  applyWorldPanelUVs(geo, panelW, panelH);
  return geo;
}

function cylinderPiece(solid: Solid, panelW: number, panelH: number): BufferGeometry {
  const radius = Math.min(solid.w, solid.d) / 2;
  const geo = new CylinderGeometry(radius, radius, solid.h, 36);
  geo.translate(solid.x + solid.w / 2, solid.y + solid.h / 2, solid.z + solid.d / 2);
  applyWorldPanelUVs(geo, panelW, panelH);
  return geo;
}

function applyWorldPanelUVs(geo: BufferGeometry, panelW: number, panelH: number): void {
  const pos = geo.attributes.position;
  const normal = geo.attributes.normal;
  const uv = geo.attributes.uv;
  if (!pos || !normal || !uv) return;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const nx = Math.abs(normal.getX(i));
    const ny = Math.abs(normal.getY(i));
    const nz = Math.abs(normal.getZ(i));
    let u: number;
    let v: number;
    if (ny >= nx && ny >= nz) {
      u = x / panelW;
      v = z / panelH;
    } else if (nx >= nz) {
      u = z / panelW;
      v = y / panelH;
    } else {
      u = x / panelW;
      v = y / panelH;
    }
    uv.setXY(i, u, v);
  }
  uv.needsUpdate = true;
}

function pushMerged(group: Group, parts: BufferGeometry[], material: MeshStandardMaterial | MeshPhysicalMaterial, shadows: boolean): void {
  if (!parts.length) return;
  const merged = mergeGeometries(parts, false);
  for (const part of parts) part.dispose();
  if (!merged) return;
  const mesh = new Mesh(merged, material);
  mesh.castShadow = shadows;
  mesh.receiveShadow = true;
  group.add(mesh);
}
