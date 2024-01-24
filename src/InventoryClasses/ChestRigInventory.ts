import { ChestRigItem } from "../types/Chest_Rig";

export class ChestRigInventory {
  id: string;
  shortName: string;
  width: number;
  height: number;
  hasGrid: boolean;
  basePrice: number;
  grids: any[];

  constructor(item: ChestRigItem) {
    this.id = item.id;
    this.shortName = item.shortName;
    this.width = item.width;
    this.height = item.height;
    this.hasGrid = item.hasGrid;
    this.basePrice = item.basePrice;
    this.grids = item.properties.grids;
  }
}
