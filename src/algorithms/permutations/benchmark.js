/* tslint:disable:no-unused-expression */

import { runBenchmarks } from "../../utils/runBenchmarks";

import { range } from "../../algorithms/itertools";

import {
  generatePermutationsHeapIter,
  generatePermutationsHeapRecursive1,
  generatePermutationsHeapRecursive2
} from "./permutations";

const iter = array => {
  const generator = generatePermutationsHeapIter(array);
  while (!generator.next().done) {}
};
const recursive1 = array => {
  const generator = generatePermutationsHeapRecursive1(array);
  while (!generator.next().done) {}
};
const recursive2 = array => {
  const generator = generatePermutationsHeapRecursive2(array);
  while (!generator.next().done) {}
};

const FUNCTIONS_TO_TEST = [iter, recursive1, recursive2];

const one = () => range(1);
const two = () => range(2);
const three = () => range(3);
const four = () => range(4);
const five = () => range(5);
const six = () => range(6);
const seven = () => range(7);
const eight = () => range(8);
const nine = () => range(9);
const ten = () => range(10);

const INPUT_GENERATORS = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten
];

runBenchmarks(FUNCTIONS_TO_TEST, INPUT_GENERATORS);
