function randomSequence(lo, hi, n) {
  const result = [];
  const range = hi - lo;
  for (let i = 0; i < n; ++i) {
    const randomNumber = range * Math.random() + lo;
    result.push(randomNumber);
  }
  return result;
}

export { randomSequence };
