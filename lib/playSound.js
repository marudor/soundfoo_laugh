"use strict";

exports.__esModule = true;
exports.default = playSound;

var _fs = require("fs");

var _child_process = require("child_process");

async function getRandomSound() {
  const files = await _fs.promises.readdir('./sounds');
  const file = files[Math.floor(Math.random() * files.length)];
  return `./sounds/${file}`;
}

async function playSound(soundPath) {
  const sound = soundPath || (await getRandomSound());
  console.log('Playing sound: ', sound);
  (0, _child_process.spawnSync)('paplay', ['-s', 'pulse', sound], {
    stdio: 'inherit'
  });
}