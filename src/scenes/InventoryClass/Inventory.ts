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
    let maxColumns = 0;

    grids.forEach((grid) => {
      const columns = Math.ceil(grid.x / 50) + grid.width; // 그리드 시작 위치를 열 번호로 변환
      if (columns > maxColumns) {
        maxColumns = columns;
      }
    });

    return maxColumns;
  }

  // 아이템 추가 메서드
  addItem(item: Item, position: { x: number; y: number }): boolean {
    // 픽셀 단위의 좌표를 그리드 단위로 변환
    const gridPosX = Math.floor(position.x / 50); // 예시로 50px을 그리드 크기로 가정
    const gridPosY = Math.floor(position.y / 50);

    // 아이템을 그리드에 추가하는 로직
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        const gridIndex = (gridPosY + i) * this.numColumns + (gridPosX + j);
        if (gridIndex >= this.grids.length || !this.grids[gridIndex]) {
          console.log(`그리드 인덱스 ${gridIndex}는 존재하지 않습니다.`);
          return false;
        }
        if (!this.grids[gridIndex].addItem(item)) {
          return false;
        }
      }
    }

    return true;
  }

  updateGridCoordinates(gridIndex: number, x: number, y: number): void {
    if (gridIndex < 0 || gridIndex >= this.grids.length) {
      console.log(`그리드 인덱스 ${gridIndex}가 유효 범위를 벗어났습니다.`);
      return;
    }

    const grid = this.grids[gridIndex];
    grid.x = x;
    grid.y = y;
  }

  // 아이템이 해당 위치에 맞게 들어갈 수 있는지 검사하는 메서드
  private isItemFit(item: Item, position: { x: number; y: number }): boolean {
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        const gridIndex = (position.y + i) * this.numColumns + (position.x + j);
        if (gridIndex >= this.grids.length || this.grids[gridIndex].item) {
          console.log(
            `그리드 인덱스 ${gridIndex}는 이미 사용 중이거나 존재하지 않습니다.`
          );
          return false;
        }
      }
    }
    return true;
  }
}
