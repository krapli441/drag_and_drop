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
  // 특정 위치에 아이템을 추가하는 메서드
  addItem(item: Item, position: number): boolean {
    // position은 아이템을 추가할 배열 인덱스
    if (this.item[position] === null) {
      this.item[position] = item; // 아이템을 해당 위치에 추가
      return true; // 성공적으로 추가되면 true 반환
    }
    return false; // 해당 위치에 이미 아이템이 있으면 false 반환
  }
}
