/**
 * @param {Array<any>} array
 * @return {Array<any>}
 */
function shuffle(array) {
  for (let i = 0; i < array.length; ++i) {
    const rangeOfRemainingElements = array.length - i;
    const indexToSwapWith = Math.floor(
      rangeOfRemainingElements * Math.random() + i
    );
    const temp = array[i];
    array[i] = array[indexToSwapWith];
    array[indexToSwapWith] = temp;
  }
  return array;
}

export { shuffle };
