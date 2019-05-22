/**
 * @param {Array<any>} array
 * @return {Array<any>}
 */
function mergeSortMemory(array) {
  array.sort((a, b) => a - b);
  return array;
}

export { mergeSortMemory };
