/**
 * Sort the given array in-place using insertion sort and return the sorted array.
 * @param {Array} array
 */
function insertionSort(array) {
  for (let i = 1; i < array.length; ++i) {
    for (let j = i; j > 0 && array[j] < array[j - 1]; --j) {
      const temp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = temp;
    }
  }
  return array;
}

export { insertionSort };
