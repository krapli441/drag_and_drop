// src/scenes/BootScene.ts
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // 여기에 프리로드할 에셋들을 로드
  }

  create() {
    // 게임을 시작하거나 다른 Scene으로 전환
    this.scene.start('MainScene');
  }
}
