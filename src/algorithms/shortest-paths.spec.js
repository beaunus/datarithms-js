import * as chai from "chai";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
const { expect } = chai;
import * as _ from "lodash";
import * as sinon from "sinon";

import { xrange } from "./itertools";
import * as SP from "./shortest-paths";

const MAX_NUM_VERTICES = 5;

describe("shortest-paths", () => {
  const sandbox = sinon.createSandbox();

  before(sandbox.restore);
  afterEach(sandbox.restore);

  describe("dijkstrasAlgorithm", () => {
    it("should return the same result as bruteForce", () => {
      for (let n = 2; n < MAX_NUM_VERTICES; ++n) {
        const graph = SP.generateRandomGraph({
          numVertices: n,
          density: 1
        });
        // eslint-disable-next-line new-cap
        let timeBruteForce = BigInt(0);
        // eslint-disable-next-line new-cap
        let timeDijkstras = BigInt(0);
        for (let source = 0; source < n; ++source) {
          for (let target = 0; target < n; ++target) {
            if (source === target) continue;
            const timeBeforeDijkstras = process.hrtime.bigint();
            const actual = SP.dijkstrasAlgorithm({ graph, source, target });
            timeDijkstras += process.hrtime.bigint() - timeBeforeDijkstras;
            const timeBeforeBruteForce = process.hrtime.bigint();
            const expected = SP.bruteForce({ graph, source, target });
            timeBruteForce += process.hrtime.bigint() - timeBeforeBruteForce;
            expect(actual).to.have.ordered.members(expected);
          }
        }
        console.log({
          n,
          timeBruteForce,
          timeDijkstras,
          ratio: timeBruteForce / timeDijkstras
        });
      }
    });
  });

  describe("bruteForce", () => {
    const graph = SP.generateRandomGraph({
      numVertices: _.random(MAX_NUM_VERTICES),
      density: Math.random()
    });
    const fakeAllPaths = _.times(MAX_NUM_VERTICES, () =>
      _.times(_.random(1, MAX_NUM_VERTICES), () => Math.random())
    );
    const fakePathCosts = fakeAllPaths.map(() => Math.random());
    const fakeIndexOfShortestPath = _.random(0, fakeAllPaths.length);

    it("should call the correct helper functions", () => {
      for (let source = 0; source < MAX_NUM_VERTICES; ++source) {
        for (let target = 0; target < MAX_NUM_VERTICES; ++target) {
          if (source === target) continue;
          sandbox.restore();
          sandbox.stub(SP, "findAllPaths").returns(fakeAllPaths);
          sandbox.stub(fakeAllPaths, "map").returns(fakePathCosts);
          sandbox
            .stub(SP, "findIndexOfSmallestElement")
            .returns(fakeIndexOfShortestPath);

          const actual = SP.bruteForce({ graph, source, target });

          expect(SP.findAllPaths).to.have.been.calledOnceWithExactly({
            graph,
            source,
            target
          });
          // expect(fakeAllPaths.map).to.have.been.calledOnceWithExactly(path =>
          //   SP.computeCostOfPath({ graph, path, source })
          // );
          expect(
            SP.findIndexOfSmallestElement
          ).to.have.been.calledOnceWithExactly(fakePathCosts);
          expect(actual).to.equal(fakeAllPaths[fakeIndexOfShortestPath]);
        }
      }
    });
  });

  describe("computePathCost", () => {
    it("should return the result of adding all the path costs", () => {
      const numVertices = MAX_NUM_VERTICES;
      const graph = SP.generateRandomGraph({ numVertices, density: 1 });
      const path = _.shuffle(_.range(1, MAX_NUM_VERTICES));
      let expected = 0;
      let previous = 0;
      for (const next of path) {
        expected += graph[previous][next];
        previous = next;
      }
      const actual = SP.computeCostOfPath({ graph, path, source: 0 });
      expect(actual).to.equal(expected);
    });
  });

  describe("findAllPaths", () => {
    describe("complete graph", () => {
      it("should return the correct number of paths", () => {
        expectAllPaths(({ actual, numVertices }) => {
          expect(actual)
            .to.be.an("array")
            .of.length(numPermutations(numVertices - 2));
        });
      });

      it("each path should be unique", () => {
        expectAllPaths(({ actual }) => {
          const pathsSeenSoFar = new Set();
          for (const path of actual) {
            expect(pathsSeenSoFar).not.to.contain(path);
            pathsSeenSoFar.add(path);
          }
        });
      });

      it("each path should contain only valid nodes", () => {
        expectAllPaths(({ actual, numVertices, source }) => {
          for (const path of actual) {
            const nodesSeenSoFar = new Set();
            path.forEach(nextNode => {
              expect(nodesSeenSoFar).not.to.contain(nextNode);
              nodesSeenSoFar.add(nextNode);
              expect(Number.isInteger(nextNode)).to.be.true;
              expect(nextNode).not.to.equal(source);
              expect(nextNode).to.be.at.most(numVertices);
            });
          }
        });
      });

      /**
       * @param {Function} expectation
       */
      function expectAllPaths(expectation) {
        for (let n = 2; n <= MAX_NUM_VERTICES; ++n) {
          const graph = SP.generateRandomGraph({ numVertices: n, density: 1 });
          for (let source = 0; source < n; ++source) {
            for (let target = 0; target < n; ++target) {
              if (source === target) continue;
              const actual = SP.findAllPaths({ graph, source, target });
              expectation({ actual, numVertices: n, source });
            }
          }
        }
      }
    });

    describe("linked list", () => {
      it("should return the correct result when the graph is a linked list", () => {
        for (const numVertices of xrange(2, MAX_NUM_VERTICES + 1)) {
          const graph = SP.generateLinkedList(numVertices);
          for (let source = 0; source < numVertices; ++source) {
            for (let target = source + 1; target < numVertices; ++target) {
              const actual = SP.findAllPaths({ graph, source, target });
              const expected = [];
              for (let i = source + 1; i <= target; ++i) expected.push(i);
              expect(actual[0]).to.have.ordered.members(expected);
            }
          }
        }
      });
    });
  });

  describe("findIndexOfSmallestElement", () => {
    it("the element of the given array at the resulting index should be less than or equal to all other elements in the given array", () => {
      const fakeArray = _.times(MAX_NUM_VERTICES, () => Math.random());
      const actual = SP.findIndexOfSmallestElement(fakeArray);
      for (const element of fakeArray) {
        expect(element).to.be.at.least(fakeArray[actual]);
      }
    });
  });

  describe("generateRandomGraph", () => {
    it("should generate a complete graph when the given density is 1", () => {
      for (const numVertices of xrange(1, MAX_NUM_VERTICES)) {
        const actual = SP.generateRandomGraph({ numVertices, density: 1 });
        expect(actual)
          .to.be.an("array")
          .of.length(numVertices);
        actual.forEach((neighbors, vertex) => {
          expect(neighbors)
            .to.be.an("array")
            .of.length(numVertices);
          expect(neighbors).not.to.contain(vertex);
          neighbors.forEach(weight =>
            expect(weight)
              .to.be.a("number")
              .that.is.at.least(0)
          );
        });
      }
    });

    it("should generate a sparse graph when the given density is 0", () => {
      for (const numVertices of xrange(1, MAX_NUM_VERTICES)) {
        const actual = SP.generateRandomGraph({ numVertices, density: 0 });
        expect(actual)
          .to.be.an("array")
          .of.length(numVertices);
        actual.forEach(neighbors => {
          expect(neighbors)
            .to.be.an("array")
            .of.length(numVertices);
          neighbors.forEach(weight => expect(weight).to.be.undefined);
        });
      }
    });
  });
});

/**
 * @param {number} n
 * @return {number}
 */
function factorial(n) {
  let result = 1;
  for (let i = n; i >= 2; --i) result *= i;
  return result;
}

/**
 * @param {number} numElements
 * @return {number}
 */
function numPermutations(numElements) {
  let result = 0;
  for (let k = 0; k <= numElements; ++k)
    result += factorial(numElements) / factorial(k);
  return result;
}
