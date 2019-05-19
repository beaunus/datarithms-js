import { indexOf } from "./binary-search";

/**
 * @param {Array} array
 * @return {number}
 */
function bruteForce(array) {
  let count = 0;
  for (let i = 0; i < array.length; ++i) {
    for (let j = i + 1; j < array.length; ++j) {
      for (let k = j + 1; k < array.length; ++k) {
        if (array[i] + array[j] + array[k] === 0) {
          ++count;
        }
      }
    }
  }
  return count;
}

/**
 * @param {Array} array
 * @return {number}
 */
function quadratic(array) {
  array.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const k = indexOf(array, -(array[i] + array[j]));
      if (k > j) { ++count; }
    }
  }
  return count;
}

export { bruteForce, quadratic };
