import Phaser from "phaser";

export default class InventoryScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Sprite;
  rotateKey!: Phaser.Input.Keyboard.Key;
  isItemClicked: boolean = false; // 아이템 클릭 상태 추적
  background!: Phaser.GameObjects.Graphics;// 배경 객체 추가

  constructor() {
    super({ key: "InventoryScene" });
  }

  preload() {
    this.load.image("item", "./img/avs.webp");
  }

  create() {
    this.createGrid();

    const itemWidth = 3 * 50; // 가로 3칸
    const itemHeight = 4 * 50; // 세로 4칸
    const itemX = 25; // 아이템의 초기 x 좌표
    const itemY = 25; // 아이템의 초기 y 좌표

    // 아이템 배경 그리기
    const background = this.add.graphics();
    background.fillStyle(0x00ff00, 0.4); // 투명한 초록색
    background.fillRect(
      itemX - itemWidth / 2,
      itemY - itemHeight / 2,
      itemWidth,
      itemHeight
    );

    // 아이템 추가
    this.item = this.add.sprite(itemX, itemY, "item").setInteractive();
    this.item.setOrigin(0.5, 0.5);
    this.item.setDisplaySize(itemWidth, itemHeight);

    this.input.setDraggable(this.item);
    this.input.keyboard = this.input.keyboard;
    this.item.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      this.alignItemToGrid(this.item);
    });

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

    // 'R' 키에 대한 참조 생성
    if (this.input && this.input.keyboard) {
      this.rotateKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.R
      );
    }

    // 아이템 클릭 이벤트 리스너
    this.item.on("pointerdown", () => {
      this.isItemClicked = true; // 아이템 클릭 상태 설정
    });

    // 아이템 클릭 해제 이벤트 리스너
    this.item.on("pointerup", () => {
      this.isItemClicked = false; // 아이템 클릭 상태 해제
    });

    // 키 입력 이벤트 리스너
    if (this.input && this.input.keyboard) {
      this.input.keyboard.on("keydown-R", () => {
        // 아이템이 클릭된 상태에서 'R' 키가 눌렸을 때만 회전
        if (this.isItemClicked) {
          this.item.setAngle(this.item.angle + 90);
        }
      });
    }
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
