/**
 * @param {Array<number>} array
 * @return {number}
 */
function volumeOfWater(array) {
  let maxLeft = 0;
  let maxRight = 0;
  let i = 0;
  let j = array.length - 1;

  let result = 0;

  while (i < j) {
    if (array[i] < array[j]) {
      array[i] >= maxLeft
        ? (maxLeft = array[i])
        : (result += maxLeft - array[i]);
      ++i;
    } else {
      array[j] >= maxRight
        ? (maxRight = array[j])
        : (result += maxRight - array[j]);
      --j;
    }
  }

  return result;
}

/**
 * @param {Array<number>} array
 * @return {number}
 */
function volumeOfWaterOrig(array) {
  if (!array.length) return 0;

  const leftToRight = new Array(array.length);
  leftToRight[0] = [array[0]];
  for (let i = 1; i < array.length; ++i)
    leftToRight[i] = Math.max(leftToRight[i - 1], array[i]);

  const rightToLeft = new Array(array.length);
  rightToLeft[array.length - 1] = [array[array.length - 1]];
  for (let i = array.length - 2; i >= 0; --i)
    rightToLeft[i] = Math.max(rightToLeft[i + 1], array[i]);

  return array.reduce(
    (acc, cur, i) => acc + Math.min(leftToRight[i], rightToLeft[i]) - cur,
    0
  );
}

export { volumeOfWater, volumeOfWaterOrig };
