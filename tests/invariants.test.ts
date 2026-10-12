import { describe, expect, it } from 'vitest';
import { generateHouse } from '../src/grammar';
import { checkInvariants } from '../src/invariants';
import type { GenerateParams } from '../src/params';
import type { House, Solid } from '../src/types';

const SCALES = [0.7, 1, 1.4];

function roundSolid(solid: Solid, unit: number) {
  const r = (n: number) => Math.round((n / unit) * 1e6) / 1e6;
  return { id: solid.id, role: solid.role, shape: solid.shape, x: r(solid.x), y: r(solid.y), z: r(solid.z), w: r(solid.w), h: r(solid.h), d: r(solid.d) };
}

describe('grammar invariants', () => {
  it('accepts every combination of seed, volume count, water, and scale', () => {
    const seeds = ['ando', 'light', '0', 'church', '42', ...Array.from({ length: 28 }, (_, i) => `s${i}`)];
    for (const seed of seeds) {
      for (const volumes of [1, 2, 3, 4]) {
        for (const water of [0, 1, 2, 3]) {
          for (const scale of seed === 'ando' || seed.startsWith('s') ? [1] : SCALES) {
            const house = generateHouse({ seed, volumes, water, scale });
            expect(checkInvariants(house), `${seed} v${volumes} w${water} s${scale}`).toEqual([]);
          }
        }
      }
    }
  });

  it('keeps solids, openings, and circulation independent of the water slider', () => {
    const dry = generateHouse({ seed: 'axis', scale: 1, volumes: 4, water: 0 });
    const wet = generateHouse({ seed: 'axis', scale: 1, volumes: 4, water: 3 });
    expect(wet.solids).toEqual(dry.solids);
    expect(wet.openings).toEqual(dry.openings);
    expect(wet.circulation).toEqual(dry.circulation);
    expect(wet.waters.length).toBeGreaterThan(dry.waters.length);
  });

  it('only adds volumes as the slider rises', () => {
    const small = generateHouse({ seed: 'nave', scale: 1, volumes: 1, water: 2 });
    const large = generateHouse({ seed: 'nave', scale: 1, volumes: 4, water: 2 });
    for (const solid of small.solids) {
      expect(large.solids.find((other) => other.id === solid.id)).toEqual(solid);
    }
    expect(large.solids.length).toBeGreaterThanOrEqual(small.solids.length);
  });

  it('preserves topology when only scale changes', () => {
    const a = generateHouse({ seed: 'wall', scale: 0.8, volumes: 3, water: 2 });
    const b = generateHouse({ seed: 'wall', scale: 1.3, volumes: 3, water: 2 });
    expect(a.solids.map((solid) => roundSolid(solid, a.unit))).toEqual(b.solids.map((solid) => roundSolid(solid, b.unit)));
    expect(a.panel.w / a.params.scale).toBeCloseTo(1.8, 6);
    expect(a.panel.h / a.params.scale).toBeCloseTo(0.9, 6);
  });
});

describe('seed determinism', () => {
  it('repeats a house exactly and changes it when the seed changes', () => {
    const params: GenerateParams = { seed: 'chapel-21', scale: 1, volumes: 3, water: 2 };
    const first = generateHouse(params);
    const second = generateHouse(params);
    expect(serialize(first)).toBe(serialize(second));
    const other = generateHouse({ ...params, seed: 'chapel-22' });
    expect(serialize(other)).not.toBe(serialize(first));
  });
});

function serialize(house: House): string {
  return JSON.stringify(house);
}
