import React, { CSSProperties, useState } from "react";
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
    const handleDrop = (e: any) => {
      e.preventDefault();
      const itemData = e.dataTransfer.getData("item");
      e.target.appendChild(document.getElementById(itemData));
    };

    const handleDragOver = (e: any) => {
      e.preventDefault();
    };

    inventoryBoxes.push(
      <div
        key={i}
        style={{ ...boxStyle, cursor: "pointer" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {i + 1}
      </div>
    );
  }

  const items = [
    { id: "item1", content: "Item 1" },
    { id: "item2", content: "Item 2" },
    // Add more items here
  ];

  const handleDragStart = (e: any, item: any) => {
    e.dataTransfer.setData("item", item.id);
  };

  const itemComponents = items.map((item) => (
    <div
      key={item.id}
      style={{ ...boxStyle, cursor: "grab" }}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, item)}
    >
      {item.content}
    </div>
  ));

  return (
    <div className="App">
      <div style={containerStyle}>
        <div style={inventoryStyle}>{inventoryBoxes}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {itemComponents}
        </div>
      </div>
    </div>
  );
}

export default App;
