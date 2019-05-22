import { shuffle } from "../knuth-shuffle";
import { swap } from "../swap/swap";

/**
 * @param {Array} array
 * @return {Array}
 */
function quickSortWikipedia(array) {
  shuffle(array);
  quickSortHelper(array, 0, array.length - 1);
  return array;
}

/**
 *
 * @param {Array} array
 * @param {number} lo
 * @param {number} hi
 */
function quickSortHelper(array, lo, hi) {
  if (lo < hi) {
    const p = partition(array, lo, hi);
    quickSortHelper(array, lo, p - 1);
    quickSortHelper(array, p + 1, hi);
  }
}

/**
 *
 * @param {Array} array
 * @param {number} lo
 * @param {number} hi
 * @return {number}
 */
function partition(array, lo, hi) {
  const pivot = array[hi];
  let i = lo;
  for (let j = lo; j < hi; ++j) {
    if (array[j] < pivot) {
      swap(array, i, j);
      ++i;
    }
  }
  swap(array, i, hi);
  return i;
}

export { quickSortWikipedia };
