export interface GenerateParams {
  seed: string;
  /** Uniform multiplier on the 0.15 m grammar unit. 1 → 1.8×0.9 m panels. */
  scale: number;
  /** Maximum compositional volumes: the primary house plus wings and a pavilion. */
  volumes: number;
  /** Maximum water features. 0 is a dry court. */
  water: number;
}

export const LIMITS = {
  scale: { min: 0.7, max: 1.4, step: 0.05, default: 1 },
  volumes: { min: 1, max: 4, step: 1, default: 3 },
  water: { min: 0, max: 3, step: 1, default: 2 },
  sun: { min: 6, max: 18, step: 0.1, default: 9.5 },
} as const;

function finite(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeParams(partial: Partial<GenerateParams> = {}): GenerateParams {
  const seed = (partial.seed ?? 'ando').trim() || 'ando';
  const scale = clamp(finite(partial.scale, LIMITS.scale.default), LIMITS.scale.min, LIMITS.scale.max);
  const volumes = clamp(
    Math.round(finite(partial.volumes, LIMITS.volumes.default)),
    LIMITS.volumes.min,
    LIMITS.volumes.max,
  );
  const water = clamp(
    Math.round(finite(partial.water, LIMITS.water.default)),
    LIMITS.water.min,
    LIMITS.water.max,
  );
  return { seed, scale, volumes, water };
}

export function paramsFromSearch(search: string): GenerateParams {
  const q = new URLSearchParams(search);
  return normalizeParams({
    seed: q.get('seed') ?? undefined,
    scale: q.has('scale') ? Number(q.get('scale')) : undefined,
    volumes: q.has('volumes') ? Number(q.get('volumes')) : undefined,
    water: q.has('water') ? Number(q.get('water')) : undefined,
  });
}

export function sunFromSearch(search: string): number {
  const q = new URLSearchParams(search);
  const raw = q.has('sun') ? Number(q.get('sun')) : LIMITS.sun.default;
  return clamp(finite(raw, LIMITS.sun.default), LIMITS.sun.min, LIMITS.sun.max);
}

export function writeSearch(params: GenerateParams, sunHour: number): string {
  const q = new URLSearchParams();
  q.set('seed', params.seed);
  q.set('scale', String(roundTo(params.scale, 100)));
  q.set('volumes', String(params.volumes));
  q.set('water', String(params.water));
  q.set('sun', sunHour.toFixed(1));
  return `?${q.toString()}`;
}

function roundTo(value: number, places: number): number {
  return Math.round(value * places) / places;
}
