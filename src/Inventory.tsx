import React, { Component } from "react";
import "./Inventory.css";

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

const _items = [
  {
    name: "AK-47",
    image:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749270831214/ak47_2.png)",
    image2:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749040136223/ak47.png)",
    size_width: 2,
    size_height: 4,
  },
  {
    name: "Mag",
    image:
      "url(https://media.discordapp.net/attachments/656601175763845180/930158750952730705/mag.png)",
    image2:
      "url(https://media.discordapp.net/attachments/656601175763845180/930158751183425586/mag_2.png)",
    size_width: 1,
    size_height: 2,
  },
  {
    name: "AMMO",
    image:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749509910538/ammo.png)",
    image2:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749769941042/ammo_2.png)",
    size_width: 1,
    size_height: 1,
  },
  {
    name: "Backpack",
    image:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158750101274684/backpack.png)",
    image2:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158750629785650/backpack_2.png)",
    size_width: 5,
    size_height: 7,
  },
];

class Inventory extends Component<{}, InventoryState> {
  state: InventoryState = {
    items: [..._items], // _items 배열을 여기에 넣으세요
    grid: { width_block: 10, height_block: 10, size: 50 },
  };

  // 기존 JavaScript 코드를 여기에 넣으세요

  handleClick = () => {
    this.setState((prevState) => ({
      items: [
        ...prevState.items,
        {
          name: `Item${prevState.items.length + 1}`,
          image: "url(기본 이미지 URL)",
          size_width: 1,
          size_height: 1,
        },
      ],
    }));
  };

  render() {
    const { items, grid } = this.state;
    const { width_block, height_block, size } = grid;

    return (
      <div>
        <button onClick={this.handleClick}>Add Item</button>
        <div
          className="inventory-grid"
          style={{
            gridTemplateColumns: `repeat(${width_block}, ${size}px)`,
            gridTemplateRows: `repeat(${height_block}, ${size}px)`,
            // 기타 필요한 스타일 속성 추가
          }}
        >
          {/* 여기에 각 아이템을 렌더링하는 로직을 추가합니다. */}
          {items.map((item, index) => (
            <div
              key={index}
              className="item"
              style={{
                gridColumnStart: "계산된 시작 위치",
                gridColumnEnd: "계산된 종료 위치",
                gridRowStart: "계산된 시작 위치",
                gridRowEnd: "계산된 종료 위치",
                backgroundImage: item.image,
                // 기타 필요한 스타일 속성 추가
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Inventory;
