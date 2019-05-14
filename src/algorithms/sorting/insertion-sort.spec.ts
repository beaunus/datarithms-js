import { expect } from "chai";

import { sort } from "./insertion-sort";

describe("insertionSort", () => {
  describe("sort", () => {
    it("should sort an array of numbers", () => {
      const MAX_NUM_ELEMENTS = 10;
      for (let numElements = 0; numElements < MAX_NUM_ELEMENTS; ++numElements) {
        const array = [];
        for (let i = 0; i < numElements; ++i) {
          array.push(Math.random());
        }

        const arrayCopy = Array.from(array);
        expect(sort(array)).to.deep.equal(arrayCopy.sort());
      }
    });

    it("should sort an array of strings", () => {
      const MAX_NUM_ELEMENTS = 10;
      for (let numElements = 0; numElements < MAX_NUM_ELEMENTS; ++numElements) {
        const array = [];
        for (let i = 0; i < numElements; ++i) {
          array.push(`${Math.random()}`);
        }

        const arrayCopy = Array.from(array);
        expect(sort(array)).to.deep.equal(arrayCopy.sort());
      }
    });
  });
});
