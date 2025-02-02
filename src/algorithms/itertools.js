/**
 * Iterate over all combinations of the given length from the given array.
 * @param {Array} array
 * @param {number} length
 * @yields {Array}
 */
function* combinations(array, length) {
  if (!length) {
    yield [];
  } else {
    for (const i of xrange(length - 1, array.length)) {
      for (const cl of combinations(array.slice(0, i), length - 1)) {
        yield cl.concat(array[i]);
      }
    }
  }
}

/**
 * Iterate over all permutations of the given length from the given array.
 * @param {Array} array
 * @param {number} length
 * @yields {Array}
 */
function* permutations(array, length) {
  if (!length) {
    yield [];
  } else {
    for (let i = 0; i < array.length; ++i) {
      const elementToInject = array[i];
      const others = array.slice(i + 1);
      for (const smallerPermutation of permutations(others, length - 1)) {
        for (let j = 0; j <= smallerPermutation.length; ++j) {
          const copy = Array.from(smallerPermutation);
          copy.splice(j, 0, elementToInject);
          yield copy;
        }
      }
    }
  }
}

/**
 * Iterate over all numbers (incrementing by the given step),
 * between the given start (inclusive) and end (exclusive).
 * @param {number} start
 * @param {number} end
 * @param {number} step
 */
function* xrange(start, end, step = 1) {
  if (!end) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

/**
 * Return an array with all numbers (incrementing by the given step),
 * between the given start (inclusive) and end (exclusive).
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @return {Array<number>}
 */
function range(start, end = null, step = 1) {
  const result = [];
  for (const i of xrange(start, end, step)) {
    result.push(i);
  }
  return result;
}

export { combinations, permutations, range, xrange };
