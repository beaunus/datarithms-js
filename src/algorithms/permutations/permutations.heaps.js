import * as _ from "lodash";
import { swap } from "../swap/swap";

/**
 *
 * @param {object} param
 * @param {Array<*>} param.array
 * @param {boolean} param.SHOULD_DISPLAY_SWAPS
 */
function* generatePermutationsHeapIter({
  array,
  SHOULD_DISPLAY_SWAPS = false
}) {
  if (SHOULD_DISPLAY_SWAPS) console.log({ array });
  yield array.slice();

  const c = Array(array.length).fill(0);

  for (let i = 0; i < array.length; ) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        if (SHOULD_DISPLAY_SWAPS) displaySwap(array.length, 0, i);
        swap(array, 0, i);
      } else {
        if (SHOULD_DISPLAY_SWAPS) displaySwap(array.length, c[i], i);
        swap(array, c[i], i);
      }
      yield array.slice();
      ++c[i];
      i = 0;
    } else {
      c[i++] = 0;
    }
  }
}

/**
 *
 * @param {*} total
 * @param {*} i
 * @param {*} j
 */
function displaySwap(total, i, j) {
  const result = _.times(total, index =>
    [i, j].includes(index) ? "\x1b[32mO\x1b[30" : "\x1b[31mX\x1b[30"
  );
  console.log(result.join(""));
}

/**
 *
 * @param {*} param0
 */
function* generatePermutationsHeapRecursive2({ array, k = array.length }) {
  if (k === 1) {
    yield array.slice();
  } else {
    yield* generatePermutationsHeapRecursive2({ array, k: k - 1 });
    for (let i = 0; i < k - 1; ++i) {
      if (k % 2 === 0) {
        swap(array, i, k - 1);
      } else {
        swap(array, 0, k - 1);
      }
      yield* generatePermutationsHeapRecursive2({ array, k: k - 1 });
    }
  }
}

/**
 * @param {Array<any>} array
 * @param {number} k
 */
function* generatePermutationsHeapRecursive1({ array, k = array.length }) {
  if (k === 1) {
    yield array.slice();
  } else {
    for (let i = 0; i < k; ++i) {
      yield* generatePermutationsHeapRecursive1({ array, k: k - 1 });
      if (k % 2 === 0) {
        swap(array, i, k - 1);
      } else {
        swap(array, 0, k - 1);
      }
    }
  }
}

export {
  generatePermutationsHeapRecursive1,
  generatePermutationsHeapRecursive2,
  generatePermutationsHeapIter
};
