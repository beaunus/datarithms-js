import { expect } from "chai";

import { bruteForce, quadratic } from "./three-sum";

describe("three-sum", () => {
  describe("bruteForce", () => {
    it("should be a function", () => {
      expect(bruteForce).to.be.a("function");
    });
    it("should return 1 when the array is super simple", () => {
      const array = [1, -1, 0];
      expect(bruteForce(array)).to.equal(1);
    });
  });
  describe("quadratic", () => {
    it("should return the same answer as bruteForce", () => {
      const MAX_LENGTH = 100;

      for (let length = 3; length <= MAX_LENGTH; ++length) {
        const elements = new Set();
        while (elements.size < length) {
          let element = Math.floor(Math.random() * length);
          if (Math.random() > 0.5) {
            element *= -1;
          }
          elements.add(element);
        }
        const arrayNoDupes = Array.from(elements);
        const quadraticSolution = quadratic(arrayNoDupes);
        const bruteForceSolution = bruteForce(arrayNoDupes);
        expect(quadraticSolution).to.equal(bruteForceSolution);
      }
    });
  });
});
