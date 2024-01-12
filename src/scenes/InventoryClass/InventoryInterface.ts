import Item from "./Item";

export interface Grid {
  width: number;
  height: number;
  item: Item | null;
}

export interface ChestRigProperties {
  grids: Grid[];
  capacity: number;
}

export interface ChestRigData {
  shortName: string;
  id: string;
  width: number;
  height: number;
  hasGrid: boolean;
  link: string;
  image8xLink: string;
  basePrice: number;
  properties: ChestRigProperties;
}

export interface BarterItemData {
  shortName: string;
  id: string;
  width: number;
  height: number;
  link: string;
  image8xLink: string;
  basePrice: number;
}