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

  // 2x2 크기의 박스 추가
  const twoByTwoBox = (
    <div
      key="2x2"
      style={{
        ...boxStyle,
        width: "120px",
        height: "120px",
        cursor: "grab",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        border: "1px solid black",
      }}
    >
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
    </div>
  );

  // 3x3 크기의 박스 추가
  const threeByThreeBox = (
    <div
      key="3x3"
      style={{
        ...boxStyle,
        width: "180px",
        height: "180px",
        cursor: "grab",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        border: "1px solid black",
      }}
    >
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
      <div style={{ ...boxStyle }}></div>
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
          flexDirection: "row",
          alignItems: "space-around",
        }}
      >
        {oneByOneBox}
        {twoByTwoBox}
        {threeByThreeBox}
      </div>
    </div>
  );
}

export default App;
