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
  addItem(item: Item, position: { x: number; y: number }): boolean {
    // position은 그리드 내의 좌표 (0,0) 부터 시작

    // 아이템이 들어갈 수 있는지 검사
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        let index = (position.y + i) * this.width + (position.x + j);
        if (this.item[index] !== null) {
          return false; // 이미 아이템이 있는 경우
        }
      }
    }

    // 아이템을 추가
    for (let i = 0; i < item.height; i++) {
      for (let j = 0; j < item.width; j++) {
        let index = (position.y + i) * this.width + (position.x + j);
        this.item[index] = item;
      }
    }
    return true;
  }
}
