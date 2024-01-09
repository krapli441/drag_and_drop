export interface Item {
  name: string;
  image: string;
  image2?: string;
  size_width: number;
  size_height: number;
  // ... 기타 필요한 속성들 ...
}

export interface Grid {
  width_block: number;
  height_block: number;
  size: number;
}
