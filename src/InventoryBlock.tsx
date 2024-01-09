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

    </div>
  );
};

export default InventoryBlock;
