import * as _ from "lodash";
import { expect } from "chai";

import {
  generatePermutationsHeapIter,
  generatePermutationsHeapRecursive1,
  generatePermutationsHeapRecursive2
} from "./permutations.heaps";

const FUNCTIONS_TO_TEST = [
  generatePermutationsHeapIter,
  generatePermutationsHeapRecursive1,
  generatePermutationsHeapRecursive2
];

describe("permutations", () => {
  for (const fn of FUNCTIONS_TO_TEST) {
    describe("generatePermutationsHeap", () => {
      it("should generate the correct results if the array has 1 element", () => {
        const array = [1];
        const actual = [...fn({ array })];
        const expected = [[1]];
        expect(actual).to.have.deep.members(expected);
      });

      it("should generate the correct results if the array has 2 elements", () => {
        const array = [1, 2];
        const actual = [...fn({ array })];
        const expected = [[1, 2], [2, 1]];
        expect(actual).to.have.deep.members(expected);
      });

      it("should generate the correct results if k is 3", () => {
        const array = [1, 2, 3];
        const actual = [...fn({ array })];
        const expected = [
          [1, 2, 3],
          [1, 3, 2],
          [2, 1, 3],
          [2, 3, 1],
          [3, 1, 2],
          [3, 2, 1]
        ];
        expect(actual).to.have.deep.members(expected);
      });

      it("should log the trace", () => {
        [...fn({ array: _.range(3), SHOULD_DISPLAY_SWAPS: true })];
      });
    });
  }
});
