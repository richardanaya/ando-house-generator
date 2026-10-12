import type { GenerateParams } from './params';

/** Cardinal face of an axis-aligned box. +X east, +Z south, +Y up. */
export type Face = 'px' | 'nx' | 'pz' | 'nz';

export type SolidRole = 'primary' | 'wing' | 'pavilion' | 'wall' | 'screen' | 'landing';

export type OpeningKind = 'slit' | 'glass-slot' | 'cruciform';

export type OpeningPurpose = 'sun' | 'entry' | 'procession';

export interface Box {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
}

export interface Solid extends Box {
  id: string;
  role: SolidRole;
  /** Cylinder is inscribed in the box; collision uses the box. */
  shape: 'box' | 'cylinder';
}

export interface Opening {
  id: string;
  hostId: string;
  face: Face;
  kind: OpeningKind;
  purpose: OpeningPurpose;
  /** Min corner on the face, meters from the face origin. */
  u: number;
  v: number;
  width: number;
  height: number;
  /** Cruciform arm thickness. Other kinds store their minor span. */
  arm: number;
}

export interface WaterFeature {
  id: string;
  x: number;
  z: number;
  w: number;
  d: number;
  /** Surface height in meters. */
  y: number;
  /** How far the water extends below the surface. */
  depth: number;
  shape: 'rect' | 'circle';
}

export interface Circulation {
  id: string;
  kind: 'ramp' | 'stair';
  /** Centerline, top end (upper level). */
  x0: number;
  y0: number;
  z0: number;
  /** Centerline, bottom end (ground). */
  x1: number;
  y1: number;
  z1: number;
  width: number;
  /** Reserved clear volume. Interiors stay disjoint from solids. */
  bounds: Box;
}

export interface RectXZ {
  x: number;
  z: number;
  w: number;
  d: number;
}

export interface House {
  seed: string;
  params: GenerateParams;
  /** Meters per grammar unit. */
  unit: number;
  panel: { w: number; h: number };
  wallThickness: number;
  story: number;
  levels: number[];
  site: RectXZ;
  /** Unit vector the sun-opening rule faces. +Z is design south. */
  designSun: { x: number; y: number; z: number };
  entrySide: 'east' | 'west';
  enclosure: 'closed' | 'open-side';
  court: RectXZ;
  solids: Solid[];
  openings: Opening[];
  waters: WaterFeature[];
  circulation: Circulation[];
  garden: RectXZ | null;
  summary: string;
}
