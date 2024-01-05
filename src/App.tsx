import React, { CSSProperties } from "react";
import "./App.css";

function App() {
  const inventoryContainerStyle: CSSProperties = {
    height: "70vh",
    borderBottom: "2px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const inventoryBoxStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    width: "300px",
    height: "300px",
    border: "2px solid black",
  };

  const boxStyle: CSSProperties = {
    border: "1px solid black",
  };

  const inventoryBoxes = [];

  for (let i = 0; i < 25; i++) {
    inventoryBoxes.push(
      <div key={i} style={{ ...boxStyle, cursor: "default" }}></div>
    );
  }

  // 1x1, 2x2, 3x3 크기의 아이템 추가
  const items = [
    { size: "1x1", text: "1x1", width: "60px", height: "60px" },
    { size: "2x2", text: "2x2", width: "120px", height: "120px" },
    { size: "3x3", text: "3x3", width: "180px", height: "180px" },
  ];

  const itemComponents = items.map((item, index) => (
    <div
      key={index}
      draggable={true}
      style={{
        width: item.width,
        height: item.height,
        cursor: "grab",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      {item.text}
    </div>
  ));

  return (
    <div className="App">
      <div style={inventoryContainerStyle}>
        <div style={inventoryBoxStyle}>{inventoryBoxes}</div>
      </div>
      <div
        style={{
          height: "30vh",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {itemComponents}
      </div>
    </div>
  );
}

export default App;
