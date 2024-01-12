import { BarterItemData } from "./InventoryInterface";

export default class Item {
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
}
