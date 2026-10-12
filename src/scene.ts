import {
  ACESFilmicToneMapping,
  AmbientLight,
  BackSide,
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Mesh,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PMREMGenerator } from 'three';
import { buildModel, type BuiltModel } from './geometry';
import {
  createBasinMaterial,
  createConcreteMaps,
  createConcreteMaterial,
  createGlassMaterial,
  createGrassMaterial,
  createGravelMaterial,
  createSteelMaterial,
  tuneAnisotropy,
} from './materials/concrete';
import { sunAt } from './sun';
import type { House } from './types';
import { buildWater, type BuiltWater } from './water';

export class AndoScene {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly camera: PerspectiveCamera;
  readonly controls: OrbitControls;

  private readonly sun = new DirectionalLight(0xfff2dd, 4);
  private readonly hemi = new HemisphereLight(0xc5d4e0, 0x8a8178, 0.42);
  private readonly ambient = new AmbientLight(0xfff6ee, 0.08);
  private built: BuiltModel | null = null;
  private water: BuiltWater | null = null;
  private readonly focus = new Vector3();
  private radius = 24;
  private hour = 9.5;
  private seed = '';
  private frames = 0;
  private running = true;

  private readonly concrete;
  private readonly glass;
  private readonly steel;
  private readonly gravel;
  private readonly groundMat;
  private readonly court;
  private readonly grass;
  private readonly basin;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xe6d5c6, 1);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.camera = new PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.15, 800);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 90;
    this.controls.target.set(0, 2, 0);

    const maps = createConcreteMaps();
    tuneAnisotropy(maps, this.renderer);
    this.concrete = createConcreteMaterial(maps);
    this.glass = createGlassMaterial();
    this.steel = createSteelMaterial();
    this.gravel = createGravelMaterial({ seed: 3, repeat: 6, color: '#b7b2aa' });
    this.groundMat = createGravelMaterial({ seed: 2, repeat: 22, color: '#8a857e' });
    this.court = this.concrete.clone();
    this.court.color = new Color('#a9a49c');
    this.grass = createGrassMaterial();
    this.basin = createBasinMaterial();

    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.scene.fog = new Fog(0xe6d5c6, 70, 230);
    this.scene.add(this.makeSky());
    this.hemi.position.set(0, 20, 0);
    this.scene.add(this.hemi, this.ambient);

    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.00018;
    this.sun.shadow.normalBias = 0.035;
    this.sun.shadow.radius = 2.5;
    this.scene.add(this.sun, this.sun.target);

    window.addEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(() => this.tick());
  }

  show(house: House, hour: number): void {
    this.hour = hour;
    this.seed = house.seed;
    this.frames = 0;
    window.__ANDO__ = { ready: false, seed: house.seed };
    this.built?.dispose();
    this.water?.dispose();
    if (this.built) this.scene.remove(this.built.content);
    for (const obj of this.water?.objects ?? []) this.scene.remove(obj);

    this.built = buildModel(house, {
      concrete: this.concrete,
      glass: this.glass,
      steel: this.steel,
      gravel: this.gravel,
      court: this.court,
      grass: this.grass,
      ground: this.groundMat,
    });
    this.scene.add(this.built.content);
    this.water = buildWater(house, this.basin, this.renderer);
    for (const obj of this.water.objects) this.scene.add(obj);

    this.frame(house);
    this.updateSun();
  }

  setSunHour(hour: number): void {
    this.hour = hour;
    this.updateSun();
  }

  private frame(house: House): void {
    let minX = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = 1;
    let maxZ = -Infinity;
    for (const solid of house.solids) {
      minX = Math.min(minX, solid.x);
      minZ = Math.min(minZ, solid.z);
      maxX = Math.max(maxX, solid.x + solid.w);
      maxY = Math.max(maxY, solid.y + solid.h);
      maxZ = Math.max(maxZ, solid.z + solid.d);
    }
    for (const water of house.waters) {
      minX = Math.min(minX, water.x);
      minZ = Math.min(minZ, water.z);
      maxX = Math.max(maxX, water.x + water.w);
      maxZ = Math.max(maxZ, water.z + water.d);
    }
    const center = new Vector3((minX + maxX) / 2, maxY * 0.34, (minZ + maxZ) / 2);
    const span = Math.max(maxX - minX, maxZ - minZ, maxY * 1.4);
    this.focus.copy(center);
    this.radius = span * 0.78;
    const side = house.entrySide === 'east' ? 1 : -1;
    const dist = span * 1.05;
    this.camera.position.set(center.x + dist * 0.78 * side, Math.max(5.5, maxY * 0.48 + span * 0.16), center.z + dist * 0.72);
    this.controls.target.set(center.x - side * span * 0.02, maxY * 0.3, center.z - span * 0.05);
    this.controls.update();
  }

  private updateSun(): void {
    const sample = sunAt(this.hour);
    const dir = new Vector3(sample.x, sample.y, sample.z).normalize();
    const distance = this.radius * 2.6;
    this.sun.position.copy(this.focus).add(dir.multiplyScalar(distance));
    this.sun.target.position.copy(this.focus);
    this.sun.intensity = sample.intensity;
    this.sun.color.setHex(sample.color);
    this.sun.shadow.camera.left = -this.radius;
    this.sun.shadow.camera.right = this.radius;
    this.sun.shadow.camera.top = this.radius;
    this.sun.shadow.camera.bottom = -this.radius;
    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = distance + this.radius * 2.2;
    this.sun.shadow.camera.updateProjectionMatrix();
    this.updateShafts(sample.x, sample.y, sample.z);
  }

  private updateShafts(x: number, y: number, z: number): void {
    const horiz = Math.hypot(x, z) || 1;
    const align = Math.max(0, z / horiz);
    const lift = Math.min(1, Math.max(0, y) * 1.7);
    const amount = align * align * lift;
    for (const material of this.built?.shafts ?? []) {
      const gain = typeof material.userData.gain === 'number' ? material.userData.gain : 0.08;
      material.opacity = amount * gain;
    }
  }

  private tick(): void {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    if (this.seed && this.frames === 3) {
      window.__ANDO__ = { ready: true, seed: this.seed };
    }
    this.frames += 1;
  }

  private onResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private makeSky(): Mesh {
    const material = new ShaderMaterial({
      side: BackSide,
      depthWrite: false,
      uniforms: {},
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        void main() {
          float h = normalize(vDir).y;
          vec3 zenith = vec3(0.545, 0.655, 0.760);
          vec3 horizon = vec3(0.902, 0.835, 0.776);
          vec3 below = vec3(0.735, 0.700, 0.655);
          vec3 col = mix(horizon, zenith, smoothstep(0.0, 0.62, h));
          col = mix(below, col, smoothstep(-0.28, 0.06, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const sky = new Mesh(new SphereGeometry(420, 32, 20), material);
    sky.frustumCulled = false;
    sky.renderOrder = -1;
    return sky;
  }
}
