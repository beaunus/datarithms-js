/* eslint-disable require-jsdoc*/

function quickSortMemory(array) {
  array.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return array;
}

export { quickSortMemory };
