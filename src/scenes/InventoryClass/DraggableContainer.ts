import Phaser from "phaser";
import { BarterItemData } from "./InventoryInterface";

export class DraggableContainer extends Phaser.GameObjects.Container {
  itemData: BarterItemData;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    children: Phaser.GameObjects.GameObject[],
    itemData: BarterItemData
  ) {
    super(scene, x, y, children);
    this.itemData = itemData;
  }
}
