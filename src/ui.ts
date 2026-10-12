import { LIMITS, normalizeParams, type GenerateParams } from './params';

export interface UiHandle {
  getSunHour(): number;
  setSummary(text: string): void;
  setSeed(seed: string): void;
}

const WORDS = ['light', 'court', 'wall', 'axis', 'still', 'chapel', 'shadow', 'slit', 'water', 'nave'];

export function mountUi(options: {
  initial: GenerateParams;
  sunHour: number;
  onParams: (params: GenerateParams) => void;
  onSun: (hour: number) => void;
}): UiHandle {
  const panel = document.createElement('aside');
  panel.id = 'panel';
  panel.innerHTML = `
    <header>
      <p class="eyebrow">Procedural study</p>
      <h1>Light, concrete, water</h1>
    </header>
    <label class="seed">
      <span>Seed</span>
      <input id="seed" type="text" spellcheck="false" autocomplete="off" />
    </label>
    <div class="actions">
      <button id="regen" type="button">Regenerate</button>
    </div>
    ${slider('scale', 'Scale', LIMITS.scale)}
    ${slider('volumes', 'Volumes', LIMITS.volumes)}
    ${slider('water', 'Water', LIMITS.water)}
    ${slider('sun', 'Sun', LIMITS.sun)}
    <p id="summary"></p>
  `;
  document.body.append(panel);

  const seedInput = panel.querySelector<HTMLInputElement>('#seed')!;
  const summary = panel.querySelector<HTMLParagraphElement>('#summary')!;
  const scale = panel.querySelector<HTMLInputElement>('#scale')!;
  const volumes = panel.querySelector<HTMLInputElement>('#volumes')!;
  const water = panel.querySelector<HTMLInputElement>('#water')!;
  const sun = panel.querySelector<HTMLInputElement>('#sun')!;
  const scaleOut = panel.querySelector<HTMLElement>('#scale-out')!;
  const volumesOut = panel.querySelector<HTMLElement>('#volumes-out')!;
  const waterOut = panel.querySelector<HTMLElement>('#water-out')!;
  const sunOut = panel.querySelector<HTMLElement>('#sun-out')!;

  seedInput.value = options.initial.seed;
  scale.value = String(options.initial.scale);
  volumes.value = String(options.initial.volumes);
  water.value = String(options.initial.water);
  sun.value = String(options.sunHour);
  paint();

  const readParams = (): GenerateParams =>
    normalizeParams({
      seed: seedInput.value,
      scale: Number(scale.value),
      volumes: Number(volumes.value),
      water: Number(water.value),
    });

  const emitParams = (): void => {
    paint();
    options.onParams(readParams());
  };

  seedInput.addEventListener('change', emitParams);
  seedInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      emitParams();
    }
  });
  for (const input of [scale, volumes, water]) {
    input.addEventListener('input', emitParams);
  }
  sun.addEventListener('input', () => {
    paint();
    options.onSun(Number(sun.value));
  });
  panel.querySelector<HTMLButtonElement>('#regen')!.addEventListener('click', () => {
    seedInput.value = freshSeed();
    emitParams();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'r' && document.activeElement !== seedInput) {
      seedInput.value = freshSeed();
      emitParams();
    }
  });

  function paint(): void {
    scaleOut.textContent = Number(scale.value).toFixed(2);
    volumesOut.textContent = String(Math.round(Number(volumes.value)));
    waterOut.textContent = String(Math.round(Number(water.value)));
    sunOut.textContent = formatHour(Number(sun.value));
  }

  return {
    getSunHour: () => Number(sun.value),
    setSummary(text: string) {
      summary.textContent = text;
    },
    setSeed(seed: string) {
      seedInput.value = seed;
    },
  };
}

function slider(
  id: string,
  label: string,
  spec: { min: number; max: number; step: number },
): string {
  return `
    <label class="slider">
      <span class="slider-label"><span>${label}</span><span id="${id}-out"></span></span>
      <input id="${id}" type="range" min="${spec.min}" max="${spec.max}" step="${spec.step}" />
    </label>
  `;
}

function formatHour(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const mm = m === 60 ? 0 : m;
  const hh = m === 60 ? h + 1 : h;
  return `${hh}:${mm.toString().padStart(2, '0')}`;
}

function freshSeed(): string {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]!;
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${word}-${n}`;
}
