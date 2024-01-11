import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  private ChestRigData: any;

  constructor() {
    super("BootScene");
  }

  preload() {}

  create() {
    this.loadRandomItemData();
  }

  async loadRandomItemData() {
    const query = `
    query {
      items(categoryNames: ChestRig) {
        name
        id
        width
        height
        hasGrid
        link
        image8xLink
        basePrice
        properties {
          ...on ItemPropertiesChestRig {
            grids {
              width
              height
            }
            capacity
          }
        }
      }
    }
    `;

    try {
      const response = await fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const { data } = await response.json();
      const randomIndex = Math.floor(Math.random() * data.items.length);
      this.ChestRigData = data.items[randomIndex];
      console.log(this.ChestRigData);

      // 출력할 텍스트 생성
      this.createItemData();
    } catch (error) {
      console.error("Failed to load item data:", error);
    }
  }

  createItemData() {
    // ChestRigData가 존재하는 경우에만 실행
    if (this.ChestRigData) {
      this.add.text(20, 20, `Name: ${this.ChestRigData.name}`, {
        font: "18px Arial",
        color: "#ffffff",
      });
      this.add.text(20, 50, `Width: ${this.ChestRigData.width}`, {
        font: "18px Arial",
        color: "#ffffff",
      });
      this.add.text(20, 80, `Height: ${this.ChestRigData.height}`, {
        font: "18px Arial",
        color: "#ffffff",
      });
      this.add.text(
        20,
        110,
        `Capacity: ${this.ChestRigData.properties.capacity}`,
        { font: "18px Arial", color: "#ffffff" }
      );
    }
    // 그리드 인벤토리 생성 (현재 아이템의 크기)
    this.createGridInventory();

    // 내부 그리드 인벤토리 생성
    this.createInnerGridInventory();
  }

  createGridInventory() {
    if (this.ChestRigData) {
      const gridGraphics = this.add.graphics();
      gridGraphics.lineStyle(1, 0xffffff); // 흰색 선으로 그리드 테두리 설정

      // 그리드 인벤토리 그리기
      for (let x = 0; x < this.ChestRigData.width; x++) {
        for (let y = 0; y < this.ChestRigData.height; y++) {
          gridGraphics.strokeRect(
            20 + x * 50, // X 위치
            150 + y * 50, // Y 위치 (텍스트 아래에 위치)
            50, // 칸 너비
            50 // 칸 높이
          );
        }
      }
    }
  }

  createInnerGridInventory() {
    if (
      this.ChestRigData &&
      this.ChestRigData.hasGrid &&
      this.ChestRigData.properties.grids
    ) {
      const gridGraphics = this.add.graphics();
      gridGraphics.lineStyle(1, 0x00ff00); // 다른 색으로 그리드 테두리 설정

      let yOffset = 150 + this.ChestRigData.height * 50 + 20; // 기존 그리드 아래에 위치

      this.ChestRigData.properties.grids.forEach((grid) => {
        for (let x = 0; x < grid.width; x++) {
          for (let y = 0; y < grid.height; y++) {
            gridGraphics.strokeRect(
              20 + x * 50, // X 위치
              yOffset + y * 50, // Y 위치
              50, // 칸 너비
              50 // 칸 높이
            );
          }
        }
        yOffset += grid.height * 50 + 10; // 다음 그리드 레이아웃을 위한 Y 오프셋
      });
    }
  }
}
