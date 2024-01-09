import React, { useState } from "react";
import InventoryBlock from "./InventoryBlock";
import "./Inventory.css";
import { Item, Grid } from "./Types";

const _items: Item[] = [
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

const Inventory: React.FC = () => {
  const [items, setItems] = useState<Item[]>(_items);
  const [grid, setGrid] = useState<Grid>({
    width_block: 10,
    height_block: 10,
    size: 50,
  });
  const { width_block, height_block, size } = grid;

  return (
    <>
      <div
        className="inventory-drag-wrapper"
        style={{
          gridTemplateColumns: `repeat(${width_block}, ${size}px)`,
          width: `${width_block * size + 2}px`,
          height: `${height_block * size + 3}px`,
          gridTemplateRows: `repeat(${width_block}, ${size}px)`,
        }}
      >
        <InventoryBlock
          amount={width_block * height_block}
          size={size}
          items={items}
        />
      </div>
    </>
  );
};

export default Inventory;
