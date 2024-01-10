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
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);

    const gridSize = 50; // 한 칸의 크기
    const gridCount = 10; // 그리드 칸 수

    // 가로 및 세로 선 그리기
    for (let i = 0; i <= gridCount * gridSize; i += gridSize) {
      graphics.moveTo(i, 0);
      graphics.lineTo(i, gridCount * gridSize);
      graphics.moveTo(0, i);
      graphics.lineTo(gridCount * gridSize, i);
    }
    graphics.strokePath();
  }
}
