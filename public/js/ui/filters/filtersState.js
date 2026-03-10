export const filtersState = {
  text: "",
  ratingOp: 2,
  rating: 0,
  tagIds: new Set(),
  siteIds: new Set(),   // ou urlIds
  favoriteIds: new Set(),
  groupIds: new Set(),
  selectedMode: null,   // null | "on" | "off"
};