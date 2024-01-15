import Item from "./Item";

export default class Grid {
  width: number;
  height: number;
  item: Item | null;
  x: number;
  y: number;

  constructor(width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.item = null;
  }

  // 그리드에 아이템을 추가하는 메서드
  addItem(item: Item): boolean {
    // 이 그리드에 아이템이 들어갈 수 있는지 검사
    if (
      this.item !== null ||
      item.width > this.width ||
      item.height > this.height
    ) {
      return false; // 아이템이 들어갈 수 없다면 false 반환
    }

    this.item = item; // 아이템을 그리드에 추가
    return true; // 성공적으로 추가되면 true 반환
  }
}
