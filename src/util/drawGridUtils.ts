import Phaser from "phaser";
import { ChestRigInnerGrid } from "../types/Chest_Rig";
import { BarterItem } from "../types/Barter_Item";
import { ChestRigInventory } from "../InventoryClasses/ChestRigInventory";
import Inventory from "../scenes/Inventory";

// 그리드 영역 정보를 저장하는 배열
let gridAreas: {
  x: number;
  y: number;
  width: number;
  height: number;
  gridIndex: number;
}[] = [];

let gridDetails: {
  gridIndex: number;
  row: number;
  column: number;
  x: number;
  y: number;
  width: number;
  height: number;
}[] = [];

export function drawGrid(scene: Phaser.Scene, grids: ChestRigInnerGrid[]) {
  const gridGraphics = scene.add.graphics();
  gridGraphics.lineStyle(2, 0xffffff, 1);

  const gridSize = 50;
  const gridSpacing = 10;
  let currentX = 0;
  let currentY = 0;
  let maxYInRow = 0;

  grids.forEach((grid, gridIndex) => {
    for (let i = 0; i < grid.width; i++) {
      for (let j = 0; j < grid.height; j++) {
        const x = currentX + i * gridSize;
        const y = currentY + j * gridSize;
        // 그리드 영역 정보 저장
        gridAreas.push({ x, y, width: gridSize, height: gridSize, gridIndex });
        // 그리드 칸의 상세 정보 저장
        gridDetails.push({
          gridIndex: gridIndex,
          row: j + 1,
          column: i + 1,
          x: x,
          y: y,
          width: gridSize,
          height: gridSize,
        });

        // 상호작용 가능한 사각형 객체 생성
        const rect = scene.add.rectangle(
          x + gridSize / 2,
          y + gridSize / 2,
          gridSize,
          gridSize
        );
        rect.setInteractive();

        // 마우스 오버 이벤트 리스너 추가
        rect.on("pointerover", () => {
          console.log(
            `마우스가 ${gridIndex}번째 그리드의 ${j + 1}번째 줄, ${
              i + 1
            }번째 칸에 올려졌습니다`
          );
        });

        gridGraphics.strokeRect(x, y, gridSize, gridSize);
      }
    }
    currentX += grid.width * gridSize + gridSpacing;
    maxYInRow = Math.max(maxYInRow, grid.height * gridSize);

    if (currentX + gridSize > Number(scene.sys.game.config.width)) {
      currentX = 0;
      currentY += maxYInRow + gridSpacing;
      maxYInRow = 0;
    }
  });
}

// 드롭 위치가 그리드 영역 내부인지 판별하는 함수
export function isInsideGrid(droppedX: number, droppedY: number) {
  const foundArea = gridAreas.find(
    (area) =>
      droppedX >= area.x &&
      droppedX < area.x + area.width &&
      droppedY >= area.y &&
      droppedY < area.y + area.height
  );

  return foundArea ? foundArea.gridIndex : null;
}

