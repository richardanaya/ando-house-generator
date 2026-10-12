import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const builtHtmlPath = join(dist, 'index.dev.html');

const html = await readFile(builtHtmlPath, 'utf8');
assertRelativeHtml(html);

const assetRefs = assetReferences(html);
for (const ref of assetRefs) {
  await assertFile(join(dist, ref.slice(2)), ref);
}

await writeFile(join(dist, 'index.html'), html);

const assetsDest = join(root, 'assets');
await rm(assetsDest, { recursive: true, force: true });
await mkdir(assetsDest, { recursive: true });
await cp(join(dist, 'assets'), assetsDest, { recursive: true });
await writeFile(join(root, 'index.html'), html);

for (const ref of assetRefs) {
  await assertFile(join(root, ref.slice(2)), ref);
}
await assertBundledAssets(assetsDest);

console.log(`Published GitHub Pages bundle (${assetRefs.length} assets).`);

function assetReferences(source) {
  const refs = [];
  for (const match of source.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
    const ref = match[1];
    if (ref.startsWith('data:') || ref.startsWith('#') || ref.startsWith('http:') || ref.startsWith('https:')) continue;
    refs.push(ref);
  }
  if (refs.length === 0) {
    fail('Built HTML has no script or stylesheet references.');
  }
  return refs;
}

function assertRelativeHtml(source) {
  if (source.includes('/src/main.ts')) {
    fail('Built HTML still references /src/main.ts.');
  }
  for (const match of source.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
    const ref = match[1];
    if (ref.startsWith('data:') || ref.startsWith('#') || ref.startsWith('http:') || ref.startsWith('https:')) continue;
    if (!ref.startsWith('./')) {
      fail(`Asset URL must be relative to the page (./...): ${ref}`);
    }
    if (!ref.startsWith('./assets/')) {
      fail(`Asset URL must live under ./assets/: ${ref}`);
    }
  }
}

async function assertBundledAssets(dir) {
  const files = await walk(dir);
  const textFiles = files.filter((file) => /\.(?:js|css|svg|json|wasm|hdr|png|jpe?g|webp|gif)$/i.test(file));
  if (textFiles.length === 0) fail('Published assets/ is empty.');
  for (const file of textFiles) {
    if (/\.(?:png|jpe?g|gif|webp|wasm)$/i.test(file)) continue;
    const source = await readFile(file, 'utf8');
    const label = relative(root, file);
    if (/url\(\s*['"]?\//.test(source)) {
      fail(`${label} contains a root-absolute CSS url().`);
    }
    if (/(?:src|href)=["']\//.test(source)) {
      fail(`${label} contains a root-absolute src or href.`);
    }
    if (/(?:from|import)\s*\(\s*["']\//.test(source) || /(?:from|import)\s+["']\//.test(source)) {
      fail(`${label} imports a root-absolute module.`);
    }
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

async function assertFile(path, ref) {
  try {
    await access(path);
  } catch {
    fail(`Missing asset ${ref} (${path}).`);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
