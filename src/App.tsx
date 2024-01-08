import React, { useState } from "react";
import "./App.css";

// 초기 인벤토리 배열
const inventory = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

// 1x1 아이템 배열
const item1x1 = [["1x1"]];

// 2x2 아이템 배열
const item2x2 = [
  ["2x2", "2x2"],
  ["2x2", "2x2"],
];

// 3x3 아이템 배열
const item3x3 = [
  ["3x3", "3x3", "3x3"],
  ["3x3", "3x3", "3x3"],
  ["3x3", "3x3", "3x3"],
];

function App() {
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });

  const handleMouseEnter = (rowIndex: number, columnIndex: number) => {
    setMousePosition({ x: rowIndex, y: columnIndex });
  };

  return (
    <div className="App">
      <div className="inventory">
        {inventory.map((row, rowIndex) => (
          <div className="inventory-row" key={rowIndex}>
            {row.map((item, columnIndex) => (
              <div
                className="inventory-cell"
                key={columnIndex}
                onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
              >
                {item !== null ? (
                  <div className="inventory-item">{/* 아이템 표시 */}</div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      {mousePosition.x !== -1 && mousePosition.y !== -1 && (
        <div>
          {`${mousePosition.x + 1}번째 줄의 ${
            mousePosition.y + 1
          }번째 칸에 마우스를 올렸습니다`}
        </div>
      )}
    </div>
  );
}

export default App;
