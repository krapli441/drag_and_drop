import React from "react";
import PhaserGame from "./PhaserGame";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Tetris Simulator</h1>
      <PhaserGame />
    </div>
  );
}

export default App;
