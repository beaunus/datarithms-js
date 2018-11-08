import { expect } from "chai";

import { Graph, generateCompleteGraph } from "./graph";
import { range } from "./itertools";

const MAX_NUM_EDGES = 5;
const MAX_NUM_VERTICES = 10;

describe("graph", () => {
  describe("degree", () => {
    it("should return 0 for all vertices on a new graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(graph.degree(vertex)).to.equal(0);
        }
      }
    });
    it("should return 2 for all vertices that have a single self-referencing edge", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          graph.addEdge(vertex, vertex);
          expect(graph.degree(vertex)).to.equal(2);
        }
      }
    });
    it("should return 4 for all vertices that have 2 parallel self-referencing edges", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          graph.addEdge(vertex, vertex);
          graph.addEdge(vertex, vertex);
          expect(graph.degree(vertex)).to.equal(4);
        }
      }
    });
    it("should return numVertices + 1 for all vertices in a complete graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = generateCompleteGraph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(graph.degree(vertex)).to.equal(numVertices + 1);
        }
      }
    });
  });
  describe("neighbors", () => {
    it("should return an empty array for every vertex in a completely disconnected graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(graph.neighbors(vertex)).to.deep.equal([]);
        }
      }
    });
    it("should return an array containing all vertices in a complete graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = generateCompleteGraph(numVertices);
        const allVertices = range(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          const expected = Array.from(allVertices);
          expected.push(vertex);
          expect(graph.neighbors(vertex).sort()).to.deep.equal(expected.sort());
        }
      }
    });
  });
  describe("numVertices", () => {
    it("should return the number of vertices that the graph was constructed with", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        expect(graph.numVertices).to.equal(numVertices);
      }
    });
  });
  describe("numEdges", () => {
    it("should return the correct number of edges when the graph has a single vertex", () => {
      const graph = new Graph(1);
      for (let i = 0; i < MAX_NUM_EDGES; ++i) {
        expect(graph.numEdges).to.equal(i);
        graph.addEdge(0, 0);
      }
    });
    it("should return the correct number of edges in a complete graph", () => {
      for (let numVertices = 1; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = generateCompleteGraph(numVertices);
        const expectedNumEdges = (numVertices * (numVertices - 1)) / 2 + numVertices;
        expect(graph.numEdges).to.equal(expectedNumEdges);
      }
    });
  });
});
