import { expect } from "chai";
import { v4 } from "uuid";

import { insertionSortMemory } from "./insertion-sort.memory";
import { insertionSortWikipedia } from "./insertion-sort.wikipedia";
import { mergeSortAlgs4 } from "./merge-sort.algs4";
import { mergeSortMemory } from "./merge-sort.memory";
import { quickSort3WayAlgs4 } from "./quick-sort-3way.algs4";
import { quickSortAlgs4 } from "./quick-sort.algs4";
import { quickSortMemory } from "./quick-sort.memory";
import { quickSortWikipedia } from "./quick-sort.wikipedia";

const FUNCTIONS_TO_TEST = [
  insertionSortMemory,
  insertionSortWikipedia,
  mergeSortAlgs4,
  mergeSortMemory,
  quickSort3WayAlgs4,
  quickSortAlgs4,
  quickSortMemory,
  quickSortWikipedia
];

const MAX_NUM_ELEMENTS = 100;

describe("sorting", () => {
  for (const func of FUNCTIONS_TO_TEST) {
    describe(`${func.name}`, () => {
      expectItToSortAnArray(() => Math.random(), func, "random numbers");
      expectItToSortAnArray(() => v4(), func, "random strings");
      expectItToSortAnArray(() => Math.random() > 0.5, func, "random booleans");
      expectItToSortAnArray(() => 1, func, "identical numbers");
      expectItToSortAnArray(() => "1", func, "random strings");
      expectItToSortAnArray(() => true, func, "random booleans");
    });
  }
});

/**
 *
 * @param {Function} elementCreator
 * @param {Function} sortFunction
 * @param {string} elementDescription
 */
function expectItToSortAnArray(
  elementCreator,
  sortFunction,
  elementDescription
) {
  it(`should sort an array of ${elementDescription}`, () => {
    for (let numElements = 0; numElements < MAX_NUM_ELEMENTS; ++numElements) {
      const array = [];
      for (let i = 0; i < numElements; ++i) {
        array.push(elementCreator());
      }
      const actual = sortFunction([...array]);
      const expected =
        typeof array[0] === "number"
          ? [...array].sort((a, b) => a - b)
          : [...array].sort();
      expect(actual).to.deep.equal(expected);
    }
  });
}
