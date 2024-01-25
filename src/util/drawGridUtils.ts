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
    for (let i = 0; i < item.width; i++) {
      for (let j = 0; j < item.height; j++) {
        const x = currentX + i * gridSize;
        const y = currentY + j * gridSize;

        const rect = scene.add
          .rectangle(x + gridSize / 2, y + gridSize / 2, gridSize, gridSize)
          .setInteractive();

        scene.input.setDraggable(rect);

        // 드래그 시작 위치 저장
        rect.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
          rect.setData("dragOffsetX", pointer.x - rect.x);
          rect.setData("dragOffsetY", pointer.y - rect.y);
        });

        // 드래그 중 객체 위치 업데이트
        scene.input.on(
          "drag",
          (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.Rectangle,
            dragX: number,
            dragY: number
          ) => {
            if (gameObject === rect) {
              gameObject.x = dragX - rect.getData("dragOffsetX");
              gameObject.y = dragY - rect.getData("dragOffsetY");
            }
          }
        );

        gridGraphics.strokeRect(x, y, gridSize, gridSize);
      }
    }

    currentX += item.width * gridSize + gridSpacing;
    if (currentX + gridSize > Number(scene.sys.game.config.width)) {
      currentX = startX;
      currentY += item.height * gridSize + gridSpacing;
    }
  });
}
