/**
 * @param {Array} array
 * @return {Array}
 */
function insertionSortMemory(array) {
  array.sort((a, b) => a - b);
  return array;
}

export { insertionSortMemory };
