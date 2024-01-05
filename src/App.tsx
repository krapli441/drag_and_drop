import React from "react";
import "./App.css";

// 초기 인벤토리 배열
const inventory = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

function App() {
  return (
    <div className="App">
      <div className="inventory">
        {inventory.map((row, rowIndex) => (
          <div className="inventory-row" key={rowIndex}>
            {row.map((item, columnIndex) => (
              <div className="inventory-cell" key={columnIndex}>
                {item !== null ? (
                  <div className="inventory-item">
                    {/* 아이템 표시: 여기에 아이템 정보를 표시 */}
                    {/* {item.name} */}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
