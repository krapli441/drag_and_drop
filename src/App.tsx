import React, { CSSProperties } from "react";
import "./App.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 아이템 타입 정의
const ItemTypes = {
  BOX: "box",
};

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

  // 드래그 가능한 아이템 컴포넌트 정의
  const DraggableBox = ({ size, text }: any) => {
    const [, ref] = useDrag({
      type: ItemTypes.BOX,
      item: { size },
    });

    return (
      <div
        ref={ref}
        style={{
          ...boxStyle,
          width: size === "1x1" ? "60px" : size === "2x2" ? "120px" : "180px",
          height: size === "1x1" ? "60px" : size === "2x2" ? "120px" : "180px",
          cursor: "grab",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        {text}
      </div>
    );
  };

  // 드롭 가능한 박스 컴포넌트 정의
  const DroppableBox = ({ children }: any) => {
    const [, ref] = useDrop({
      accept: ItemTypes.BOX,
    });

    return (
      <div ref={ref} style={{ ...boxStyle, position: "relative" }}>
        {children}
      </div>
    );
  };

  const items = [
    { size: "1x1", text: "1x1" },
    { size: "2x2", text: "2x2" },
    { size: "3x3", text: "3x3" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div style={inventoryContainerStyle}>
          <div style={inventoryBoxStyle}>
            {/* 박스 영역에 드롭 가능한 박스 컴포넌트 추가 */}
            <DroppableBox>
              {items.map((item) => (
                <DraggableBox
                  key={item.size}
                  size={item.size}
                  text={item.text}
                />
              ))}
            </DroppableBox>
          </div>
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
          {items.map((item) => (
            <DraggableBox key={item.size} size={item.size} text={item.text} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
