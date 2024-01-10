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

    // 컨테이너에 이미지와 텍스트를 모두 추가
    container.add([image, nameText, widthText, heightText]);
  }
}
