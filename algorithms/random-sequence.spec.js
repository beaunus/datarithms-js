import { expect } from "chai";

import { randomSequence } from "./random-sequence";

describe("randomSequence", () => {
  it("should be a function", () => {
    expect(randomSequence).to.be.a("function");
  });
  it("should return single element arrays with uniform randomness", () => {
    const NUM_TRIALS = 10000;
    const LO = 0;
    const HI = 10;

    const appearanceCounts = initializeAppearanceCounts(LO, HI);

    for (let i = 0; i < NUM_TRIALS; ++i) {
      const singleElementResult = randomSequence(LO, HI, 1);
      const roundedDown = Math.floor(singleElementResult[0]);
      ++appearanceCounts[roundedDown];
    }

    const targetCount = NUM_TRIALS / (HI - LO);
    let maxVariance = getMaxVariance(appearanceCounts, targetCount);

    const maxAllowedVariance = NUM_TRIALS / 100;
    expect(maxVariance).to.be.lessThan(maxAllowedVariance);
  });
  it("should return a big array with uniform randomness", () => {
    const LENGTH = 10000;
    const LO = 0;
    const HI = 10;

    const appearanceCounts = initializeAppearanceCounts(LO, HI);

    const sequence = randomSequence(LO, HI, LENGTH);

    for (let i of sequence) {
      const roundedDown = Math.floor(i);
      ++appearanceCounts[roundedDown];
    }

    const targetCount = LENGTH / (HI - LO);
    let maxVariance = getMaxVariance(appearanceCounts, targetCount);

    const maxAllowedVariance = LENGTH / 100;
    expect(maxVariance).to.be.lessThan(maxAllowedVariance);
  });
});

function initializeAppearanceCounts(lo, hi) {
  const appearanceCounts = {};
  for (let i = lo; i < hi; ++i) {
    appearanceCounts[i] = 0;
  }
  return appearanceCounts;
}

function getMaxVariance(appearanceCounts, targetCount) {
  let maxVariance = 0;
  for (let i in appearanceCounts) {
    const thisVariance = Math.abs(targetCount - appearanceCounts[i]);
    maxVariance = Math.max(maxVariance, thisVariance);
  }
  return maxVariance;
}
