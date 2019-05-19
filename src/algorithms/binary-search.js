/**
 * @param {Array} array
 * @param {Number} element
 */
function indexOf(array, element) {
  let lo = 0;
  let hi = array.length - 1;
  while (lo <= hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);
    if (element < array[mid]) {
      hi = mid - 1;
    } else if (element > array[mid]) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

export { indexOf };
