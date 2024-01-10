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
    // 필요한 에셋을 미리 로드합니다.
    this.load.image("itemImage", "./img/avs.webp");
  }

  create() {
    this.createGrid();

    // 아이템 정보
    const itemData = {
      name: "Crye Precision AVS plate carrier (Ranger Green)",
      id: "544a5caa4bdc2d1a388b4568",
      width: 3,
      height: 4,
      hasGrid: true,
      link: "https://tarkov.dev/item/crye-precision-avs-plate-carrier-ranger-green",
      image8xLink: "./img/avs.webp",
      basePrice: 58629,
      properties: {
        grids: [
          {
            width: 1,
            height: 2,
          },
          {
            width: 1,
            height: 2,
          },
          {
            width: 1,
            height: 2,
          },
          {
            width: 1,
            height: 2,
          },
          {
            width: 2,
            height: 2,
          },
          {
            width: 2,
            height: 2,
          },
          {
            width: 1,
            height: 1,
          },
          {
            width: 1,
            height: 1,
          },
          {
            width: 1,
            height: 1,
          },
          {
            width: 1,
            height: 1,
          },
          {
            width: 1,
            height: 2,
          },
          {
            width: 1,
            height: 1,
          },
        ],
      },
    };

    // 아이템 생성 및 배치
    const itemWidth = itemData.width * 50; // 가로 크기
    const itemHeight = itemData.height * 50; // 세로 크기
    const itemX = itemWidth / 2; // 아이템의 초기 x 좌표
    const itemY = itemHeight / 2; // 아이템의 초기 y 좌표

    this.item = this.add.sprite(itemX, itemY, "itemImage").setInteractive();
    this.item.setOrigin(0.5, 0.5);
    this.item.setDisplaySize(itemWidth, itemHeight);
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
