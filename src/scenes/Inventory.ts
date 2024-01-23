import Phaser from "phaser";
import { loadRandomData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
    console.log("Inventory 씬 생성자 호출됨");
  }

  preload() {
    console.log("Inventory 씬의 preload 메소드 호출됨");
  }

  async create() {
    console.log("Inventory 씬의 create 메소드 호출됨");
    try {
      const chestRigData = await loadRandomData(CHEST_RIG_QUERY);
      const barterItemsData = await loadRandomData(BARTER_ITEM_QUERY);
      console.log("체스트 리그 데이터 : ", chestRigData);
      console.log("교환 아이템 데이터 : ", barterItemsData);
    } catch (error) {
      console.error("데이터 로딩 중 오류가 발생했습니다:", error);
    }
  }
}
