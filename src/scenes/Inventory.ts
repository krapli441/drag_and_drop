import Phaser from "phaser";
import { loadChestRigData, loadBarterItemsData } from "../api/api";
import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "../api/item_queries";

export default class Inventory extends Phaser.Scene {
  constructor() {
    super("Inventory");
  }

  preload() {}

  async create() {}
}
