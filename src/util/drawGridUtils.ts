import Phaser from "phaser";
import { ChestRigInnerGrid } from "../types/Chest_Rig";
import { BarterItem } from "../types/Barter_Item";
import { gridAreas, gridDetails } from "../types/Grids";

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
  // console.log("그리드 영역 정보:", gridAreas);
  // console.log("그리드 칸 정보:", gridDetails);
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

    itemRect.on("pointerup", function (pointer: Phaser.Input.Pointer) {
      const droppedX = pointer.x;
      const droppedY = pointer.y;

      // 드롭된 위치가 어느 그리드의 어느 칸에 해당하는지 확인
      const droppedOnGrid = gridDetails.find(
        (grid) =>
          droppedX >= grid.x &&
          droppedX < grid.x + grid.width &&
          droppedY >= grid.y &&
          droppedY < grid.y + grid.height
      );

      if (droppedOnGrid) {
        console.log(
          `아이템이 ${droppedOnGrid.gridIndex}번째 그리드의 ${droppedOnGrid.row}번째 줄, ${droppedOnGrid.column}번째 칸에 올려졌습니다`
        );
      }

      itemRect.setData("dragging", false);
      // 드래그 종료 시 데이터 처리
      const droppedItemData = itemRect.getData("itemData");
    });

    // 다음 아이템 위치 업데이트
    startX += gridSize * item.width + gridSpacing;
    if (startX + gridSize > Number(scene.sys.game.config.width)) {
      startX = 0;
      startY += gridSize * item.height + gridSpacing;
    }
  });
}
