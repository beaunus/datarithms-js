/* eslint-disable max-len */

import { expect } from "chai";

import { generateCompleteGraph, Graph } from "./graph";
import { range } from "../algorithms/itertools";

const MAX_NUM_VERTICES = 10;

describe("graph", () => {
  describe("addEdge", () => {
    it("should throw an error if either of the vertices don't exist in the graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(() => graph.addEdge(-1, vertex)).to.throw(RangeError);
          expect(() => graph.addEdge(vertex, -1)).to.throw(RangeError);
        }
      }
    });

    it("should throw an error if the given vertices are the same", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(() => graph.addEdge(vertex, vertex)).to.throw(
            Error,
            /self loop/i
          );
        }
      }
    });

    it("should not throw an error if the given vertices are not the same", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 1; vertex < numVertices; ++vertex) {
          expect(() => graph.addEdge(vertex, vertex - 1)).to.not.throw();
        }
      }
    });
  });

  describe("degree", () => {
    it("should return 0 for all vertices on a new graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(graph.degree(vertex)).to.equal(0);
        }
      }
    });

    it("should return numVertices - 1 for all vertices in a complete graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = generateCompleteGraph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(graph.degree(vertex)).to.equal(numVertices - 1);
        }
      }
    });
  });

  describe("duplicate", () => {
    it("should return a graph that is identical to the original", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const originalGraph = generateCompleteGraph(numVertices);
        const copyGraph = originalGraph.duplicate();
        expect(copyGraph.numVertices).to.equal(originalGraph.numVertices);
        expect(copyGraph.numEdges).to.equal(originalGraph.numEdges);
        for (let vertex = 0; vertex < originalGraph.numVertices; ++vertex) {
          expect(copyGraph.neighbors(vertex)).to.have.ordered.members(
            originalGraph.neighbors(vertex)
          );
        }
      }
    });
  });

  describe("neighbors", () => {
    it("should return an empty array for every vertex in a completely disconnected graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = new Graph(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          expect(graph.neighbors(vertex)).to.be.an("array").that.is.empty;
        }
      }
    });

    it("should return an array containing all vertices (except the vertex in question) in a complete graph", () => {
      for (let numVertices = 0; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = generateCompleteGraph(numVertices);
        const allVertices = range(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          const expected = allVertices.filter(v => v !== vertex);
          expect(graph.neighbors(vertex)).to.have.members(expected);
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
    it("should return the correct number of edges in a complete graph", () => {
      for (let numVertices = 1; numVertices < MAX_NUM_VERTICES; ++numVertices) {
        const graph = generateCompleteGraph(numVertices);
        const expectedNumEdges = (numVertices * (numVertices - 1)) / 2;
        expect(graph.numEdges).to.equal(expectedNumEdges);
      }
    });
  });
});
