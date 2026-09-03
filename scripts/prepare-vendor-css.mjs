import { mkdir, readFile, writeFile } from 'node:fs/promises';

const source = new URL('../node_modules/bootstrap/dist/css/bootstrap.min.css', import.meta.url);
const target = new URL('../resources/css/generated/bootstrap.min.css', import.meta.url);
const css = (await readFile(source, 'utf8')).replace(/@charset\s+["'][^"']+["'];?/gi, '');

await mkdir(new URL('../resources/css/generated/', import.meta.url), { recursive: true });
await writeFile(target, css);
