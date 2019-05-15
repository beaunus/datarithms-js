/* tslint:disable:no-unused-expression */

import * as Benchmark from "benchmark";
import * as _ from "lodash";

import { insertionSort } from "./insertion-sort";
import { quickSortAlgs4 } from "./quick-sort.algs4";
import { quickSortWikipedia } from "./quick-sort.wikipedia";

Benchmark.op;
const suite = new Benchmark.Suite();

const NUM_ELEMENTS = 1000;
const unshuffledArray = _.range(NUM_ELEMENTS);

const builtIn = array => array.sort();
const FUNCTIONS_TO_TEST = [builtIn, insertionSort, quickSortAlgs4, quickSortWikipedia];

for (const func of FUNCTIONS_TO_TEST) {
  suite.add(`${func.name}`, () => {
    const array = _.shuffle(unshuffledArray);
    func(array);
  });
}

suite
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
