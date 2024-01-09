import React, { useState, useEffect } from "react";
import { Item } from "./Types";

interface InventoryBlockProps {
  amount: number;
  size: number;
  items: Item[];
}

const InventoryBlock: React.FC<InventoryBlockProps> = ({
  amount,
  size,
  items,
}) => {
  const [itemBlocks, setItemBlocks] = useState<(Item | undefined)[]>(
    new Array(amount).fill(undefined)
  );

  useEffect(() => {
    const updatedItemBlocks = new Array(amount).fill(undefined);

    items.forEach((item) => {
      // 아이템을 배치할 수 있는 첫 번째 위치를 찾습니다.
      for (let i = 0; i < amount; i++) {
        if (canPlaceItem(i, item, updatedItemBlocks, size)) {
          // 아이템을 배치합니다.
          placeItem(i, item, updatedItemBlocks, size);
          break;
        }
      }
    });

    setItemBlocks(updatedItemBlocks);
  }, [items, amount, size]);

  const canPlaceItem = (
    startIndex: number,
    item: Item,
    itemBlocks: (Item | undefined)[],
    gridSize: number
  ): boolean => {
    const itemWidth = item.size_width;
    const itemHeight = item.size_height;
    const gridWidth = gridSize;

    for (let y = 0; y < itemHeight; y++) {
      for (let x = 0; x < itemWidth; x++) {
        const index = startIndex + x + y * gridWidth;

        // 그리드를 벗어나지 않는지 확인
        if (
          x + (startIndex % gridWidth) >= gridWidth ||
          index >= itemBlocks.length
        ) {
          return false;
        }

        // 이미 다른 아이템으로 채워진 셀이 있는지 확인
        if (itemBlocks[index] !== undefined) {
          return false;
        }
      }
    }

    return true;
  };

  const placeItem = (
    startIndex: number,
    item: Item,
    itemBlocks: (Item | undefined)[],
    gridSize: number
  ): void => {
    const itemWidth = item.size_width;
    const itemHeight = item.size_height;
    const gridWidth = gridSize;

    for (let y = 0; y < itemHeight; y++) {
      for (let x = 0; x < itemWidth; x++) {
        const index = startIndex + x + y * gridWidth;
        itemBlocks[index] = item;
      }
    }
  };

  return (
    <div className="inventory-blocks">
      {itemBlocks.map((item, index) => (
        <div
          key={index}
          className="block"
          style={{ width: size, height: size, border: "0.5px solid gray" }}
        >
          {item && (
            <div
              className="item"
              style={{
                backgroundImage: item.image,
                width: item.size_width * size,
                height: item.size_height * size,
              }}
            >
              {/* 아이템의 추가적인 내용 렌더링 */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventoryBlock;
