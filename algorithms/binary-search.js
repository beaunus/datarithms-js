/**
 * @param {Array} array
 * @param {Number} element
 */
function indexOf(array, element, start = 0, end = array.length) {
  if (start >= end) {
    return -1;
  }
  const indexToExamine = Math.floor((start + end) / 2);
  if (array[indexToExamine] < element) {
    return indexOf(array, element, indexToExamine + 1, end);
  }
  if (array[indexToExamine] > element) {
    return indexOf(array, element, start, indexToExamine);
  }
  return indexToExamine;
}

export { indexOf };
