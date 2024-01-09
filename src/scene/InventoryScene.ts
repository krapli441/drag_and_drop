import Phaser from "phaser";

export default class InventoryScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Sprite; // 'item' 속성 추가
  rotateKey!: Phaser.Input.Keyboard.Key; // 'R' 키에 대한 참조

  constructor() {
    super({ key: "InventoryScene" });
  }

  preload() {
    this.load.image("item", "./img/855.webp");
  }

  create() {
    // 한 번만 그리드 생성
    this.createGrid();

    // 아이템 생성 및 설정
    this.item = this.add.sprite(100, 100, "item").setInteractive();
    this.item.setOrigin(0.5, 0.5);
    this.item.setDisplaySize(50, 50);

    // 드래그 가능하게 설정
    this.input.setDraggable(this.item);

    // 드래그 이벤트 리스너
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

    // 아이템 클릭하여 회전
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
