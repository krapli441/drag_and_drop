import { ChestRigItem } from "../types/Chest_Rig";
import { ChestRigInnerGrid } from "../types/Chest_Rig";

export class ChestRigInventory {
  id: string;
  shortName: string;
  width: number;
  height: number;
  hasGrid: boolean;
  basePrice: number;
  grids: ChestRigInnerGrid[];
  capacity: number;

  calculateGridSpaces(grids: ChestRigInnerGrid[]): ChestRigInnerGrid[] {
    return grids.map((grid) => ({
      width: grid.width,
      height: grid.height,
      items: Array.from({ length: grid.height }, () =>
        new Array(grid.width).fill(null)
      ),
    }));
  }

  constructor(item: ChestRigItem) {
    this.id = item.id;
    this.shortName = item.shortName;
    this.width = item.width;
    this.height = item.height;
    this.hasGrid = item.hasGrid;
    this.basePrice = item.basePrice;
    this.grids = this.calculateGridSpaces(item.properties.grids); // 여기서 item.properties.grids를 인자로 전달
    this.capacity = item.properties.capacity;
  }
}
