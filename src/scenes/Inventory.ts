import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";

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
        5
      );

      console.log("무작위 체스트 리그 데이터 : ", randomChestRig);
      console.log("무작위 교환 아이템 데이터 : ", randomBarterItems);
    } catch (error) {
      console.error("데이터 로딩 중 오류가 발생했습니다:", error);
    }
  }

  selectRandomChestRig(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  selectRandomBarterItems(items, count) {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
