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
  gridSpaces: any[];
  capacity: number;

  calculateGridSpaces(grids: ChestRigInnerGrid[]) {
    const gridSpaces: any[] = [];

    grids.forEach((grid) => {
      // 각 그리드의 크기에 따라 '빈 칸'을 계산합니다.
      const spaces = new Array(grid.width * grid.height).fill(null);
      gridSpaces.push(...spaces);
    });

    return gridSpaces;
  }

  constructor(item: ChestRigItem) {
    this.id = item.id;
    this.shortName = item.shortName;
    this.width = item.width;
    this.height = item.height;
    this.hasGrid = item.hasGrid;
    this.basePrice = item.basePrice;
    this.grids = item.properties.grids as ChestRigInnerGrid[];
    this.gridSpaces = this.calculateGridSpaces(item.properties.grids);
    this.capacity = item.properties.capacity;
  }
}
