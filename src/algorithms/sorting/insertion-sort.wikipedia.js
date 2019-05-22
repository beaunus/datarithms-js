/**
 * @param {Array} array
 * @return {Array}
 */
function insertionSortWikipedia(array) {
  for (let i = 1; i < array.length; ++i) {
    for (let j = i; j > 0 && array[j] < array[j - 1]; --j) {
      const temp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = temp;
    }
  }
  return array;
}

export { insertionSortWikipedia };
