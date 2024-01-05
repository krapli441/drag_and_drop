import React, { CSSProperties } from "react";
import "./App.css";

type BoxSizing = "content-box" | "border-box";

function App() {
  const containerStyle: CSSProperties = {
    width: "50vw",
    height: "50vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const inventoryStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    width: "100%",
    height: "100%",
  };

  const boxStyle: CSSProperties = {
    border: "1px solid black",
    boxSizing: "border-box" as BoxSizing,
  };

  const inventoryBoxes = [];

  for (let i = 0; i < 25; i++) {
    inventoryBoxes.push(<div key={i} style={boxStyle}></div>);
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
