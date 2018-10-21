import { expect } from "chai";

import { indexOf } from "./binary-search";

describe("binarySearch", () => {
  describe("indexOf", () => {
    it("should be a function", () => {
      expect(indexOf).to.be.a("function");
    });
    it("should return the correct index of elements in a sorted array", () => {
      const MAX_NUM_ELEMENTS = 10;
      const array = [];
      for (let i = 0; i < MAX_NUM_ELEMENTS; ++i) {
        const elementToPush = 2 * i;
        array.push(elementToPush);
        for (let j = 0; j < array.length; ++j) {
          expect(indexOf(array, array[j])).to.equal(j);
        }
      }
    });
    it("should return -1 for elements that are not in the given array", () => {
      const MAX_NUM_ELEMENTS = 10;
      const array = [];
      for (let i = 0; i < MAX_NUM_ELEMENTS; ++i) {
        const elementToPush = 2 * i;
        array.push(elementToPush);
        for (let j = 0; j < array.length; ++j) {
          expect(indexOf(array, array[j] - 1)).to.equal(-1);
        }
      }
    });
  });
});
