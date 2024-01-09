import Phaser from "phaser";

export default class InventoryScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Sprite; // 'item' 속성 추가

  constructor() {
    super({ key: "InventoryScene" });
  }

  preload() {
    this.load.image("item", "path/to/item/image.png");
  }

  create() {
    this.createGrid();

    this.item = this.add.sprite(100, 100, "item").setInteractive();

    this.input.setDraggable(this.item);

    this.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    this.item.on("pointerdown", () => {
      this.item.setAngle(this.item.angle + 90);
    });
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
}
