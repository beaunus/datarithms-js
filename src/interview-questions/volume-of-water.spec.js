import { expect } from "chai";

import { volumeOfWater } from "./volume-of-water";

describe("volume-of-water", () => {
  it("should return the correct result", () => {
    const expectedResults = new Map([
      [[], 0],
      [[1], 0],
      [[1, 3], 0],
      [[1, 3, 2], 0],
      [[1, 3, 2, 4], 1],
      [[1, 3, 2, 4, 1], 1],
      [[1, 3, 2, 4, 1, 3], 3],
      [[1, 3, 2, 4, 1, 3, 1], 3],
      [[1, 3, 2, 4, 1, 3, 1, 4], 8],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5], 8],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5, 2], 8],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2], 8],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1], 8],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 4], 15],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 4, 2], 15],
      [[1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 4, 2, 2], 15],
    ]);

    expectedResults.forEach((expected, input) => {
      const actual = volumeOfWater(input);
      try {
        expect(actual).to.equal(expected);
      } catch (error) {
        console.dir({ input });
        throw error;
      }
    });
  });
});
