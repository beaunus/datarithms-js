/**
 * @param {Array<string>} words
 * @return {boolean}
 */
function isWordSquare(words) {
  for (let i = 0; i < words.length; ++i)
    for (let j = i + 1; j < words[i].length; ++j)
      if (!words[i] || !words[j][i] || words[j][i] !== words[i][j])
        return false;
  return true;
}

/**
 * @param {Array<string>} set
 * @return {Array<Array<string>>}
 */
function getWordSquaresOld(set) {
  const result = [];
  const length = set[0].length;
  for (const perm of permutations(set, length))
    if (isWordSquare(perm)) result.push(perm);
  return result;
}

/**
 *
 * @param {array} set
 * @param {*} length
 */
function* permutations(set, length) {
  if (length === 0) {
    yield [];
    return;
  }
  for (let i = 0; i < set.length; ++i) {
    const word = set[i];
    const otherWords = [...set.slice(0, i), ...set.slice(i + 1)];
    for (const smallerPermutation of permutations(otherWords, length - 1)) {
      yield [word, ...smallerPermutation];
    }
  }
}

/**
 * @param {Array<string>} set
 * @return {Array<Array<string>>}
 */
function getWordSquares(set) {
  return getWordSquaresHelper(set[0].length, [], set);
}

/**
 *
 * @param {number} numRowsToGo
 * @param {Array<string>} wordsSoFar
 * @param {Array<string>} candidates
 * @return {Array<Array<string>>}
 */
function getWordSquaresHelper(numRowsToGo, wordsSoFar, candidates) {
  if (numRowsToGo < 1) return [wordsSoFar];

  const result = [];

  for (let i = 0; i < candidates.length; ++i) {
    if (!isEligible(candidates[i], wordsSoFar)) continue;
    const candidate = candidates[i];
    const otherCandidates = [
      ...candidates.slice(0, i),
      ...candidates.slice(i + 1),
    ];
    result.push(
      ...getWordSquaresHelper(
        numRowsToGo - 1,
        [...wordsSoFar, candidate],
        otherCandidates
      )
    );
  }
  return result;
}

/**
 *
 * @param {string} word
 * @param {ReadonlyArray<string>} wordsSoFar
 * @return {boolean}
 */
function isEligible(word, wordsSoFar) {
  for (let i = 0; i < wordsSoFar.length; ++i)
    if (!word[i] || word[i] !== wordsSoFar[i][wordsSoFar.length]) return false;
  return true;
}

export { permutations, getWordSquares, getWordSquaresOld };
