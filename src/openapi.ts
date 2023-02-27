import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';

export async function getDocument() {
  const file = await readFile(join(dirname(__dirname), 'doc', 'api.yaml'), {
    encoding: 'utf-8',
  });
  return parse(file);
}
