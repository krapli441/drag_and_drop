// src/scenes/BootScene.ts
import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  private itemData = {
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
          width: 1,
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
          height: 1,
        },
        {
          width: 2,
          height: 2,
        },
        {
          width: 2,
          height: 2,
        },
      ],
      capacity: 23,
    },
  };

  constructor() {
    super("BootScene");
  }

  preload() {
    // 아이템 이미지 로드
    this.load.image("itemImage", this.itemData.image8xLink);
  }

  create() {
    // 이미지와 텍스트를 포함할 컨테이너 생성
    const container = this.add.container(20, 20);

    // 이미지 추가
    const image = this.add
      .image(0, 0, "itemImage")
      .setDisplaySize(150, 150)
      .setOrigin(0, 0);

    // 텍스트 추가
    const nameText = this.add
      .text(0, 160, this.itemData.name, {
        font: "18px Arial",
        color: "#ffffff",
      })
      .setOrigin(0, 0);
    const widthText = this.add
      .text(
        0,
        nameText.y + nameText.height + 10,
        `Width: ${this.itemData.width}`,
        { font: "16px Arial", color: "#ffffff" }
      )
      .setOrigin(0, 0);
    const heightText = this.add
      .text(
        0,
        widthText.y + widthText.height + 5,
        `Height: ${this.itemData.height}`,
        { font: "16px Arial", color: "#ffffff" }
      )
      .setOrigin(0, 0);
    const capaticyText = this.add
      .text(
        0,
        heightText.y + heightText.height + 5,
        `Capacity: ${this.itemData.properties.capacity}`,
        { font: "16px Arial", color: "#ffffff" }
      )
      .setOrigin(0, 0);

    // 컨테이너에 이미지와 텍스트를 모두 추가
    container.add([image, nameText, widthText, heightText, capaticyText]);

    // 그리드를 그리기 위한 Graphics 객체 생성
    const gridGraphics = this.add.graphics();
    gridGraphics.fillStyle(0x141414, 1); // 회색으로 채우기, 투명도는 1

    // itemData의 width와 height를 기준으로 그리드 생성
    const gridWidth = this.itemData.width * 50; // 한 칸당 50px
    const gridHeight = this.itemData.height * 50;
    const gridX = container.x; // 컨테이너의 X 위치를 그리드 시작점으로 사용
    const gridY = container.y + container.height + 280; // 컨테이너 아래쪽에 여백을 주고 시작

    // 그리드 그리기
    for (let i = 0; i < this.itemData.width; i++) {
      for (let j = 0; j < this.itemData.height; j++) {
        // 각 칸의 배경을 그립니다
        gridGraphics.fillRect(
          gridX + i * 50, // X 위치
          gridY + j * 50, // Y 위치
          50, // 너비
          50 // 높이
        );

        // 각 칸의 테두리를 그립니다
        gridGraphics.lineStyle(1, 0x555557, 1); // 흰색 테두리, 두께 2, 투명도 1
        gridGraphics.strokeRect(
          gridX + i * 50, // X 위치
          gridY + j * 50, // Y 위치
          50, // 너비
          50 // 높이
        );
      }
    }

    // 오른쪽 영역에 그리드 그룹을 관리할 컨테이너 생성
    const rightGridContainer = this.add.container(
      this.cameras.main.width / 2 + 20,
      20
    );

    type GridType = {
      [key: string]: {
        count: number;
        width: number;
        height: number;
      };
    };

    // 각 그리드 타입별로 순회하면서 그리드 생성
    const gridTypes: GridType = {
      "1x2": { count: 5, width: 1, height: 2 },
      "1x1": { count: 5, width: 1, height: 1 },
      "2x2": { count: 2, width: 2, height: 2 },
    };

    let xOffset = 0;
    let yOffset = 0;

    Object.keys(gridTypes).forEach((type) => {
      const gridType = gridTypes[type];
      for (let i = 0; i < gridType.count; i++) {
        // 현재 그리드의 너비와 높이를 픽셀 단위로 계산
        const currentGridWidth = gridType.width * 50;
        const currentGridHeight = gridType.height * 50;

        // 화면 끝에 도달하면 다음 줄로
        if (xOffset + currentGridWidth > this.cameras.main.width / 2) {
          xOffset = 0;
          yOffset += currentGridHeight + 10;
        }

        const gridGraphics = this.add.graphics();
        rightGridContainer.add(gridGraphics);

        // 각 그리드 배경 그리기
        gridGraphics.fillStyle(0x141414, 1); // 회색
        gridGraphics.fillRect(
          xOffset,
          yOffset,
          currentGridWidth,
          currentGridHeight
        );

        // 각 그리드 테두리 그리기
        gridGraphics.lineStyle(1, 0x555557, 1); // 흰색 테두리
        gridGraphics.strokeRect(
          xOffset,
          yOffset,
          currentGridWidth,
          currentGridHeight
        );

        // 다음 그리드 위치를 위해 X 오프셋 업데이트
        xOffset += currentGridWidth + 10;
      }
      // 다음 타입의 그리드를 위해 X 오프셋 리셋하고 Y 오프셋 업데이트
      xOffset = 0;
      yOffset += gridType.height * 50 + 10;
    });

    // 컨테이너의 너비를 최대 그리드 너비로 조정
    rightGridContainer.width = Math.max(
      ...Object.values(gridTypes).map(
        (type) => type.width * 50 * type.count + 10 * (type.count - 1)
      )
    );
    rightGridContainer.height = yOffset;
    // 컨테이너 위치 조정
    rightGridContainer.x -= rightGridContainer.width / 2;
  }
}
