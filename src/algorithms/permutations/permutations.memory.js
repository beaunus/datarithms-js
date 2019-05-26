import { generatePermutationsHeapIter } from "./permutations.heaps";

/**
 *
 * @param {*} param0
 */
function* generatePermutationsMemory({ array }) {
  yield* generatePermutationsHeapIter({ array });
}

export { generatePermutationsMemory };
