const consoleDir = console.dir;

console.dir = x => consoleDir(x, { depth: null });

import chai, { expect } from "chai";
import { createSandbox } from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);

import * as _ from "lodash";

import * as Tsp from "./tsp";
import { describe } from "mocha";

describe("tsp", () => {
  const NUM_VERTICES = _.random(2, 10);

  const sandbox = createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe("helpers", () => {
    describe("chooseShortestPath", () => {
      it("should return the only path if given only one path", () => {
        const path = makeRandomPath(NUM_VERTICES);
        const actual = Tsp.chooseShortestPath([path]);
        expect(actual).to.equal(path);
      });

      it("should return the shortest path", () => {
        const NUM_PATHS = _.random(2, 10);
        const paths = _.times(NUM_PATHS, () => makeRandomPath(NUM_VERTICES));
        const actual = Tsp.chooseShortestPath(paths);
        const actualCost = Tsp.computePathCost(actual);

        for (const path of paths) {
          const pathCost = Tsp.computePathCost(path);
          expect(actualCost).to.be.at.most(pathCost);
        }
      });
    });

    describe("computePathCost", () => {
      it("should return the sum of the costs of the steps in the path", () => {
        let expected = 0;
        const path = _.times(NUM_VERTICES, () => {
          const node = Math.random();
          const cost = Math.random();
          expected += cost;
          return [node, cost];
        });

        const actual = Tsp.computePathCost(path);
        expect(actual).to.equal(expected);
      });
    });

    describe("generateAllHamiltonianPaths", () => {
      it("should return a single step path with 0 cost if there is only one vertex in the graph", () => {
        const graph = makeCompleteGraph({ numVertices: 1 });
        const actual = Tsp.generateAllHamiltonianPaths({ graph });
        expect(actual).to.deep.equal([[[0, 0]]]);
      });

      it("should return the only hamiltonian path if there are two vertices in the graph", () => {
        const graph = makeCompleteGraph({ numVertices: 2 });
        const actual = Tsp.generateAllHamiltonianPaths({ graph });
        expect(actual).to.deep.equal([[[0, 0], [1, graph[0][1]]]]);
      });
    });

    describe("getPathRatio", () => {
      it("should return the cost of thisPath / the cost of thatPath", () => {
        const stub = sandbox.stub(Tsp, "computePathCost");

        const fakeThisPathCost = Math.random();
        stub.onCall(0).returns(fakeThisPathCost);
        const fakeThatPathCost = Math.random();
        stub.onCall(1).returns(fakeThatPathCost);

        const thisPath = _.times(NUM_VERTICES, () => [
          Math.random(),
          Math.random()
        ]);
        const thatPath = _.times(NUM_VERTICES, () => [
          Math.random(),
          Math.random()
        ]);

        const actual = Tsp.getPathRatio(thisPath, thatPath);
        expect(actual).to.equal(fakeThisPathCost / fakeThatPathCost);
      });
    });
  });

  describe("solutions", () => {
    describe("exhaustiveSearch", () => {
      it("should call generateAllHamiltonianPaths with the given graph", () => {
        const graph = makeCompleteGraph({ numVertices: NUM_VERTICES });

        sandbox.stub(Tsp, "generateAllHamiltonianPaths").returns([]);

        Tsp.exhaustiveSearch(graph);
        expect(
          Tsp.generateAllHamiltonianPaths
        ).to.have.been.calledOnceWithExactly({ graph });
      });

      it("should call chooseShortestPath with the result of generateAllHamiltonianPaths", () => {
        const expected = _.times(NUM_VERTICES, () =>
          _.times(_.random(0, NUM_VERTICES - 1), () => {
            /** @type {[number, number]} */
            const result = [Math.random(), Math.random()];
            return result;
          })
        );

        sandbox.stub(Tsp, "generateAllHamiltonianPaths").returns(expected);
        sandbox.stub(Tsp, "chooseShortestPath");

        const graph = [[Math.random()]];
        Tsp.exhaustiveSearch(graph);

        expect(Tsp.chooseShortestPath).to.have.been.calledOnceWithExactly(
          expected
        );
      });

      it("should return the result of chooseShortestPath", () => {
        const graph = makeCompleteGraph({ numVertices: NUM_VERTICES });

        const expected = _.times(_.random(0, NUM_VERTICES - 1), () => {
          /** @type {[number, number]} */
          const result = [Math.random(), Math.random()];
          return result;
        });

        sandbox.stub(Tsp, "generateAllHamiltonianPaths");
        sandbox.stub(Tsp, "chooseShortestPath").returns(expected);

        const actual = Tsp.exhaustiveSearch(graph);
        expect(actual).to.equal(expected);
      });
    });

    describe("nearestNeighbor", () => {
      it("should return the same answer as exhaustiveSearch for a complete graph when all edges have equal weight", () => {
        const edgeWeight = Math.random();
        for (let numVertices = 1; numVertices < NUM_VERTICES; ++numVertices) {
          const graph = makeCompleteGraph({ numVertices, edgeWeight });
          const expected = Tsp.exhaustiveSearch(graph);
          const actual = Tsp.nearestNeighbor(graph);
          expect(actual).to.deep.equal(expected);
        }
      });
    });
  });

  xdescribe("performance comparison", () => {
    it("---", () => {
      const NUM_VERTICES = 9;
      const metricsByNumVertices = [];
      const NUM_TRIALS = 1;
      for (let numVertices = 1; numVertices <= NUM_VERTICES; ++numVertices) {
        console.log({ numVertices });
        for (let trialIndex = 0; trialIndex < NUM_TRIALS; ++trialIndex) {
          console.group();
          console.log({ trialIndex });
          metricsByNumVertices[numVertices] = {
            exhaustiveSearchTimes: [],
            nearestNeighborTimes: [],
            correctnessRatios: [],
            timeRatios: []
          };
          const graph = makeCompleteGraph({ numVertices });
          for (let i = 0; i < numVertices; ++i) {
            const timeBeforeNearestNeighborSearch = process.hrtime.bigint();
            const nearestNeighborPath = Tsp.nearestNeighbor(graph, i);
            const timeAfterNearestNeighborSearch = process.hrtime.bigint();
            const nearestNeighborDuration =
              timeAfterNearestNeighborSearch - timeBeforeNearestNeighborSearch;

            const timeBeforeExhaustiveSearch = process.hrtime.bigint();
            const exhaustiveSearchPath = Tsp.exhaustiveSearch(graph, i);
            const timeAfterExhaustiveSearch = process.hrtime.bigint();
            const exhaustiveSearchDuration =
              timeAfterExhaustiveSearch - timeBeforeExhaustiveSearch;

            const correctnessRatio = Tsp.getPathRatio(
              nearestNeighborPath,
              exhaustiveSearchPath
            );
            metricsByNumVertices[numVertices].nearestNeighborTimes.push(
              nearestNeighborDuration
            );
            metricsByNumVertices[numVertices].exhaustiveSearchTimes.push(
              exhaustiveSearchDuration
            );

            metricsByNumVertices[numVertices].timeRatios.push(
              exhaustiveSearchDuration / nearestNeighborDuration
            );
            metricsByNumVertices[numVertices].correctnessRatios.push(
              correctnessRatio
            );
          }
          console.groupEnd();
        }
      }
      for (let numVertices = 1; numVertices <= NUM_VERTICES; ++numVertices) {
        const metrics = metricsByNumVertices[numVertices];
        metricsByNumVertices[numVertices] = _.mapValues(metrics, mean);
      }
      console.dir({ metricsByNumVertices });
    });
  });
});

