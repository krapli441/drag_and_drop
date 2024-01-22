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
    for (let i = 0; i < this.item.length; i++) {
      if (this.item[i] === null) {
        this.item[i] = item;
        return true;
      }
    }
    console.log(`이 그리드에는 더 이상 아이템을 추가할 수 없습니다.`);
    return false;
  }
}
