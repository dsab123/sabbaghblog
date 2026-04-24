import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../_posts');
const versionFile = path.join(__dirname, '../src/utils/_posts-version.ts');

fs.watch(postsDir, { recursive: false }, (_, filename) => {
  if (!filename?.endsWith('.md')) return;
  fs.writeFileSync(versionFile, `export const _postsVersion = ${Date.now()};\n`);
  console.log(`[watch-posts] ${filename} changed, reloading…`);
});

console.log('[watch-posts] watching _posts/*.md');
