import { swap } from "../swap/swap";

/**
 * @param {Array<any>} array
 */
function* generatePermutationsHeapIter(array) {
  const c = Array(array.length).fill(0);

  yield array.slice();

  let i = 0;
  while (i < array.length) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        swap(array, 0, i);
      } else {
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
 * @param {Array<any>} array
 * @param {number} k
 */
function* generatePermutationsHeapRecursive2(array, k = array.length) {
  if (k === 1) {
    yield array.slice();
  } else {
    yield* generatePermutationsHeapRecursive2(array, k - 1);
    for (let i = 0; i < k - 1; ++i) {
      if (k % 2 === 0) {
        swap(array, i, k - 1);
      } else {
        swap(array, 0, k - 1);
      }
      yield* generatePermutationsHeapRecursive2(array, k - 1);
    }
  }
}

/**
 * @param {Array<any>} array
 * @param {number} k
 */
function* generatePermutationsHeapRecursive1(array, k = array.length) {
  if (k === 1) {
    yield array.slice();
  } else {
    for (let i = 0; i < k; ++i) {
      yield* generatePermutationsHeapRecursive1(array, k - 1);
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
