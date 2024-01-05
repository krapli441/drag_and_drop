import React, { CSSProperties } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div style={{ height: "70vh", borderBottom: "2px solid black" }}>
        {/* 5x5 인벤토리가 들어갈 영역 */}
      </div>
      <div style={{ height: "30vh" }}>{/* 물건을 정렬할 공간 */}</div>
    </div>
  );
}

export default App;
