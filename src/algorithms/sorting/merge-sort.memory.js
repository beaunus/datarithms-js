/**
 * @param {Array<any>} array
 * @return {Array<any>}
 */
function mergeSortMemory(array) {
  // sortRecursive(array, [], 0, array.length - 1);
  sortIterative(array);
  return array;
}

/**
 * @param {Array<any>} array
 * @param {Array<any>} aux
 * @param {number} lo
 * @param {number} hi
 */
// eslint-disable-next-line
function sortRecursive(array, aux, lo, hi) {
  if (lo >= hi) {
    return;
  }
  const mid = Math.floor((lo + hi) / 2);
  sortRecursive(array, aux, lo, mid);
  sortRecursive(array, aux, mid + 1, hi);
  merge(array, aux, lo, mid, hi);
}

/**
 * @param {Array<any>} array
 */
function sortIterative(array) {
  const aux = [];
  for (let size = 1; size < array.length; size = size + size) {
    for (let lo = 0; lo < array.length - size; lo += size + size) {
      merge(array, aux, lo, lo + size - 1, Math.min(lo + size + size - 1, array.length - 1));
    }
  }
}

/**
 * @param {Array<any>} array
 * @param {Array<any>} aux
 * @param {number} lo
 * @param {number} mid
 * @param {number} hi
 */
function merge(array, aux = [], lo, mid, hi) {
  for (let i = lo; i <= hi; ++i) {
    aux[i] = array[i];
  }
  let i = lo;
  let j = mid + 1;
  for (let k = lo; k <= hi; ++k) {
    if (i > mid) {
      array[k] = aux[j++];
    } else if (j > hi) {
      array[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      array[k] = aux[j++];
    } else {
      array[k] = aux[i++];
    }
  }
}

export { mergeSortMemory };
