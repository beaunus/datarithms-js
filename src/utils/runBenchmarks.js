import * as Benchmark from "benchmark";
import * as chalk from "chalk";
import * as _ from "lodash";

/**
 * @param {Array<Function>} functionsToTest
 * @param {Array<Function>} inputGenerators
 */
function runBenchmarks(functionsToTest, inputGenerators) {
  let hue = _.random(0, 256);
  for (const inputGenerator of inputGenerators) {
    const suite = new Benchmark.Suite(inputGenerator.name);
    for (const functionToTest of functionsToTest) {
      const { name } = functionToTest;
      const fn = () => functionToTest(inputGenerator());
      const options = { maxTime: 0.1 };
      suite.add(name, fn, options);
    }
    const color = chalk.default.hsl(hue % 255, 100, 80);
    const result = {};
    suite
      .on("cycle", event => {
        result[event.target.name] = event.target.hz;
      })
      .on("complete", event => {
        const resultEntries = Object.entries(result).map(([name, hz]) => ({
          name,
          hz: Math.floor(hz)
        }));
        resultEntries.sort((a, b) => b.hz - a.hz);
        console.table(resultEntries);
      })
      .on("start", event => {
        console.log();
        if (event.currentTarget.name)
          console.log(color(event.currentTarget.name));
      })
      .run({ async: false });
    hue += 100;
  }
}

export { runBenchmarks };
