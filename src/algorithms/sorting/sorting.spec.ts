import { expect } from "chai";

import * as _ from "lodash";

import { insertionSort } from "./insertion-sort";
import { quickSort3WayAlgs4 } from "./quick-sort-3way.algs4";
import { quickSortAlgs4 } from "./quick-sort.algs4";
import { quickSortWikipedia } from "./quick-sort.wikipedia";

const FUNCTIONS_TO_TEST = [insertionSort, quickSort3WayAlgs4, quickSortAlgs4, quickSortWikipedia];

const MAX_NUM_ELEMENTS = 100;

describe("sorting", () => {
  for (const func of FUNCTIONS_TO_TEST) {
    describe(`${func.name}`, () => {
      expectItToSortAnArray(() => _.random(Number.MAX_SAFE_INTEGER), func, "integers");
      expectItToSortAnArray(() => Math.random(), func, "numbers");
      expectItToSortAnArray(() => Math.random().toString(), func, "strings");
      expectItToSortAnArray(() => Math.random() > 0.5, func, "booleans");
    });
  }
});

function expectItToSortAnArray(iteratee, sortFunction, elementDescription) {
  it(`should sort an array of ${elementDescription}`, () => {
    for (let numElements = 0; numElements < MAX_NUM_ELEMENTS; ++numElements) {
      const array = [];
      for (let i = 0; i < numElements; ++i) {
        array.push(iteratee());
      }
      const actual = sortFunction([...array]);
      const expected =
        typeof array[0] === "number" ? [...array].sort((a, b) => a - b) : [...array].sort();
      expect(actual).to.deep.equal(expected);
    }
  });
}
