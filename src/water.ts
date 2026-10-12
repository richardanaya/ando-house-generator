import { CircleGeometry, Mesh, PlaneGeometry, type MeshStandardMaterial, type WebGLRenderer } from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import type { House, WaterFeature } from './types';

export interface BuiltWater {
  objects: Mesh[];
  dispose: () => void;
}

/** The largest basin gets a still Reflector. The rest are dark glossy planes. */
export function buildWater(house: House, basin: MeshStandardMaterial, renderer: WebGLRenderer): BuiltWater {
  const objects: Mesh[] = [];
  if (!house.waters.length) return { objects, dispose: () => undefined };

  const primary = [...house.waters].sort((a, b) => b.w * b.d - a.w * a.d)[0]!;
  for (const feature of house.waters) {
    if (feature === primary) objects.push(reflectingPool(feature, renderer));
    else objects.push(glossyPool(feature, basin));
  }

  return {
    objects,
    dispose: () => {
      for (const obj of objects) {
        obj.geometry.dispose();
        const reflector = obj as Reflector;
        if (typeof reflector.dispose === 'function' && obj !== objects.find((item) => item.material === basin)) {
          reflector.dispose();
        }
      }
    },
  };
}

function reflectingPool(feature: WaterFeature, renderer: WebGLRenderer): Reflector {
  const geo = feature.shape === 'circle' ? new CircleGeometry(feature.w / 2, 48) : new PlaneGeometry(feature.w, feature.d);
  const pixel = Math.min(renderer.getPixelRatio(), 1.5);
  const reflector = new Reflector(geo, {
    clipBias: 0.003,
    textureWidth: Math.min(1024, Math.floor(renderer.domElement.width * pixel) || 768),
    textureHeight: Math.min(1024, Math.floor(renderer.domElement.height * pixel) || 768),
    color: 0x8ea0a3,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.set(feature.x + feature.w / 2, feature.y, feature.z + feature.d / 2);
  reflector.receiveShadow = true;
  reflector.name = feature.id;
  return reflector;
}

function glossyPool(feature: WaterFeature, material: MeshStandardMaterial): Mesh {
  const geo = feature.shape === 'circle' ? new CircleGeometry(feature.w / 2, 40) : new PlaneGeometry(feature.w, feature.d);
  const mesh = new Mesh(geo, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(feature.x + feature.w / 2, feature.y, feature.z + feature.d / 2);
  mesh.receiveShadow = true;
  mesh.name = feature.id;
  return mesh;
}
