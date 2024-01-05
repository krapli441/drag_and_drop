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

  // 1x1 크기의 박스 추가
  const oneByOneBox = (
    <div
      key="1x1"
      style={{
        ...boxStyle,
        width: "60px",
        height: "60px",
        cursor: "grab",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      1x1
    </div>
  );

  return (
    <div className="App">
      <div style={inventoryContainerStyle}>
        <div style={inventoryBoxStyle}>{inventoryBoxes}</div>
      </div>
      <div
        style={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {oneByOneBox}
      </div>
    </div>
  );
}

export default App;
