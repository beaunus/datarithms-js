/**
 * @param {object} param
 * @param {number} param.numCols
 * @param {number} param.numMines
 * @param {number} param.numRows
 * @return {Array<Array<number>>}
 */
function createGridShuffle({ numCols, numMines, numRows }) {
  const resultFlat = new Array(numRows * numCols).fill(0);
  for (let i = 0; i < numMines; ++i) resultFlat[i] = 9;
  shuffle(resultFlat);
  return makeGridFromArray({ numCols, numRows, resultFlat });
}

/**
 * @param {object} param
 * @param {number} param.numRows
 * @param {Array} param.resultFlat
 * @param {number} param.numCols
 * @return {Array<Array>}
 */
function makeGridFromArray({ numCols, numRows, resultFlat }) {
  const result = new Array(numRows);
  for (let i = 0; i < numRows; ++i)
    result[i] = resultFlat.slice(i * numCols, numCols * (i + 1));
  return result;
}

/**
 * @param {object} param
 * @param {number} param.numCols
 * @param {number} param.numMines
 * @param {number} param.numRows
 * @return {Array<Array<number>>}
 */
function createGridSlick({ numCols, numMines, numRows }) {
  const numCells = numRows * numCols;
  const resultFlat = new Array(numCells);
  for (let i = 0; i < numCells; ++i) {
    const numRemainingCells = numCells - i;
    const chanceOfMine = numMines / numRemainingCells;
    if (Math.random() < chanceOfMine) {
      resultFlat[i] = 9;
      --numMines;
    } else resultFlat[i] = 0;
  }
  return makeGridFromArray({ numCols, numRows, resultFlat });
}

/**
 *
 * @param {*} array
 * @return {Array}
 */
function shuffle(array) {
  for (let i = 0; i < array.length; ++i) {
    const remainingPositions = array.length - i;
    const indexToSwap = i + Math.floor(remainingPositions * Math.random());
    const temp = array[i];
    array[i] = array[indexToSwap];
    array[indexToSwap] = temp;
  }
  return array;
}

export { createGridShuffle, createGridSlick as createGrid };
