import { generateHouse } from './grammar';
import { paramsFromSearch, sunFromSearch, writeSearch, type GenerateParams } from './params';
import { AndoScene } from './scene';
import './style.css';
import { mountUi } from './ui';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('missing #app');

const canvas = document.createElement('canvas');
canvas.id = 'view';
app.append(canvas);

const initial = paramsFromSearch(window.location.search);
const initialSun = sunFromSearch(window.location.search);

let scene: AndoScene;
try {
  scene = new AndoScene(canvas);
} catch (error) {
  const message = error instanceof Error ? error.message : 'WebGL failed to start';
  app.replaceChildren(Object.assign(document.createElement('p'), { className: 'boot-error', textContent: message }));
  throw error;
}

let current = initial;

const ui = mountUi({
  initial,
  sunHour: initialSun,
  onParams: (params) => apply(params, ui.getSunHour(), true),
  onSun: (hour) => {
    scene.setSunHour(hour);
    writeUrl(current, hour);
  },
});

apply(initial, initialSun, true);

function apply(params: GenerateParams, hour: number, refit: boolean): void {
  current = params;
  const house = generateHouse(params);
  if (refit) scene.show(house, hour);
  ui.setSummary(house.summary);
  ui.setSeed(house.seed);
  writeUrl(params, hour);
}

function writeUrl(params: GenerateParams, hour: number): void {
  const next = writeSearch(params, hour);
  if (next !== window.location.search) {
    window.history.replaceState(null, '', next);
  }
}
