export interface ChestRigItem {
  shortName: string;
  id: string;
  width: number;
  height: number;
  hasGrid: boolean;
  link: string;
  image8xLink: string;
  basePrice: number;
  properties: {
    grids: Array<{ width: number; height: number }>;
    capacity: number;
  };
}
