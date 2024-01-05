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
    width: "20%",
    height: "50%",
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

  return (
    <div className="App">
      <div style={inventoryContainerStyle}>
        <div style={inventoryBoxStyle}>{inventoryBoxes}</div>
      </div>
      <div style={{ height: "30vh" }}>{/* 물건을 정렬할 공간 */}</div>
    </div>
  );
}

export default App;
