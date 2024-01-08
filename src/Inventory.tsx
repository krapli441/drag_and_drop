import React, { Component } from "react";

interface Item {
  name: string;
  image: string;
  image2?: string;
  size_width: number;
  size_height: number;
}

interface Grid {
  width_block: number;
  height_block: number;
  size: number;
}

interface InventoryState {
  items: Item[];
  grid: Grid;
}

interface InventoryProps {
  // 필요한 경우 여기에 프로퍼티를 정의
}

const _items: Item[] = [];

class Inventory extends Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);
    this.state = {
      items: _items, // _items는 Item[] 타입을 가져야 함
      grid: { width_block: 10, height_block: 10, size: 50 },
    };
  }
}

export default Inventory;
