import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";
import { ChestRigInventory } from "../InventoryClasses/ChestRigInventory";
import { selectRandomBarterItems } from "../util/selectRandomItems";
import { selectRandomChestRig } from "../util/selectRandomItems";
import { drawGrid } from "../util/drawGridUtils";
import { drawItemGrid } from "../util/drawGridUtils";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
  }

  preload() {}

  async create() {
    try {
      const chestRigData = await loadRandomData(CHEST_RIG_QUERY);
      const barterItemsData = await loadRandomData(BARTER_ITEM_QUERY);
      const randomChestRig = selectRandomChestRig(chestRigData.data.items);
      const randomBarterItems = selectRandomBarterItems(
        barterItemsData.data.items,
        10
      );

      console.log("무작위 체스트 리그 데이터 : ", randomChestRig);
      console.log("무작위 교환 아이템 데이터 : ", randomBarterItems);

      if (randomChestRig.hasGrid && randomChestRig.properties.grids) {
        drawGrid(this, randomChestRig.properties.grids);
        const chestRigInventory = new ChestRigInventory(randomChestRig);
        console.log("ChestRigInventory:", chestRigInventory);
        drawItemGrid(
          this,
          randomBarterItems,
          0,
          chestRigInventory.height * 50 + 20
        );
      }
    } catch (error) {
      console.error("데이터 로딩 중 오류가 발생했습니다:", error);
    }
  }
}
