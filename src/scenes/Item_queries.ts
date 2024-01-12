export const CHEST_RIG_QUERY = `
query {
  items(categoryNames: ChestRig) {
    shortName
    id
    width
    height
    hasGrid
    link
    image8xLink
    basePrice
    properties {
      ...on ItemPropertiesChestRig {
        grids {
          width
          height
        }
        capacity
      }
    }
  }
}
`;

export const BARTER_ITEM_QUERY = `
query {
  items(categoryNames: BarterItem) {
    shortName
    id
    width
    height
    link
    image8xLink
    basePrice
  }
}
`;
