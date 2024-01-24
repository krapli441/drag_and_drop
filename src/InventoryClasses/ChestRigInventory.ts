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
  gridSpaces: ChestRigInnerGrid[];
  capacity: number;

  calculateGridSpaces(grids: ChestRigInnerGrid[]): ChestRigInnerGrid[] {
    return grids.map((grid) => ({
      width: grid.width,
      height: grid.height,
      items: new Array(grid.width * grid.height).fill(null),
    }));
  }

  constructor(item: ChestRigItem) {
    this.id = item.id;
    this.shortName = item.shortName;
    this.width = item.width;
    this.height = item.height;
    this.hasGrid = item.hasGrid;
    this.basePrice = item.basePrice;
    this.grids = item.properties.grids as ChestRigInnerGrid[];
    this.gridSpaces = this.calculateGridSpaces(this.grids);
    this.capacity = item.properties.capacity;
  }
}
