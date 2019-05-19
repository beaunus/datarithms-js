import { shuffle } from "../knuth-shuffle";

/**
 * @param {Array<any>} array
 * @return {Array<any>}
 */
function quickSortMemory(array) {
  shuffle(array);
  sort(array, 0, array.length - 1);
  return array;
}

/**
 * @param {Array<any>} array
 * @param {number} lo
 * @param {number} hi
 */
function sort(array, lo, hi) {
  if (hi <= lo) return;

  let lt = lo;
  let gt = hi;
  const pivot = array[lo];
  let i = lo + 1;

  while (i <= gt) {
    const current = array[i];
    if (current < pivot) swap(array, lt++, i++);
    else if (current > pivot) swap(array, i, gt--);
    else ++i;
  }

  sort(array, lo, lt - 1);
  sort(array, gt + 1, hi);
}

export { quickSortMemory };
