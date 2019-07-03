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
  const NUM_VERTICES = _.random(10, 10);

  describe("bruteForce", () => {
    const sandbox = createSandbox();

    afterEach(() => {
      sandbox.restore();
    });

    it("should call generateAllHamiltonianPaths with the given graph", () => {
      const graph = makeCompleteGraph(NUM_VERTICES);

      sandbox.stub(Tsp, "generateAllHamiltonianPaths").returns([]);

      Tsp.bruteForce(graph, 0);
      expect(
        Tsp.generateAllHamiltonianPaths
      ).to.have.been.calledOnceWithExactly({ graph, startingVertex: 0 });
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
      Tsp.bruteForce(graph, Math.random());

      expect(Tsp.chooseShortestPath).to.have.been.calledOnceWithExactly(
        expected
      );
    });

    it("should return the result of chooseShortestPath", () => {
      const graph = makeCompleteGraph(NUM_VERTICES);

      const expected = _.times(_.random(0, NUM_VERTICES - 1), () => {
        /** @type {[number, number]} */
        const result = [Math.random(), Math.random()];
        return result;
      });

      sandbox.stub(Tsp, "generateAllHamiltonianPaths");
      sandbox.stub(Tsp, "chooseShortestPath").returns(expected);

      const actual = Tsp.bruteForce(graph, _.random(0, NUM_VERTICES - 1));
      expect(actual).to.equal(expected);
    });
  });

  describe("generateAllHamiltonianPaths", () => {
    it("should return a single step path with 0 cost if there is only one vertex in the graph", () => {
      const graph = makeCompleteGraph(1);
      const startingVertex = 0;
      const actual = Tsp.generateAllHamiltonianPaths({ graph, startingVertex });
      expect(actual).to.deep.equal([[[0, 0]]]);
    });

    it("should return the only hamiltonian path if there are two vertices in the graph", () => {
      const graph = makeCompleteGraph(2);
      const startingVertex = 0;
      const actual = Tsp.generateAllHamiltonianPaths({ graph, startingVertex });
      expect(actual).to.deep.equal([[[1, graph[0][1]], [0, graph[1][0]]]]);
    });
  });

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
      const actualCost = actual.reduce((acc, [, cost]) => acc + cost, 0);

      for (const path of paths) {
        const pathCost = path.reduce((acc, [, cost]) => acc + cost, 0);
        expect(actualCost).to.be.at.most(pathCost);
      }
    });
  });
});

/**
 * @param {number} numVertices
 * @return {Array<Array<number>>}
 */
function makeCompleteGraph(numVertices) {
  const graph = new Array(numVertices);
  for (let i = 0; i < numVertices; ++i) {
    graph[i] = new Array(numVertices);
    for (let j = 0; j < numVertices; ++j) {
      const weight = j === i ? 0 : Math.random();
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
