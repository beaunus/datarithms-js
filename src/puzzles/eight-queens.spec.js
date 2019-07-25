import {
  countSolutionsBacktracking,
  countSolutionsBruteForce,
} from "./eight-queens";
import { expect } from "chai";

describe.only("eight-queens", () => {
  const solutions = [
    1,
    1,
    0,
    0,
    2,
    10,
    4,
    40,
    92,
    352,
    724,
    2680,
    14200,
    73712,
    365596,
    2279184,
    14772512,
    95815104,
    666090624,
    4968057848,
    39029188884,
    314666222712,
    2691008701644,
    24233937684440,
    227514171973736,
    2207893435808352,
    22317699616364044,
    234907967154122528,
  ];
  describe("countSolutionsBruteForce", () => {
    it("should return the correct answer", () => {
      for (let i = 0; i < 9; ++i) {
        const actual = countSolutionsBruteForce(i);
        expect(actual).to.equal(solutions[i]);
      }
    });
  });

  describe("countSolutionsBacktracking", () => {
    it("should return the correct answer", () => {
      for (let i = 0; i < 11; ++i) {
        const actual = countSolutionsBacktracking(i);
        expect(actual).to.equal(solutions[i]);
      }
    });
  });
});
