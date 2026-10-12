import {
  CanvasTexture,
  Color,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  type Texture,
  type WebGLRenderer,
} from 'three';
import { PANEL_TIE_HOLES } from './panel';
import { makeRng } from '../rng';

export interface ConcreteMaps {
  color: CanvasTexture;
  normal: CanvasTexture;
  roughness: CanvasTexture;
}

export function createConcreteMaps(): ConcreteMaps {
  const width = 1024;
  const height = 512;
  const color = document.createElement('canvas');
  const normal = document.createElement('canvas');
  const rough = document.createElement('canvas');
  color.width = normal.width = rough.width = width;
  color.height = normal.height = rough.height = height;

  const cctx = color.getContext('2d')!;
  const nctx = normal.getContext('2d')!;
  const rctx = rough.getContext('2d')!;

  cctx.fillStyle = '#b1ada6';
  cctx.fillRect(0, 0, width, height);
  const image = cctx.getImageData(0, 0, width, height);
  const rng = makeRng(0x5eed1234);
  for (let i = 0; i < image.data.length; i += 4) {
    const n = (rng.next() - 0.5) * 18;
    image.data[i] = clamp8(image.data[i]! + n);
    image.data[i + 1] = clamp8(image.data[i + 1]! + n);
    image.data[i + 2] = clamp8(image.data[i + 2]! + n * 0.85);
  }
  // Faint board grain, horizontal, so raking light picks up the form.
  for (let y = 0; y < height; y++) {
    const band = Math.sin(y * 0.37) * 4 + Math.sin(y * 1.7) * 2;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      image.data[i] = clamp8(image.data[i]! + band);
      image.data[i + 1] = clamp8(image.data[i + 1]! + band);
      image.data[i + 2] = clamp8(image.data[i + 2]! + band * 0.9);
    }
  }
  cctx.putImageData(image, 0, 0);

  cctx.strokeStyle = 'rgba(78, 74, 68, 0.85)';
  cctx.lineWidth = 3;
  cctx.strokeRect(1.5, 1.5, width - 3, height - 3);
  cctx.strokeStyle = 'rgba(90, 86, 80, 0.45)';
  cctx.lineWidth = 1;
  cctx.beginPath();
  cctx.moveTo(0, height * 0.5);
  cctx.lineTo(width, height * 0.5);
  cctx.stroke();

  for (const [u, v] of PANEL_TIE_HOLES) {
    const x = u * width;
    const y = (1 - v) * height;
    const rad = width * 0.034;
    const g = cctx.createRadialGradient(x, y, rad * 0.15, x, y, rad);
    g.addColorStop(0, 'rgba(48, 45, 42, 0.72)');
    g.addColorStop(0.45, 'rgba(92, 88, 82, 0.4)');
    g.addColorStop(0.72, 'rgba(186, 182, 174, 0.35)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    cctx.fillStyle = g;
    cctx.beginPath();
    cctx.arc(x, y, rad, 0, Math.PI * 2);
    cctx.fill();
  }

  const pixels = nctx.createImageData(width, height);
  const roughPx = rctx.createImageData(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let nx = 0;
      let ny = 0;
      let nz = 1;
      const seamX = Math.min(x, width - 1 - x);
      const seamY = Math.min(y, height - 1 - y);
      if (seamX < 5) nx += (x < width / 2 ? 1 : -1) * (1 - seamX / 5) * 0.85;
      if (seamY < 5) ny += (y < height / 2 ? -1 : 1) * (1 - seamY / 5) * 0.85;
      for (const [u, v] of PANEL_TIE_HOLES) {
        const cx = u * width;
        const cy = (1 - v) * height;
        const rad = width * 0.034;
        const dx = (x - cx) / rad;
        const dy = (y - cy) / rad;
        const dist = Math.hypot(dx, dy);
        if (dist < 1) {
          const pull = (1 - dist) * 0.95;
          nx += (-dx / (dist || 1)) * pull;
          ny += (-dy / (dist || 1)) * pull;
        }
      }
      const grain = Math.sin(y * 0.55) * 0.08;
      ny += grain;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      const i = (y * width + x) * 4;
      pixels.data[i] = clamp8((nx * 0.5 + 0.5) * 255);
      pixels.data[i + 1] = clamp8((ny * 0.5 + 0.5) * 255);
      pixels.data[i + 2] = clamp8((nz * 0.5 + 0.5) * 255);
      pixels.data[i + 3] = 255;
      const roughV = 196 + seamBoost(seamX, seamY) - holeSmooth(x, y, width, height);
      roughPx.data[i] = roughPx.data[i + 1] = roughPx.data[i + 2] = clamp8(roughV);
      roughPx.data[i + 3] = 255;
    }
  }
  nctx.putImageData(pixels, 0, 0);
  rctx.putImageData(roughPx, 0, 0);

  return {
    color: makeTexture(color, true),
    normal: makeTexture(normal, false),
    roughness: makeTexture(rough, false),
  };
}

