import Phaser from "phaser";

interface Grid {
  width: number;
  height: number;
}

interface ChestRigProperties {
  grids: Grid[];
  capacity: number;
}

interface ChestRigData {
  shortName: string;
  id: string;
  width: number;
  height: number;
  hasGrid: boolean;
  link: string;
  image8xLink: string;
  basePrice: number;
  properties: ChestRigProperties;
}

interface BarterItemData {
  shortName: string;
  id: string;
  width: number;
  height: number;
  link: string;
  image8xLink: string;
  basePrice: number;
}

export default class BootScene extends Phaser.Scene {
  private ChestRigData: ChestRigData | null = null;
  private selectedBarterItems: BarterItemData[] = [];

  constructor() {
    super("BootScene");
  }

  preload() {}

  create() {
    this.loadRandomItemData();
    this.loadRandomBarterItems();
  }

  async loadRandomBarterItems() {
    const query = `
    query {
      items(categoryNames: BarterItem) {
        shortName
        id
        width
        height
        link
        image8xLink
        basePrice
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
      const selectedItems = [];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        selectedItems.push(data.items[randomIndex]);
      }
      this.selectedBarterItems = data.items
        .slice(0, 5) // Select the first 5 items
        .map((item: any) => ({
          shortName: item.shortName,
          id: item.id,
          width: item.width,
          height: item.height,
          link: item.link,
          image8xLink: item.image8xLink,
          basePrice: item.basePrice,
        }));

      console.log("Selected Barter Items: ", this.selectedBarterItems);
    } catch (error) {
      console.error("Failed to load barter items:", error);
    }
  }

  async loadRandomItemData() {
    const query = `
    query {
      items(categoryNames: ChestRig) {
        shortName
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
      this.ChestRigData = data.items[randomIndex] as ChestRigData;
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
      this.add.text(20, 20, `Name: ${this.ChestRigData.shortName}`, {
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

      let xOffset = 20; // 시작 X 위치
      let yOffset = 150 + this.ChestRigData.height * 50 + 20; // 시작 Y 위치 (기존 그리드 아래에 위치)

      interface GridSize {
        width: number;
        height: number;
      }

      this.ChestRigData.properties.grids.forEach((grid: GridSize) => {
        for (let x = 0; x < grid.width; x++) {
          for (let y = 0; y < grid.height; y++) {
            gridGraphics.strokeRect(
              xOffset + x * 50, // X 위치
              yOffset + y * 50, // Y 위치
              50, // 칸 너비
              50 // 칸 높이
            );
          }
        }

        // X 오프셋 업데이트 (다음 그리드의 X 위치를 위해)
        xOffset += grid.width * 50 + 10;

        // 가로 방향으로 더 이상 그리드를 그릴 공간이 없으면 Y 오프셋 업데이트
        if (xOffset + grid.width * 50 > this.cameras.main.width) {
          xOffset = 20; // X 오프셋 리셋
          yOffset += grid.height * 50 + 10; // Y 오프셋 업데이트
        }
      });
    }
  }
}
