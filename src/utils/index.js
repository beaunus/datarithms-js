/**
 * @param {number} n
 * @return {number}
 */
export function factorial(n) {
  let result = 1;
  for (let i = n; i >= 2; --i) result *= i;
  return result;
}

/**
 * @param {number} numElements
 * @return {number}
 */
export function numPermutations(numElements) {
  let result = 0;
  for (let k = 0; k <= numElements; ++k)
    result += factorial(numElements) / factorial(k);
  return result;
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
export function nChooseK(n, k) {
  if (k === 0 || n === k) return 1;
  if (k > n) return 0;
  return nChooseK(n - 1, k - 1) + nChooseK(n - 1, k);
}
