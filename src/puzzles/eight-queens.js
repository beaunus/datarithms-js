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
