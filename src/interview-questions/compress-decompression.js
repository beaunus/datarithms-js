/**
 * @param {string} string
 * @return {string}
 */
function decompressString(string) {
  const result = [];
  for (let i = 0; i < string.length; ++i) {
    const char = string[i];
    if (char >= "0" && char <= "9") {
      const indexOfOpeningBrace = i + string.slice(i).indexOf("[");
      const numRepetitions = Number(string.slice(i, indexOfOpeningBrace));
      let numOpeningBracesToBeClosed = 1;
      i = indexOfOpeningBrace + 1;
      while (numOpeningBracesToBeClosed > 0) {
        if (string[i] === "[") ++numOpeningBracesToBeClosed;
        else if (string[i] === "]") --numOpeningBracesToBeClosed;
        ++i;
      }
      const smallerInput = string.slice(indexOfOpeningBrace + 1, i - 1);
      const smallerOutput = decompressString(smallerInput);
      result.push(smallerOutput.repeat(numRepetitions));
      --i;
    } else result.push(char);
  }
  return result.join("");
}

export { decompressString };
