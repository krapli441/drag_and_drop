import { ChestRigItem } from "../types/Chest_Rig";
import { BarterItem } from "../types/Barter_Item";

export function selectRandomChestRig(items: ChestRigItem[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function selectRandomBarterItems(items: BarterItem[], count: number) {
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
