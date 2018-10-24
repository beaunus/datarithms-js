function getAllCombinations(array, length, start = 0) {
  if (length === 0) {
    return [[]];
  }
  const result = [];
  for (let i = start; i < array.length - length + 1; ++i) {
    const smallerCombinations = getAllCombinations(array, length - 1, i + 1);
    for (let comb of smallerCombinations) {
      comb.unshift(array[i]);
      result.push(comb);
    }
  }
  return result;
}

export { getAllCombinations };
