import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";
import { BarterItem } from "../types/Barter_Item";
import { ChestRigItem } from "../types/Chest_Rig";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
  }

  preload() {}

  async create() {
    console.log("Inventory 씬의 create 메소드 호출됨");
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
    let currentX = 0; // 현재 X 좌표
    let currentY = 0; // 현재 Y 좌표
    let maxYInRow = 0; // 현재 행에서 가장 높은 그리드의 높이
  
    grids.forEach(grid => {
      for (let i = 0; i < grid.width; i++) {
        for (let j = 0; j < grid.height; j++) {
          const x = currentX + i * gridSize;
          const y = currentY + j * gridSize;
          gridGraphics.strokeRect(x, y, gridSize, gridSize);
        }
      }
  
      // 다음 그리드 위치 업데이트
      currentX += grid.width * gridSize;
      maxYInRow = Math.max(maxYInRow, grid.height * gridSize);
  
      // 줄바꿈 처리
      if (currentX + gridSize > Number(this.sys.game.config.width)) {
        currentX = 0;
        currentY += maxYInRow;
        maxYInRow = 0;
      }
    });
  }
  
  
}
