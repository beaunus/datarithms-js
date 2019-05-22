/* tslint:disable:no-unused-expression */

import { runBenchmarks } from "../../utils/runBenchmarks";

const array = [1, 2];

const tempVariable = () => {
  const temp = array[0];
  array[0] = array[1];
  array[1] = temp;
};

const destructuring = () => {
  [array[0], array[1]] = [array[1], array[0]];
};

const xor = () => {
  array[0] = array[1] ^ array[0];
  array[1] = array[1] ^ array[0];
  array[0] = array[1] ^ array[0];
};

const FUNCTIONS_TO_TEST = [tempVariable, destructuring, xor];

const INPUT_GENERATORS = [() => array];

runBenchmarks(FUNCTIONS_TO_TEST, INPUT_GENERATORS);
