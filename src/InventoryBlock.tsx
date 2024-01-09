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
    // 여기서 items 배열을 기반으로 itemBlocks 상태를 업데이트합니다.
    // 예: 각 아이템을 적절한 위치에 매핑하는 로직
  }, [items]); // items 배열이 변경될 때만 이 효과를 실행

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
