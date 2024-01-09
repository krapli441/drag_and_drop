import React, { useState } from "react";
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

  return (
    <div>
      {itemBlocks.map((item, index) => (
        <div
          key={index}
          className="block"
          style={{ width: size, height: size }}
        >
          {item && (
            <div
              className="item"
              style={{
                // 예시: 아이템의 배경 이미지, 크기 등을 설정
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
