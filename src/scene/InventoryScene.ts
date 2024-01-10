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

    this.createGrid(itemData.width, itemData.height);

    // 아이템 생성 및 배치
    const itemWidth = itemData.width * 50; // 가로 크기
    const itemHeight = itemData.height * 50; // 세로 크기
    const itemX = itemWidth / 2; // 아이템의 초기 x 좌표
    const itemY = itemHeight / 2; // 아이템의 초기 y 좌표

    this.item = this.add.sprite(itemX, itemY, "itemImage").setInteractive();
    this.item.setOrigin(0.5, 0.5);
    this.item.setDisplaySize(itemWidth, itemHeight);

    if (itemData.hasGrid) {
      this.createInnerGrids(
        itemData.properties.grids,
        itemData.width,
        itemData.height
      );
    }
  }

  createGrid(itemWidth: number, itemHeight: number) {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);

    const gridSize = 50; // 한 칸의 크기

    // 가로선 및 세로선 그리기
    for (let i = 0; i <= itemWidth * gridSize; i += gridSize) {
      graphics.moveTo(i, 0);
      graphics.lineTo(i, itemHeight * gridSize);
    }
    for (let j = 0; j <= itemHeight * gridSize; j += gridSize) {
      graphics.moveTo(0, j);
      graphics.lineTo(itemWidth * gridSize, j);
    }

    // 마지막 가로선 추가
    if (itemHeight * gridSize !== 0) {
      graphics.moveTo(0, itemHeight * gridSize);
      graphics.lineTo(itemWidth * gridSize, itemHeight * gridSize);
    }

    graphics.strokePath();
  }

  createInnerGrids(grids: any[], itemWidth: number, itemHeight: number) {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x00ff00, 1); // 내부 그리드 색상

    const gridSize = 50; // 한 칸의 크기
    let offsetX = this.item.x; // 아이템의 중앙 x 좌표
    let offsetY = this.item.y; // 아이템의 중앙 y 좌표

    grids.forEach((grid) => {
      const gridWidth = grid.width * gridSize;
      const gridHeight = grid.height * gridSize;

      // 내부 그리드 그리기
      graphics.strokeRect(
        offsetX - gridWidth / 2,
        offsetY - gridHeight / 2,
        gridWidth,
        gridHeight
      );

      // 텍스트 추가
      const gridText = `${grid.width}x${grid.height}`;
      this.add
        .text(
          offsetX - gridWidth / 2 + gridWidth / 2,
          offsetY - gridHeight / 2 + gridHeight / 2,
          gridText,
          { font: "16px Arial", color: "#ffffff", align: "center" }
        )
        .setOrigin(0.5, 0.5); // 텍스트를 그리드 중앙에 위치시킵니다.

      // 다음 그리드 위치 업데이트
      offsetX += gridWidth;
      if (offsetX >= this.item.x + (itemWidth * gridSize) / 2) {
        offsetX = this.item.x;
        offsetY += gridHeight;
      }
    });

    graphics.strokePath();
  }
}
