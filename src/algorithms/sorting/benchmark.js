/* tslint:disable:no-unused-expression */

import * as _ from "lodash";

import { runBenchmarks } from "../../utils/runBenchmarks";

import { insertionSortMemory } from "./insertion-sort.memory";
import { insertionSortWikipedia } from "./insertion-sort.wikipedia";
import { mergeSortAlgs4 } from "./merge-sort.algs4";
import { mergeSortMemory } from "./merge-sort.memory";
import { quickSort3WayAlgs4 } from "./quick-sort-3way.algs4";
import { quickSortAlgs4 } from "./quick-sort.algs4";
import { quickSortMemory } from "./quick-sort.memory";
import { quickSortWikipedia } from "./quick-sort.wikipedia";

const builtIn = array => array.sort();

const FUNCTIONS_TO_TEST = [
  builtIn,
  insertionSortMemory,
  insertionSortWikipedia,
  mergeSortAlgs4,
  mergeSortMemory,
  quickSort3WayAlgs4,
  quickSortAlgs4,
  quickSortMemory,
  quickSortWikipedia,
];

const INPUT_SIZE = 10000;
const element = Math.random();
const arrayOfIdenticalNumbers = _.times(INPUT_SIZE, () => element);
const sortedArrayOfIntegers = _.range(INPUT_SIZE);
const sortedArrayOfStrings = _.cloneDeep(sortedArrayOfIntegers).map(x => `${x}`);

const generateArrayOfIdenticalNumbers = () => arrayOfIdenticalNumbers;
const generateShuffledArrayOfIntegers = () => _.shuffle(sortedArrayOfIntegers);
const generateShuffledArrayOfStrings = () => _.shuffle(sortedArrayOfStrings);
const generateSortedArrayOfIntegers = () => _.cloneDeep(sortedArrayOfIntegers);
const generateSortedArrayOfStrings = () => _.cloneDeep(sortedArrayOfStrings);

const INPUT_GENERATORS = [
  generateArrayOfIdenticalNumbers,
  generateShuffledArrayOfIntegers,
  generateShuffledArrayOfStrings,
  generateSortedArrayOfIntegers,
  generateSortedArrayOfStrings,
];

runBenchmarks(FUNCTIONS_TO_TEST, INPUT_GENERATORS);
