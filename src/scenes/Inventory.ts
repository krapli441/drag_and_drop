import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";
import { BarterItem } from "../types/Barter_Item";
import { ChestRigItem } from "../types/Chest_Rig";

class ChestRigInventory {
  item: ChestRigItem;
  grids: any[]; // 이곳에 추가 기능을 구현할 수 있습니다.

  constructor(item: ChestRigItem) {
    this.item = item;
    this.grids = item.properties.grids;
    // 여기에 초기화 로직을 추가할 수 있습니다.
  }

  // 이곳에 추가 메소드를 구현할 수 있습니다.
}

export default class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
  }

  preload() {}

  async create() {
    try {
      const chestRigData = await loadRandomData(CHEST_RIG_QUERY);
      const barterItemsData = await loadRandomData(BARTER_ITEM_QUERY);
      const randomChestRig = this.selectRandomChestRig(chestRigData.data.items);
      const randomBarterItems = this.selectRandomBarterItems(
        barterItemsData.data.items,
        10
      );

      console.log("무작위 체스트 리그 데이터 : ", randomChestRig);
      console.log("무작위 교환 아이템 데이터 : ", randomBarterItems);

      if (randomChestRig.hasGrid && randomChestRig.properties.grids) {
        this.drawGrid(randomChestRig.properties.grids);

        // ChestRigInventory 인스턴스 생성
        const chestRigInventory = new ChestRigInventory(randomChestRig);
        console.log("ChestRigInventory:", chestRigInventory);
      }
    } catch (error) {
      console.error("데이터 로딩 중 오류가 발생했습니다:", error);
    }
  }

  selectRandomChestRig(items: ChestRigItem[]) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  selectRandomBarterItems(items: BarterItem[], count: number) {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  drawGrid(grids: any[]) {
    const gridGraphics = this.add.graphics();
    gridGraphics.lineStyle(2, 0xffffff, 1); // 테두리 스타일 설정

    const gridSize = 50; // 각 그리드 칸의 크기
    const gridSpacing = 10; // 그리드 사이의 간격
    let currentX = 0; // 현재 X 좌표
    let currentY = 0; // 현재 Y 좌표
    let maxYInRow = 0; // 현재 행에서 가장 높은 그리드의 높이

    grids.forEach((grid) => {
      for (let i = 0; i < grid.width; i++) {
        for (let j = 0; j < grid.height; j++) {
          const x = currentX + i * gridSize;
          const y = currentY + j * gridSize;
          gridGraphics.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // 다음 그리드 위치 업데이트 (간격 추가)
      currentX += grid.width * gridSize + gridSpacing;
      maxYInRow = Math.max(maxYInRow, grid.height * gridSize);

      // 줄바꿈 처리 (새 행 시작 시 간격 추가)
      if (currentX + gridSize > Number(this.sys.game.config.width)) {
        currentX = 0;
        currentY += maxYInRow + gridSpacing;
        maxYInRow = 0;
      }
    });
  }
}
