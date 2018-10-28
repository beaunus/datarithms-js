import { expect } from "chai";
import _ from "lodash";

import { combinations, range, xrange } from "./itertools";

describe.only("itertools", () => {
  describe("combinations", () => {
    it("should return an array with a single empty array if the length is 0", () => {
      const MAX_ARRAY_SIZE = 5;
      for (let i in xrange(MAX_ARRAY_SIZE + 1)) {
        const array = range(i);
        const allCombinations = combinations(array, 0);

        const actual = [];
        for (let combination of allCombinations) {
          actual.push(combination);
        }

        expect(actual.sort()).to.deep.equal([[]].sort());
      }
    });

    it("should return an array containing all single element arrays if the length is 1", () => {
      const MAX_ARRAY_SIZE = 5;
      for (let i in xrange(MAX_ARRAY_SIZE + 1)) {
        const array = range(i);
        const allCombinations = combinations(array, 1);

        const actual = [];
        for (let combination of allCombinations) {
          actual.push(combination);
        }

        const expected = [];
        for (let j of xrange(i)) {
          expected.push([j]);
        }

        expect(actual.sort()).to.deep.equal(expected.sort());
      }
    });

    it("should return the correct result if the input is small", () => {
      const actual = [];
      for (let combination of combinations([1, 2, 3], 2)) {
        actual.push(combination);
      }

      const expected = [[1, 2], [1, 3], [2, 3]];

      expect(actual.sort()).to.deep.equal(expected.sort());
    });
  });
});
