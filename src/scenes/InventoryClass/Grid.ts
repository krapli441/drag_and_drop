import Item from "./Item";

export default class Grid {
  width: number;
  height: number;
  item: (Item | null)[];
  x: number;
  y: number;

  constructor(width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.item = Array(width * height).fill(null);
  }

  // 그리드에 아이템을 추가하는 메서드
  addItem(item: Item): boolean {
    // 아이템을 추가할 수 있는 빈 공간을 찾아서 추가
    const emptyIndex = this.item.findIndex((i) => i === null);
    if (emptyIndex === -1) {
      return false; // 빈 공간이 없는 경우
    }

    this.item[emptyIndex] = item;
    return true;
  }
}
