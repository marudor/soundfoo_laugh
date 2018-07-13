// @flow
import { promises as fs } from 'fs';
import { spawnSync } from 'child_process';

async function getRandomSound() {
  const files = await fs.readdir('./sounds');

  const file = files[Math.floor(Math.random() * files.length)];

  return `./sounds/${file}`;
}

export default async function playSound(soundPath?: string) {
  const sound = soundPath || (await getRandomSound());

  // eslint-disable-next-line no-console
  console.log('Playing sound: ', sound);
  spawnSync('paplay', ['-s', 'pulse', sound], {
    stdio: 'inherit',
  });
}
