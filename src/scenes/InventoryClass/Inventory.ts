import Grid from "./Grid";
import Item from "./Item";
import { ChestRigProperties } from "./InventoryInterface";

export default class Inventory {
  private grids: Grid[];
  private capacity: number;

  constructor(properties: ChestRigProperties) {
    this.grids = properties.grids.map(
      (grid) => new Grid(grid.width, grid.height)
    );
    this.capacity = properties.capacity;
  }

  // 아이템 추가 메서드
  addItem(item: Item, position: { x: number; y: number }): boolean {
    if (!this.isItemFit(item, position)) {
      return false;
    }

    // 아이템을 그리드에 추가하는 로직
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        // 그리드의 인덱스를 계산
        const gridIndex =
          position.y * this.grids.length +
          position.x +
          i * this.grids.length +
          j;
        if (!this.grids[gridIndex].addItem(item)) {
          return false;
        }
      }
    }

    return true;
  }

  // 아이템이 해당 위치에 맞게 들어갈 수 있는지 검사하는 메서드
  private isItemFit(item: Item, position: { x: number; y: number }): boolean {
    // 아이템이 인벤토리 내 위치에 맞게 들어갈 수 있는지 검사
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        // 그리드의 인덱스를 계산
        const gridIndex =
          position.y * this.grids.length +
          position.x +
          i * this.grids.length +
          j;
        if (gridIndex >= this.grids.length || this.grids[gridIndex].item) {
          return false;
        }
      }
    }
    return true;
  }
}
