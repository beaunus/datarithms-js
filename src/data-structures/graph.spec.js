/* eslint-disable max-len */

import { expect } from "chai";

import {
  generateCompleteGraph,
  generateLinkedList,
  Graph,
  generateTree
} from "./graph";
import { range } from "../algorithms/itertools";

const MAX_SIZE = 10;

describe("graph", () => {
  describe("graph", () => {
    describe("addEdge", () => {
      it("should throw an error if either of the vertices don't exist in the graph", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = new Graph(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            expect(() => graph.addEdge(-1, vertex)).to.throw(RangeError);
            expect(() => graph.addEdge(vertex, -1)).to.throw(RangeError);
          }
        }
      });

      it("should throw an error if the given vertices are the same", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
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
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = new Graph(numVertices);
          for (let vertex = 1; vertex < numVertices; ++vertex) {
            expect(() => graph.addEdge(vertex, vertex - 1)).to.not.throw();
          }
        }
      });
    });

    describe("bfs", () => {
      it("should return the correct result for a complete graph", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = generateCompleteGraph(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            const expected = [
              vertex,
              ...range(numVertices).filter(v => v !== vertex)
            ];
            const actual = graph.bfs({ start: vertex });
            expect(actual).to.have.ordered.members(expected);
          }
        }
      });

      it("should return the correct result for a tree", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = generateTree(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            const queue = [vertex];
            const expected = [];
            while (queue.length) {
              const next = queue.shift();
              expected.push(next);
              queue.push(
                ...[next * 2 + 1, next * 2 + 2].filter(i => i < numVertices)
              );
            }
            const actual = graph.bfs({ start: vertex });
            expect(actual).to.have.ordered.members(expected);
          }
        }
      });
    });

    describe("degreeOut", () => {
      it("should return 0 for all vertices on a new graph", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = new Graph(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            expect(graph.degreeOut(vertex)).to.equal(0);
          }
        }
      });

      it("should return (n - 1) for all vertices in a complete graph", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = generateCompleteGraph(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            expect(graph.degreeOut(vertex)).to.equal(numVertices - 1);
          }
        }
      });
    });

    describe("dfs", () => {
      it("should return the correct result for a complete graph", () => {
        for (let numVertices = 1; numVertices < MAX_SIZE; ++numVertices) {
          const graph = generateCompleteGraph(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            const actual = graph.dfs({ start: vertex });
            const expected = [
              vertex,
              ...range(0, numVertices).filter(v => v !== vertex)
            ];
            expect(actual).to.have.ordered.members(expected);
          }
        }
      });

      it("should return the correct result for a linked list", () => {
        for (let numVertices = 1; numVertices <= MAX_SIZE; ++numVertices) {
          const graph = generateLinkedList(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            const actual = graph.dfs({ start: vertex });
            const expected = range(vertex, numVertices);
            expect(actual).to.have.ordered.members(expected);
          }
        }
      });
    });

    describe("duplicate", () => {
      it("should return a graph that is identical to the original", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
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
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = new Graph(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            expect(graph.neighbors(vertex)).to.be.an("array").that.is.empty;
          }
        }
      });

      it("should return an array containing all vertices (except the vertex in question) in a complete graph", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = generateCompleteGraph(numVertices);
          const allVertices = range(numVertices);
          for (let vertex = 0; vertex < numVertices; ++vertex) {
            const expected = allVertices.filter(v => v !== vertex);
            expect(graph.neighbors(vertex)).to.have.members(expected);
          }
        }
      });
    });

    describe("numEdges", () => {
      it("should return the correct number of edges in a complete graph", () => {
        for (let numVertices = 1; numVertices < MAX_SIZE; ++numVertices) {
          const graph = generateCompleteGraph(numVertices);
          const expectedNumEdges = numVertices * (numVertices - 1);
          expect(graph.numEdges).to.equal(expectedNumEdges);
        }
      });
    });

    describe("numVertices", () => {
      it("should return the number of vertices that the graph was constructed with", () => {
        for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
          const graph = new Graph(numVertices);
          expect(graph.numVertices).to.equal(numVertices);
        }
      });
    });
  });

  describe("generateTree", () => {
    it("should generate the correct result", () => {
      for (let numVertices = 0; numVertices < MAX_SIZE; ++numVertices) {
        const graph = generateTree(numVertices);
        for (let vertex = 0; vertex < numVertices; ++vertex) {
          const expectedNeighbors = [vertex * 2 + 1, vertex * 2 + 2].filter(
            v => v < numVertices
          );
          expect(graph.adj[vertex]).to.have.members(expectedNeighbors);
        }
      }
    });
  });
});