export function drawItemGrid(
  scene: Phaser.Scene,
  items: BarterItem[],
  startX: number,
  startY: number
) {
  const gridGraphics = scene.add.graphics();
  gridGraphics.lineStyle(2, 0x6eff56, 1);

  const gridSize = 50;
  const gridSpacing = 10;
  let currentX = startX;
  let currentY = startY;

  items.forEach((item, index) => {
    // 아이템 전체 크기에 해당하는 rect 생성
    const itemRect = scene.add
      .rectangle(
        startX + (gridSize * item.width) / 2,
        startY + (gridSize * item.height) / 2,
        gridSize * item.width,
        gridSize * item.height,
        0x00ff00 // 예시 색상 코드
      )
      .setInteractive();

    // 아이템 데이터 설정
    itemRect.setData("itemData", item);

    // 드래그 앤 드롭 로직
    scene.input.setDraggable(itemRect);

    itemRect.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      itemRect.setData("dragging", true);
      // 아이템 데이터 캡쳐
      const capturedItemData = itemRect.getData("itemData");
      // console.log("드래그 시작:", capturedItemData);
    });

    itemRect.on(
      "drag",
      (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        if (itemRect.getData("dragging")) {
          itemRect.x = dragX;
          itemRect.y = dragY;
        }
      }
    );

    itemRect.on(
      "pointerup",
      function (this: Inventory, pointer: Phaser.Input.Pointer) {
        const droppedX = pointer.x;
        const droppedY = pointer.y;
        const droppedItemData = itemRect.getData("itemData");
    
        console.log(`드롭된 위치: x=${droppedX}, y=${droppedY}`); // 드롭 위치 로깅
    
        // 드롭된 위치가 어느 그리드의 어느 칸에 해당하는지 확인
        const droppedOnGrid = gridDetails.find(
          (grid) =>
            droppedX >= grid.x &&
            droppedX < grid.x + grid.width &&
            droppedY >= grid.y &&
            droppedY < grid.y + grid.height
        );
    
        if (droppedOnGrid && this.chestRigInventory) {
          console.log(`드롭된 그리드: ${droppedOnGrid.gridIndex}, 칸: ${droppedOnGrid.row}-${droppedOnGrid.column}`); // 드롭된 그리드 정보 로깅
    
          const canPlaceItem = checkItemPlacement(
            this,
            this.chestRigInventory.grids,
            droppedOnGrid.gridIndex,
            droppedItemData,
            droppedOnGrid.row,
            droppedOnGrid.column
          );
    
          if (canPlaceItem) {
            console.log(`아이템을 ${droppedOnGrid.gridIndex}번째 그리드에 배치할 수 있습니다.`);
            // 여기서 아이템을 그리드에 실제로 배치하는 로직을 추가합니다.
          } else {
            console.log(`아이템을 ${droppedOnGrid.gridIndex}번째 그리드에 배치할 수 없습니다.`);
          }
        } else {
          console.log("드롭된 위치가 유효한 그리드 내부가 아닙니다.");
        }
    
        itemRect.setData("dragging", false);
        // 드래그 종료 시 데이터 처리
      }
    );
    

    // 다음 아이템 위치 업데이트
    startX += gridSize * item.width + gridSpacing;
    if (startX + gridSize > Number(scene.sys.game.config.width)) {
      startX = 0;
      startY += gridSize * item.height + gridSpacing;
    }
  });
}

export function checkItemPlacement(
  scene: Phaser.Scene,
  grids: ChestRigInnerGrid[],
  gridIndex: number,
  itemData: BarterItem,
  row: number,
  column: number
) {
  // 드롭된 그리드 찾기
  const gridInfo = grids[gridIndex];
  if (!gridInfo || !gridInfo.items) {
    console.log("유효하지 않은 그리드입니다.");
    return false;
  }

  // 아이템이 배치될 각 칸이 비어있는지 확인
  for (let i = 0; i < itemData.height; i++) {
    for (let j = 0; j < itemData.width; j++) {
      // 해당 아이템 파트의 그리드 위치
      const itemPartRow = row + i;
      const itemPartCol = column + j;

      // 그리드 범위를 넘어가거나 이미 다른 아이템이 있는 경우
      if (
        itemPartRow >= gridInfo.height ||
        itemPartCol >= gridInfo.width ||
        gridInfo.items[itemPartRow][itemPartCol] !== null
      ) {
        console.log(
          `아이템을 배치할 수 없습니다: ${gridIndex}번째 그리드의 ${itemPartRow}번째 줄, ${itemPartCol}번째 칸`
        );
        return false;
      }
    }
  }

  // 모든 조건을 만족하면 아이템 배치 가능
  console.log(
    `아이템을 배치할 수 있습니다: ${gridIndex}번째 그리드의 ${row}번째 줄, ${column}번째 칸`
  );
  return true;
}
