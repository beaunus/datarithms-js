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

  describe("exhaustiveSearch", () => {
    it("should call generateAllHamiltonianPaths with the given graph", () => {
      const graph = makeCompleteGraph(NUM_VERTICES);

      sandbox.stub(Tsp, "generateAllHamiltonianPaths").returns([]);

      Tsp.exhaustiveSearch(graph, 0);
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
      Tsp.exhaustiveSearch(graph, Math.random());

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

      const actual = Tsp.exhaustiveSearch(graph, _.random(0, NUM_VERTICES - 1));
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
      let startingVertex = 0;
      let actual = Tsp.generateAllHamiltonianPaths({ graph, startingVertex });
      expect(actual).to.deep.equal([[[startingVertex, 0], [1, graph[0][1]]]]);

      startingVertex = 1;
      actual = Tsp.generateAllHamiltonianPaths({ graph, startingVertex });
      expect(actual).to.deep.equal([[[startingVertex, 0], [0, graph[1][0]]]]);
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
