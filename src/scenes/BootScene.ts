import Phaser from "phaser";

class Inventory {
  private grids: Grid[];
  private capacity: number;

  constructor(properties: ChestRigProperties) {
    this.grids = properties.grids.map(
      (grid) => new Grid(grid.width, grid.height)
    );
    this.capacity = properties.capacity;
  }

  // 여기에 인벤토리 관리 로직 추가
}

interface Grid {
  width: number;
  height: number;
  item: Item | null;
}

class Grid {
  width: number;
  height: number;
  item: Item | null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.item = null;
  }

  // 여기에 그리드 관리 로직 추가
}

class Item {
  shortName: string;
  id: string;
  width: number;
  height: number;

  constructor(data: BarterItemData) {
    this.shortName = data.shortName;
    this.id = data.id;
    this.width = data.width;
    this.height = data.height;
  }

  // 필요한 아이템 관련 메소드 추가
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
  private inventory: Inventory | null = null;
  private ChestRigData: ChestRigData | null = null;
  private selectedBarterItems: BarterItemData[] = [];

  constructor() {
    super("BootScene");
  }

  preload() {}

  async create() {
    await this.loadRandomChestRigData();
    await this.loadRandomBarterItems();
    this.createInventory();
    this.createItemData();
    this.createBarterItemGrids();
  }

  createInventory() {
    if (this.ChestRigData && this.ChestRigData.hasGrid) {
      this.inventory = new Inventory(this.ChestRigData.properties);
      console.log(this.inventory);
    }
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
      this.selectedBarterItems = selectedItems
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

  async loadRandomChestRigData() {
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

  createBarterItemGrids() {
    const gridGraphics = this.add.graphics();
    gridGraphics.lineStyle(1, 0x0000ff); // 파란색 선으로 그리드 테두리 설정

    let xOffset = this.cameras.main.width / 2 + 20; // 화면 오른쪽에 위치하도록 설정
    let yOffset = 20; // 시작 Y 위치

    this.selectedBarterItems.forEach((item) => {
      // 아이템의 그리드 그리기
      for (let x = 0; x < item.width; x++) {
        for (let y = 0; y < item.height; y++) {
          gridGraphics.strokeRect(
            xOffset + x * 50, // X 위치
            yOffset + y * 50, // Y 위치
            50, // 칸 너비
            50 // 칸 높이
          );
        }
      }

      // 아이템 이름 텍스트 위치 계산
      const textX = xOffset + (item.width * 50) / 2;
      const textY = yOffset + (item.height * 50) / 2;

      // 아이템 이름 텍스트 추가
      this.add
        .text(textX, textY, item.shortName, {
          font: "16px Arial",
          color: "#ffffff",
          align: "center",
        })
        .setOrigin(0.5, 0.5); // 텍스트를 중앙 정렬

      // 다음 아이템을 위한 X, Y 오프셋 업데이트
      xOffset += item.width * 50 + 10;
      if (xOffset + item.width * 50 > this.cameras.main.width) {
        xOffset = this.cameras.main.width / 2 + 20; // X 오프셋 리셋
        yOffset += item.height * 50 + 10; // Y 오프셋 업데이트
      }
    });
  }
}
