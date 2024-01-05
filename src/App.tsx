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

  const generateBoxes = (size: any, text: any) => {
    const numCols = size === "1x1" ? 1 : size === "2x2" ? 2 : 3;
    const numRows = size === "1x1" ? 1 : size === "2x2" ? 2 : 3;
    const boxWidth = `${numCols * 60}px`;
    const boxHeight = `${numRows * 60}px`;

    return (
      <div
        key={size}
        style={{
          ...boxStyle,
          width: boxWidth,
          height: boxHeight,
          cursor: "grab",
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          border: "1px solid black",
        }}
      >
        {Array.from({ length: numCols * numRows }, (_, index) => (
          <div key={index} style={{ ...boxStyle }}></div>
        ))}
        {/* {text} */}
      </div>
    );
  };

  const items = [
    { size: "1x1", text: "1x1" },
    { size: "2x2", text: "2x2" },
    { size: "3x3", text: "3x3" },
  ];

  return (
    <div className="App">
      <div style={inventoryContainerStyle}>
        <div style={inventoryBoxStyle}></div>
      </div>
      <div
        className="inventory"
        style={{
          height: "30vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {items.map((item) => generateBoxes(item.size, item.text))}
      </div>
    </div>
  );
}

export default App;
