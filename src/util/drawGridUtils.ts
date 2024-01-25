import Phaser from "phaser";
import { ChestRigInnerGrid } from "../types/Chest_Rig";
import { BarterItem } from "../types/Barter_Item";

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

    // 드래그 앤 드롭 로직
    scene.input.setDraggable(itemRect);

    itemRect.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      itemRect.setData("startX", itemRect.x);
      itemRect.setData("startY", itemRect.y);
    });

    itemRect.on(
      "drag",
      (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        itemRect.x = dragX;
        itemRect.y = dragY;
      }
    );

    itemRect.on("pointerup", function (pointer: Phaser.Input.Pointer) {
      // 드롭 후 로직 추가
    });

    // 다음 아이템 위치 업데이트
    startX += gridSize * item.width + gridSpacing;
    if (startX + gridSize > Number(scene.sys.game.config.width)) {
      startX = 0;
      startY += gridSize * item.height + gridSpacing;
    }
  });
}
