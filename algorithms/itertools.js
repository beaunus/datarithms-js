/**
 * Iterate over all combinations of the given length from the given array.
 * @param {Array} array
 * @param {Number} length
 * @returns {Array}
 */
function* combinations(array, length) {
  if (!length) {
    yield [];
  } else {
    for (let i of xrange(length - 1, array.length)) {
      for (let cl of combinations(array.slice(0, i), length - 1)) {
        yield cl.concat(array[i]);
      }
    }
  }
}

/**
 * Iterate over all numbers (incrementing by the given step),
 * between the given start (inclusive) and end (exclusive).
 * @param {Number} start
 * @param {Number} end
 * @param {Number} step
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
 * @param {Number} start
 * @param {Number} end
 * @param {Number} step
 */
function range(start, end, step = 1) {
  const result = [];
  for (let i of xrange(start, end, step)) {
    result.push(i);
  }
  return result;
}

export { combinations, range, xrange };
