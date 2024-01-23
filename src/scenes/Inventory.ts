import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
  }

  preload() {}

  async create() {
    try {
      const chestRigData = await loadRandomData(CHEST_RIG_QUERY);
      const barterItemsData = await loadRandomData(BARTER_ITEM_QUERY);
      // 여기에서 받은 데이터를 처리합니다.
      console.log("체스트 리그 데이터 : ", chestRigData);
      console.log("교환 아이템 데이터 : ", barterItemsData);
    } catch (error) {
      console.error("데이터 로딩 중 오류가 발생했습니다:", error);
    }
  }
}
