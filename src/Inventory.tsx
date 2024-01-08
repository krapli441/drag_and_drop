import React, { Component } from "react";
import { Item, Grid } from "./Types";

interface InventoryState {
  items: Item[];
  grid: Grid;
}

const _items: Item[] = []; // 아이템 배열을 초기화

class Inventory extends Component<{}, InventoryState> {
  state: InventoryState = {
    items: _items, // _items 배열을 위에서 정의한 Item 타입의 배열로 초기화
    grid: { width_block: 10, height_block: 10, size: 50 },
  };
}

export default Inventory;
