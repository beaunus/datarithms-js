import { shuffle } from "../knuth-shuffle";

/**
 * Sort the given array in-place using quick sort and return the sorted array.
 * @param {Array} array
 */
function quickSortWikipedia(array) {
  shuffle(array);
  quickSortHelper(array, 0, array.length - 1);
  return array;
}

function quickSortHelper(array, lo, hi) {
  if (lo < hi) {
    const p = _partition(array, lo, hi);
    quickSortHelper(array, lo, p - 1);
    quickSortHelper(array, p + 1, hi);
  }
}

function _partition(array, lo, hi) {
  const pivot = array[hi];
  let i = lo;
  for (let j = lo; j < hi; ++j) {
    if (array[j] < pivot) {
      _swap(array, i, j);
      ++i;
    }
  }
  _swap(array, i, hi);
  return i;
}

function _swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export { quickSortWikipedia };