/**
 * @param {ReadonlyArray<number|BigInt>} array
 * @return {number|BigInt}
 */
function mean(array) {
  const isNumber = typeof array[0] === "number";
  return isNumber
    ? // @ts-ignore
      // @ts-ignore
      array.reduce((acc, cur) => acc + cur, 0) / array.length
    : // @ts-ignore
      // @ts-ignore
      // eslint-disable-next-line new-cap
      array.reduce((acc, cur) => acc + cur, BigInt(0)) / BigInt(array.length);
}

/**
 * @param {object} param
 * @param {number} param.numVertices
 * @param {number} [param.edgeWeight]
 * @return {Array<Array<number>>}
 */
function makeCompleteGraph({ numVertices, edgeWeight }) {
  const graph = new Array(numVertices);
  for (let i = 0; i < numVertices; ++i) {
    graph[i] = new Array(numVertices);
    for (let j = 0; j < numVertices; ++j) {
      const weight =
        j === i ? 0 : edgeWeight !== undefined ? edgeWeight : Math.random();
      graph[i][j] = weight;
    }
  }
  return graph;
}

/**
 *
 * @param {number} numVertices
 * @return {Array<Array<number>>}
 */
function makeRandomPath(numVertices) {
  return _.chain(_.range(0, numVertices))
    .shuffle()
    .map(vertex => [vertex, Math.random()])
    .value();
}
