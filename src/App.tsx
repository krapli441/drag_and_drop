import React, { CSSProperties } from "react";
import "./App.css";

function App() {
  const containerStyle: CSSProperties = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const inventoryStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    width: "25vw",
    height: "25vw",
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
      <div style={containerStyle}>
        <div style={inventoryStyle}>{inventoryBoxes}</div>
      </div>
    </div>
  );
}

export default App;
