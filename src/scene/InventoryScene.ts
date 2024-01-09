import Phaser from "phaser";

export default class InventoryScene extends Phaser.Scene {
  item!: Phaser.GameObjects.Sprite;
  rotateKey!: Phaser.Input.Keyboard.Key;
  isItemClicked: boolean = false; // 아이템 클릭 상태 추적

  constructor() {
    super({ key: "InventoryScene" });
  }

  preload() {
    this.load.image("item", "./img/855.webp");
  }

  create() {
    this.createGrid();
    this.item = this.add.sprite(100, 100, "item").setInteractive();
    this.item.setOrigin(0.5, 0.5);
    this.item.setDisplaySize(50, 50);

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
    // 아이템의 드래그 종료 위치를 그리드 크기로 나누어 가장 가까운 칸 위치 계산
    const gridX = Math.round(item.x / gridSize) * gridSize;
    const gridY = Math.round(item.y / gridSize) * gridSize;

    // 아이템을 그리드 칸의 중앙으로 이동
    item.x = gridX;
    item.y = gridY;
  }
}
