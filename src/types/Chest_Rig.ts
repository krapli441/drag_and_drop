export interface ChestRigItem {
  shortName: string;
  id: string;
  width: number;
  height: number;
  hasGrid: boolean;
  image8xLink: string;
  basePrice: number;
  properties: {
    grids: Array<{ width: number; height: number }>;
    capacity: number;
  };
}

export interface ChestRigInnerGrid {
  width: number;
  height: number;
  items?: any[]; // 아이템을 저장할 배열
}
