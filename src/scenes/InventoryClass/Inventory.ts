import Grid from "./Grid";
import Item from "./Item";
import { ChestRigProperties } from "./InventoryInterface";

export default class Inventory {
  private grids: Grid[];
  private capacity: number;
  private numColumns: number; // 그리드의 열 수 추가

  constructor(properties: ChestRigProperties) {
    this.grids = properties.grids.map(
      (grid) => new Grid(grid.width, grid.height, grid.x, grid.y)
    );
    this.capacity = properties.capacity;
    this.numColumns = this.calculateNumColumns(properties.grids); // 그리드의 열 수 계산
  }

  // 그리드 열 수를 계산하는 메서드
  private calculateNumColumns(grids: Grid[]): number {
    let maxRightEdge = 0;

    grids.forEach((grid) => {
      const rightEdge = grid.x + grid.width;
      if (rightEdge > maxRightEdge) {
        maxRightEdge = rightEdge;
      }
    });

    return maxRightEdge;
  }

  // 아이템 추가 메서드
  addItem(item: Item, position: { x: number; y: number }): boolean {
    if (!this.isItemFit(item, position)) {
      return false;
    }

    // 아이템을 그리드에 추가하는 로직
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        // 그리드의 인덱스를 올바르게 계산
        const gridIndex = (position.y + i) * this.numColumns + (position.x + j);
        if (!this.grids[gridIndex].addItem(item)) {
          return false;
        }
      }
    }

    return true;
  }

  // 아이템이 해당 위치에 맞게 들어갈 수 있는지 검사하는 메서드
  private isItemFit(item: Item, position: { x: number; y: number }): boolean {
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        const gridIndex = (position.y + i) * this.numColumns + (position.x + j);
        if (gridIndex >= this.grids.length || this.grids[gridIndex].item) {
          return false;
        }
      }
    }
    return true;
  }
}