function seamBoost(seamX: number, seamY: number): number {
  if (seamX < 4 || seamY < 4) return 28;
  return 0;
}

function holeSmooth(x: number, y: number, width: number, height: number): number {
  let smooth = 0;
  for (const [u, v] of PANEL_TIE_HOLES) {
    const dx = x - u * width;
    const dy = y - (1 - v) * height;
    const dist = Math.hypot(dx, dy) / (width * 0.034);
    if (dist < 1) smooth = Math.max(smooth, (1 - dist) * 40);
  }
  return smooth;
}

function makeTexture(canvas: HTMLCanvasElement, srgb: boolean): CanvasTexture {
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.anisotropy = 8;
  if (srgb) texture.colorSpace = SRGBColorSpace;
  return texture;
}

function clamp8(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function tuneAnisotropy(maps: ConcreteMaps, renderer: WebGLRenderer): void {
  const max = renderer.capabilities.getMaxAnisotropy();
  for (const texture of [maps.color, maps.normal, maps.roughness]) {
    texture.anisotropy = Math.min(8, max);
  }
}

export function createConcreteMaterial(maps: ConcreteMaps): MeshStandardMaterial {
  const material = new MeshStandardMaterial({
    map: maps.color,
    normalMap: maps.normal,
    roughnessMap: maps.roughness,
    color: new Color('#c4c0b8'),
    roughness: 0.92,
    metalness: 0,
  });
  material.normalScale.set(0.65, 0.65);
  return material;
}

export function createGravelMaterial(options?: { seed?: number; repeat?: number; color?: string }): MeshStandardMaterial {
  const seed = options?.seed ?? 2;
  const repeat = options?.repeat ?? 12;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#8c877f';
  ctx.fillRect(0, 0, size, size);
  const rng = makeRng(seed);
  for (let i = 0; i < 2400; i++) {
    const x = rng.next() * size;
    const y = rng.next() * size;
    const r = 0.6 + rng.next() * 2.4;
    const shade = 90 + rng.next() * 70;
    ctx.fillStyle = `rgba(${shade}, ${shade - 4}, ${shade - 10}, 0.55)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const map = new CanvasTexture(canvas);
  map.wrapS = RepeatWrapping;
  map.wrapT = RepeatWrapping;
  map.colorSpace = SRGBColorSpace;
  map.repeat.set(repeat, repeat);
  return new MeshStandardMaterial({ map, color: options?.color ?? '#a39e96', roughness: 1, metalness: 0 });
}

export function createGrassMaterial(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: '#6d7564', roughness: 1, metalness: 0 });
}

export function createSteelMaterial(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: '#232527', metalness: 0.86, roughness: 0.34 });
}

export function createGlassMaterial(): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: '#d5e0e2',
    metalness: 0,
    roughness: 0.045,
    transmission: 0.92,
    thickness: 0.04,
    ior: 1.45,
    transparent: true,
    envMapIntensity: 1.15,
  });
}

export function createBasinMaterial(): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: '#5d6c70',
    metalness: 0.78,
    roughness: 0.07,
    envMapIntensity: 1,
  });
}

export function disposeTexture(texture: Texture): void {
  texture.dispose();
}
