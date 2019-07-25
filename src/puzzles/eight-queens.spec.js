import { countSolutionsBruteForce } from "./eight-queens";
import { expect } from "chai";

describe("eight-queens", () => {
  const solutions = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352];
  describe("countSolutionsBruteForce", () => {
    it("should return the correct answer", () => {
      for (let i = 1; i < solutions.length; ++i) {
        const actual = countSolutionsBruteForce(i);
        expect(actual).to.equal(solutions[i]);
      }
    });
  });
});
