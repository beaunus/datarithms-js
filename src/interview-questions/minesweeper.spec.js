import { createGrid } from "./minesweeper";

xdescribe("minesweeper", () => {
  it("should make a random field of mines", () => {
    const MAX_DIMENSION = 3;
    for (let numRows = 0; numRows <= MAX_DIMENSION; ++numRows)
      for (let numCols = 0; numCols <= MAX_DIMENSION; ++numCols)
        for (let numMines = 0; numMines <= numRows * numCols; ++numMines) {
          const thing = createGrid({ numCols, numMines, numRows });
          console.log(thing);
        }
  });
});
