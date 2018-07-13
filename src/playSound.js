// @flow
import { promises as fs } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';

async function getRandomSound() {
  const files = await fs.readdir(path.resolve('sounds'));

  const file = files[Math.floor(Math.random() * files.length)];

  return `${path.resolve('sounds')}/${file}`;
}

export default async function playSound(soundPath?: string) {
  const sound = soundPath || (await getRandomSound());

  // eslint-disable-next-line no-console
  console.log('Playing sound: ', sound);
  spawnSync('paplay', ['-s', 'pulse', sound], {
    stdio: 'inherit',
  });
}
