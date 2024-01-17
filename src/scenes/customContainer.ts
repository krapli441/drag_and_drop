import Phaser from "phaser";

export class CustomContainer extends Phaser.GameObjects.Container {
  itemGraphic: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    children?: Phaser.GameObjects.GameObject[]
  ) {
    super(scene, x, y, children);
    // itemGraphic 초기화
    this.itemGraphic = scene.add.graphics();
  }
}
