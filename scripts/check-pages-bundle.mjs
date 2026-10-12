import { execFileSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const html = await readFile(join(root, 'index.html'), 'utf8');
if (html.includes('/src/main.ts')) {
  fail('index.html still loads /src/main.ts. Run npm run build and commit index.html and assets/.');
}
const refs = [];
for (const match of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
  const ref = match[1];
  if (ref.startsWith('data:') || ref.startsWith('#') || ref.startsWith('http:') || ref.startsWith('https:')) continue;
  if (!ref.startsWith('./assets/')) {
    fail(`index.html asset must be a relative ./assets/ URL: ${ref}`);
  }
  refs.push(ref);
}
if (refs.length === 0) fail('index.html does not reference the built bundle.');
for (const ref of refs) {
  try {
    await access(join(root, ref.slice(2)));
  } catch {
    fail(`index.html references missing file ${ref}`);
  }
}
try {
  await access(join(root, '.nojekyll'));
} catch {
  fail('Missing .nojekyll. GitHub Pages would run Jekyll and can drop built assets.');
}

const status = git(['status', '--porcelain', '--', 'index.html', 'assets']);
if (status.trim()) {
  console.error('Committed GitHub Pages bundle is stale.');
  console.error('Run `npm run build` and commit index.html and assets/.');
  console.error(status);
  console.error(git(['diff', '--stat', '--', 'index.html', 'assets']));
  const htmlDiff = git(['diff', '--', 'index.html']);
  if (htmlDiff.trim()) console.error(htmlDiff);
  process.exit(1);
}

console.log('Committed Pages bundle matches the build.');

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' });
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
