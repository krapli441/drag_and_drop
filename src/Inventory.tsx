import React, { useState } from "react";
import "./Inventory.css";

const Inventory = () => {
  const [grid, setGrid] = useState({
    width_block: 5,
    height_block: 5,
    size: 50,
  });

  // 현재는 handleClick 메서드를 사용하지 않는다
  // const handleClick = () => { ... };

  const { width_block, height_block, size } = grid;

  return (
    <>
      {/* 현재는 Add Item 버튼을 사용하지 않는다.
      <button
        onClick={handleClick}
        style={{ position: 'absolute', top: '80%', left: '50%' }}
      >
        Add Item
      </button>
      */}
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
