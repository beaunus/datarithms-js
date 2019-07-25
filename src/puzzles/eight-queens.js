import { generatePermutationsHeapIter } from "../algorithms/permutations/permutations.heaps";
import { range } from "../algorithms/itertools";

/**
 * @param {*} n
 * @return {number}
 */
export function countSolutionsBruteForce(n) {
  let numSolutions = 0;
  for (const config of generatePermutationsHeapIter({ array: range(0, n) })) {
    if (isSafe(config)) ++numSolutions;
  }
  return numSolutions;
}

/**
 *
 * @param {ReadonlyArray} config
 * @return {boolean}
 */
function isSafe(config) {
  for (let i = 0; i < config.length; ++i) {
    for (let j = i + 1; j < config.length; ++j) {
      const diff = Math.abs(config[j] - config[i]);
      if (diff === j - i) return false;
    }
  }
  return true;
}

/**
 * @param {number} n
 * @return {number}
 */
export function countSolutionsBacktracking(n) {
  return countSolutionsBacktrackingHelper({
    currentRow: 0,
    placements: [],
    remainingCols: range(0, n),
  });
}

/**
 * @param {object} param
 * @param {Array<number>} param.remainingCols
 * @param {number} param.currentRow
 * @param {Array<number>} param.placements
 * @return {number}
 */
function countSolutionsBacktrackingHelper({
  remainingCols,
  currentRow,
  placements,
}) {
  if (!remainingCols.length) return 1;
  let result = 0;
  for (const position of remainingCols) {
    let isPositionAllowed = true;
    for (let j = currentRow - 1; j >= 0; --j) {
      const diff = Math.abs(position - placements[j]);
      if (diff === currentRow - j) {
        isPositionAllowed = false;
        break;
      }
    }
    if (isPositionAllowed)
      result += countSolutionsBacktrackingHelper({
        currentRow: currentRow + 1,
        placements: [...placements, position],
        remainingCols: remainingCols.filter(x => x !== position),
      });
  }
  return result;
}
