import { shuffle } from "../knuth-shuffle";

/**
 * @param {Array<any>} a
 * @return {Array<any>}
 */
function quickSortAlgs4(a) {
  shuffle(a);
  sort(a, 0, a.length - 1);
  return a;
}

/**
 * @param {Array<any>} a
 * @param {number} lo
 * @param {number} hi
 */
function sort(a, lo, hi) {
  if (hi <= lo) {
    return;
  }
  const j = partition(a, lo, hi);
  sort(a, lo, j - 1);
  sort(a, j + 1, hi);
}

/**
 * @param {Array<any>} a
 * @param {number} lo
 * @param {number} hi
 * @return {number}
 */
function partition(a, lo, hi) {
  let i = lo;
  let j = hi + 1;
  const v = a[lo];
  while (true) {
    while (a[++i] < v) {
      if (i === hi) {
        break;
      }
    }

    while (v < a[--j]) {
      if (j === lo) {
        break;
      }
    }

    if (i >= j) {
      break;
    }

    exch(a, i, j);
  }

  exch(a, lo, j);

  return j;
}

/**
 * @param {Array<any>} array
 * @param {number} i
 * @param {number} j
 */
function exch(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export { quickSortAlgs4 };
