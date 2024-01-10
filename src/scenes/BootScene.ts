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
    image8xLink: "https://assets.tarkov.dev/544a5caa4bdc2d1a388b4568-8x.webp",
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
    // 배경을 반으로 나누기
    const { width, height } = this.sys.game.canvas;
    const divider = width / 2;

    // 왼쪽 영역에 정보 표시
    this.add.text(20, 20, this.itemData.name, {
      font: "18px Arial",
      color: "#ffffff",
    });
    this.add.image(20, 60, "itemImage").setDisplaySize(146, 146); // 이미지 크기 조정 필요시 setDisplaySize 사용
    this.add.text(20, 220, `Width: ${this.itemData.width}`, {
      font: "16px Arial",
      color: "#ffffff",
    });
    this.add.text(20, 240, `Height: ${this.itemData.height}`, {
      font: "16px Arial",
      color: "#ffffff",
    });

    // 오른쪽 영역에 내부 그리드 표시 (여기에 더 많은 로직이 필요할 수 있습니다)

    // 다른 Scene으로 전환하는 코드는 제거됨
  }
}
