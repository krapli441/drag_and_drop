import Phaser from "phaser";

export default class InventoryScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Sprite;
  rotateKey!: Phaser.Input.Keyboard.Key;
  isItemClicked: boolean = false; // 아이템 클릭 상태 추적
  background!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: "InventoryScene" });
  }

  preload() {
    this.load.image("item", "./img/avs.webp");
  }

  create() {
    this.createGrid();
  }

  createGrid() {
    let graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);
    for (let i = 0; i < 500; i += 50) {
      graphics.moveTo(i, 0);
      graphics.lineTo(i, 500);
      graphics.moveTo(0, i);
      graphics.lineTo(500, i);
    }
    graphics.strokePath();
  }

  alignItemToGrid(item: Phaser.GameObjects.Sprite) {
    const gridSize = 50; // 그리드 칸의 크기
    const halfGridSize = gridSize / 2;
    const gridX =
      Math.round((item.x - halfGridSize) / gridSize) * gridSize + halfGridSize;
    const gridY =
      Math.round((item.y - halfGridSize) / gridSize) * gridSize + halfGridSize;

    item.x = gridX;
    item.y = gridY;
  }
}
