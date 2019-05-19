import { expect } from "chai";
import * as _ from "lodash";

import { shuffle } from "./knuth-shuffle";
import { range } from "./itertools";

describe("shuffle", () => {
  it("should be a function", () => {
    expect(shuffle).to.be.a("function");
  });
  it("should return an array with all the elements from the given array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arrayToShuffle = _.cloneDeep(array);
    const shuffledArray = shuffle(arrayToShuffle);
    for (const i of array) {
      expect(shuffledArray).to.include(i);
    }
  });
  it("should modify the given array in place", () => {
    const arrayToShuffle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = shuffle(arrayToShuffle);
    expect(shuffledArray).to.deep.equal(arrayToShuffle);
  });
  it("should return all possible sequences with equal probability", () => {
    const NUM_ELEMENTS = 10;
    const NUM_TRIALS = 100;
    const elementCounts = [];

    for (let i = 0; i < NUM_ELEMENTS; ++i) {
      elementCounts[i] = [];
      for (let j = 0; j < NUM_ELEMENTS; ++j) {
        elementCounts[i][j] = 0;
      }
    }

    for (let i = 0; i < NUM_TRIALS; ++i) {
      const arrayToShuffle = range(NUM_ELEMENTS);
      shuffle(arrayToShuffle);
      for (const j of arrayToShuffle) {
        const element = arrayToShuffle[j];
        ++elementCounts[element][j];
      }
    }

    const expectedValue = NUM_TRIALS / NUM_ELEMENTS;
    let globalMaxVariance = 0;
    for (const positions of elementCounts) {
      const maximumVariance = getMaximumVariance(positions, expectedValue);
      globalMaxVariance = Math.max(maximumVariance, globalMaxVariance);
    }

    // console.log({ elementCounts });
    // TODO: How to test for randomness?
  });
});


/**
 * @param {Array} array 
 * @param {number} expectedValue 
 * @return {number}
 */
function getMaximumVariance(array, expectedValue) {
  let result = 0;
  for (const i of array) {
    const variance = Math.abs(expectedValue - i);
    result = Math.max(variance, result);
  }
  return result;
}
