import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";
import { BarterItem } from "../types/Barter_Item";
import { ChestRigItem } from "../types/Chest_Rig";
import { ChestRigInnerGrid } from "../types/Chest_Rig";
import { ChestRigInventory } from "../InventoryClasses/ChestRigInventory";

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
        this.drawItemGrid(
          randomBarterItems,
          0,
          chestRigInventory.height * 50 + 20
        );
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

  drawGrid(grids: ChestRigInnerGrid[]) {
    const gridGraphics = this.add.graphics();
    gridGraphics.lineStyle(2, 0xffffff, 1);

    const gridSize = 50;
    const gridSpacing = 10;
    let currentX = 0;
    let currentY = 0;
    let maxYInRow = 0;

    grids.forEach((grid, gridIndex) => {
      for (let i = 0; i < grid.width; i++) {
        for (let j = 0; j < grid.height; j++) {
          const x = currentX + i * gridSize;
          const y = currentY + j * gridSize;

          // 상호작용 가능한 사각형 객체 생성
          const rect = this.add.rectangle(
            x + gridSize / 2,
            y + gridSize / 2,
            gridSize,
            gridSize
          );
          rect.setInteractive();

          // 마우스 오버 이벤트 리스너 추가
          rect.on("pointerover", () => {
            console.log(
              `마우스가 ${gridIndex}번째 그리드의 ${j + 1}번째 줄, ${
                i + 1
              }번째 칸에 올려졌습니다`
            );
          });

          gridGraphics.strokeRect(x, y, gridSize, gridSize);
        }
      }

      currentX += grid.width * gridSize + gridSpacing;
      maxYInRow = Math.max(maxYInRow, grid.height * gridSize);

      if (currentX + gridSize > Number(this.sys.game.config.width)) {
        currentX = 0;
        currentY += maxYInRow + gridSpacing;
        maxYInRow = 0;
      }
    });
  }

  drawItemGrid(items: BarterItem[], startX: number, startY: number) {
    const gridGraphics = this.add.graphics();
    gridGraphics.lineStyle(2, 0x6eff56, 1);

    const gridSize = 50;
    const gridSpacing = 10;
    let currentX = startX;
    let currentY = startY;

    items.forEach((item, index) => {
      for (let i = 0; i < item.width; i++) {
        for (let j = 0; j < item.height; j++) {
          const x = currentX + i * gridSize;
          const y = currentY + j * gridSize;

          // 상호작용 가능한 사각형 객체 생성
          const rect = this.add.rectangle(
            x + gridSize / 2,
            y + gridSize / 2,
            gridSize,
            gridSize
          );
          rect.setInteractive();

          gridGraphics.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // 다음 아이템 위치 업데이트
      currentX += item.width * gridSize + gridSpacing;

      // 줄바꿈 처리
      if (currentX + gridSize > Number(this.sys.game.config.width)) {
        currentX = startX;
        currentY += item.height * gridSize + gridSpacing;
      }
    });
  }
}
