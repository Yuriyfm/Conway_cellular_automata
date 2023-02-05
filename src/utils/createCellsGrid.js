export const createCellsGrid = (gridWidth = 50, gridHeight = 50) => {
  return Array(gridWidth).fill(0).map(row => new Array(gridHeight).fill(0))
}