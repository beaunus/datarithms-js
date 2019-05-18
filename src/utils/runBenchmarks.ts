import * as Benchmark from "benchmark";
import * as chalk from "chalk";
import * as _ from "lodash";

function runBenchmarks(functionsToTest, inputGenerators) {
  let hue = _.random(0, 256);
  for (const inputGenerator of inputGenerators) {
    const suite = new Benchmark.Suite(inputGenerator.name);
    for (const functionToTest of functionsToTest) {
      suite.add(`${functionToTest.name}`, () => functionToTest(inputGenerator()), {
        maxTime: 0.1,
      });
    }
    const color = chalk.default.hsl(hue % 255, 100, 80);
    const result = {};
    suite
      .on("cycle", event => {
        const [functionName, resultDetails] = String(event.target).split(" x ");
        result[functionName] = resultDetails;
      })
      .on("complete", () => {
        const resultEntries = Object.entries(result).map(([name, description]) => ({
          name,
          opsPerSecond: getOpsPerSecond(description),
        }));
        resultEntries.sort((a, b) => b.opsPerSecond - a.opsPerSecond);
        const sortedResults = {};
        for (const { name, opsPerSecond } of resultEntries) {
          sortedResults[name] = opsPerSecond;
        }
        console.table(sortedResults);
        if (this.name) {
          console.log(color("--------------------"));
        }
      })
      .on("start", function() {
        if (this.name) {
          console.log(color(this.name));
        }
      })
      .run({ async: false });
    hue += 100;
  }
}

function getOpsPerSecond(description: {}): number {
  return Number.parseFloat(`${description}`.split(" ops/sec")[0].replace(/,/g, ""));
}

export { runBenchmarks };
