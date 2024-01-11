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

      // 출력할 텍스트 생성
      this.createText();
    } catch (error) {
      console.error("Failed to load item data:", error);
    }
  }

  createText() {
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
  }
}
