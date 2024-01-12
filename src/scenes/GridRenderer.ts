import Grid from "./InventoryClass/Grid";

export class GridRenderer {
  static drawGrid(
    scene: Phaser.Scene,
    grids: Grid[],
    xOffset: number,
    yOffset: number,
    lineColor: number
  ) {
    const gridGraphics = scene.add.graphics();
    gridGraphics.lineStyle(1, lineColor);

    grids.forEach((grid) => {
      for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
          gridGraphics.strokeRect(xOffset + x * 50, yOffset + y * 50, 50, 50);
        }
      }
    });
  }
}
