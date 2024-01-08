import React, { useState } from "react";
import "./Inventory.css";

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

const Inventory = () => {
  const [grid, setGrid] = useState({
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
          width: `${width_block * size + 3}px`,
          height: `${height_block * size + 3}px`,
          gridTemplateRows: `repeat(${height_block}, ${size}px)`,
        }}
      >
        {/* 여기에서 InventoryBlock 컴포넌트를 사용하지 않습니다. */}
        {Array.from({ length: width_block * height_block }).map((_, i) => (
          <div className="block-wrapper" key={i}>
            <div className="block"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Inventory;
