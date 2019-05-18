/* tslint:disable:no-unused-expression */

import * as Benchmark from "benchmark";
import * as chalk from "chalk";
import * as _ from "lodash";

import { insertionSort } from "./insertion-sort";
import { quickSortAlgs4 } from "./quick-sort.algs4";
import { quickSortWikipedia } from "./quick-sort.wikipedia";

const NUM_ELEMENTS = 1000;
const element = Math.random();
const arrayOfIdenticalNumbers = _.times(NUM_ELEMENTS, () => element);
const sortedArrayOfIntegers = _.range(NUM_ELEMENTS);
const sortedArrayOfStrings = _.cloneDeep(sortedArrayOfIntegers).map(x => `${x}`);

const builtIn = array => array.sort();
const FUNCTIONS_TO_TEST = [builtIn, insertionSort, quickSortAlgs4, quickSortWikipedia];

const typesOfInput = {
  arrayOfIdenticalNumbers: () => arrayOfIdenticalNumbers,
  shuffledArrayOfIntegers: () => _.shuffle(sortedArrayOfIntegers),
  shuffledArrayOfStrings: () => _.shuffle(sortedArrayOfStrings),
  sortedArrayOfIntegers: () => _.cloneDeep(sortedArrayOfIntegers),
  sortedArrayOfStrings: () => _.cloneDeep(sortedArrayOfStrings),
};

let hue = 0;

for (const [name, functionToGenerateInput] of Object.entries(typesOfInput)) {
  const suite = new Benchmark.Suite(name);
  for (const functionToTest of FUNCTIONS_TO_TEST) {
    suite.add(`${functionToTest.name}`, () => functionToTest(functionToGenerateInput()), {
      maxTime: 0.1,
    });
  }

  const result = {};

  suite
    .on("cycle", event => {
      const [functionName, resultDetails] = String(event.target).split(" x ");
      result[functionName] = resultDetails;
    })
    .on("complete", function(event) {
      console.log(
        chalk.default.hsv(hue % 255, 100, 100)("Fastest is " + this.filter("fastest").map("name")),
      );
      console.table(result);
      console.log(
        chalk.default.hsv(hue % 255, 100, 100)(
          "--------------------------------------------------------------------------------",
        ),
      );
    })
    .on("start", function() {
      console.log(chalk.default.hsv(hue % 255, 100, 100)(this.name));
    })
    .run({ async: false });
  hue += 100;
}
