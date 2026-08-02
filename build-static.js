/**
 * FLA Static Build Script
 * Copies index.html + public assets to dist/
 */
import { cpSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dist = resolve(__dirname, 'dist');

// Clean dist
if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });

// Copy index.html
cpSync(resolve(__dirname, 'index.html'), resolve(dist, 'index.html'));

// Copy public assets
if (existsSync(resolve(__dirname, 'public'))) {
  cpSync(resolve(__dirname, 'public'), dist, { recursive: true });
}

console.log('[FLA] Static build complete → dist/');
