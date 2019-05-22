import { expect } from "chai";

import {
  generatePermutationsHeapIter,
  generatePermutationsHeapRecursive1,
  generatePermutationsHeapRecursive2
} from "./permutations";

const FUNCTIONS_TO_TEST = [
  generatePermutationsHeapIter,
  generatePermutationsHeapRecursive1,
  generatePermutationsHeapRecursive2
];

describe("permutations", () => {
  for (const fn of FUNCTIONS_TO_TEST) {
    describe("generatePermutationsHeap", () => {
      it("should generate the correct results if the array has 1 element", () => {
        const input = [1];
        const actual = [...fn(input)];
        const expected = [[1]];
        expect(actual).to.have.deep.members(expected);
      });

      it("should generate the correct results if the array has 2 elements", () => {
        const input = [1, 2];
        const actual = [...fn(input)];
        const expected = [[1, 2], [2, 1]];
        expect(actual).to.have.deep.members(expected);
      });

      it("should generate the correct results if k is 3", () => {
        const input = [1, 2, 3];
        const actual = [...fn(input)];
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
    });
  }
});
