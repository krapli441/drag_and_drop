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
    // 아이템이 들어갈 수 있는 빈 공간을 찾아서 추가
    for (let i = 0; i < this.item.length; i++) {
      if (this.item[i] === null) {
        this.item[i] = item;
        return true;
      }
    }
    return false; // 빈 공간이 없으면 false 반환
  }
}
