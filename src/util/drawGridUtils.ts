import Phaser from "phaser";
import { ChestRigInventory } from "../InventoryClasses/ChestRigInventory";
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
  grids: ChestRigInnerGrid[],
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
      const droppedItemData = itemRect.getData("itemData");

      // 드롭된 위치가 어느 그리드의 어느 칸에 해당하는지 확인
      const droppedOnGrid = gridDetails.find(
        (grid) =>
          droppedX >= grid.x &&
          droppedX < grid.x + grid.width &&
          droppedY >= grid.y &&
          droppedY < grid.y + grid.height
      );

      if (droppedOnGrid) {
        // 아이템이 배치될 그리드 및 칸 확인
        const targetGrid = grids[droppedOnGrid.gridIndex];
        const dropRow = droppedOnGrid.row - 1; // 0 기반 인덱스 조정
        const dropColumn = droppedOnGrid.column - 1; // 0 기반 인덱스 조정

        // 아이템 배치 가능 여부 확인
        const canPlaceItem = canPlaceItemInGrid(
          targetGrid,
          droppedItemData,
          dropRow,
          dropColumn,
          droppedOnGrid.gridIndex
        );

        if (canPlaceItem) {
          // 아이템을 그리드에 배치
          placeItemInGrid(targetGrid, droppedItemData, dropRow, dropColumn);
          console.log(
            `아이템을 ${droppedOnGrid.gridIndex}번째 그리드에 성공적으로 배치했습니다.`
          );

          updateItemVisualPosition(
            itemRect,
            droppedOnGrid,
            gridSize,
            item.width, // 아이템의 가로 크기 전달
            item.height // 아이템의 세로 크기 전달
          );
          console.log(
            "배치 후 인벤토리 상태 :", // ChestRigInventory 인스턴스의 grids 정보 로깅
            grids[droppedOnGrid.gridIndex].items
          );
        } else {
          console.log(
            `아이템을 ${droppedOnGrid.gridIndex}번째 그리드에 배치할 수 없습니다.`
          );
        }
      }

      itemRect.setData("dragging", false);
    });

    function updateItemVisualPosition(
      itemRect: Phaser.GameObjects.Rectangle,
      droppedOnGrid: {
        gridIndex?: number;
        row: number;
        column: number;
        x: number;
        y: number;
        width?: number;
        height?: number;
      },
      gridSize: number,
      itemWidth: number,
      itemHeight: number
    ) {
      // 셀의 왼쪽 상단 모서리에 아이템의 왼쪽 상단 모서리가 위치하도록 계산합니다.
      const newX = droppedOnGrid.x + gridSize;
      const newY = droppedOnGrid.y + gridSize;

      // Phaser 객체의 위치를 업데이트합니다. 객체의 크기를 고려하지 않고 셀의 왼쪽 상단에 위치하도록 합니다.
      itemRect.x = newX;
      itemRect.y = newY;
    }

    // 다음 아이템 위치 업데이트
    startX += gridSize * item.width + gridSpacing;
    if (startX + gridSize > Number(scene.sys.game.config.width)) {
      startX = 0;
      startY += gridSize * item.height + gridSpacing;
    }
  });
}

export function canPlaceItemInGrid(
  grid: ChestRigInnerGrid,
  itemData: BarterItem,
  dropRow: number,
  dropColumn: number,
  gridIndex: number
) {
  // grid.items의 존재 여부 확인
  if (!grid.items) {
    console.log("유효하지 않은 그리드입니다.");
    return false;
  }

  for (let i = 0; i < itemData.height; i++) {
    for (let j = 0; j < itemData.width; j++) {
      const checkRow = dropRow + i;
      const checkColumn = dropColumn + j;

      if (
        checkRow >= grid.height ||
        checkColumn >= grid.width ||
        grid.items[checkRow][checkColumn] !== null
      ) {
        console.log(
          `아이템을 배치할 수 없습니다: ${gridIndex}번째 그리드의 ${
            checkRow + 1
          }번째 줄, ${checkColumn + 1}번째 칸`
        );
        return false;
      }
    }
  }

  console.log(
    `아이템을 ${gridIndex}번째 그리드의 ${dropRow + 1}번째 줄, ${
      dropColumn + 1
    }번째 칸에 배치할 수 있습니다.`
  );
  return true;
}

function placeItemInGrid(
  grid: ChestRigInnerGrid,
  itemData: BarterItem,
  startRow: number,
  startColumn: number
) {
  // grid.items가 정의되었는지 확인
  if (!grid.items) {
    console.error("그리드에 items 배열이 정의되지 않았습니다.");
    return;
  }

  // 아이템을 그리드에 배치
  for (let row = 0; row < itemData.height; row++) {
    for (let col = 0; col < itemData.width; col++) {
      // 해당 그리드 칸이 정의되었는지 확인
      if (
        !grid.items[startRow + row] ||
        grid.items[startRow + row][startColumn + col] === undefined
      ) {
        console.error("그리드의 지정된 칸이 정의되지 않았습니다.");
        return;
      }
      grid.items[startRow + row][startColumn + col] = itemData.id; // 아이템 ID 저장
    }
  }
}

// function onItemDrop(
//   gridIndex: number,
//   itemData: BarterItem,
//   dropRow: number,
//   dropColumn: number,
//   chestRigInventory: ChestRigInventory
// ) {
//   const targetGrid = chestRigInventory.grids[gridIndex];

//   if (
//     canPlaceItemInGrid(targetGrid, itemData, dropRow, dropColumn, gridIndex)
//   ) {
//     placeItemInGrid(targetGrid, itemData, dropRow, dropColumn);
//     console.log(`아이템 ${itemData.id}이(가) 그리드에 배치되었습니다.`);
//   } else {
//     console.log(`아이템을 그리드에 배치할 수 없습니다.`);
//   }
// }
