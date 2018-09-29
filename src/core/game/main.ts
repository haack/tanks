/// <reference path="../phaser.d.ts"/>
import * as Phaser from 'phaser';
import { BootScene } from './scenes/bootScene';
import { GameScene } from './scenes/gameScene';

let config = {
  type: Phaser.AUTO,
  parent: "game-container",
  scene: [ BootScene, GameScene ],
  physics: {
    default: "arcade",
    arcade: {
    }
  },
  backgroundColor: "#000000"
};

const game = new Phaser.Game(config);
