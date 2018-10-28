/**
 * Sort the given array in-place using insertion sort and return the sorted array.
 * @param {Array} array
 */
function sort(array) {
  for (let i = 1; i < array.length; ++i) {
    let x = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > x) {
      array[j + 1] = array[j];
      --j;
    }
    array[j + 1] = x;
  }
  return array;
}

export { sort };
