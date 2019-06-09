import { expect } from "chai";
import * as _ from "lodash";
import { v4 } from "uuid";

import { bfs, createGraph } from "./graph";

describe.only("graph", () => {
  describe("bfs", () => {
    it("should return the correct result if there is only one edge", () => {
      const from = v4();
      const to = v4();
      const graph = { [from]: [to] };
      const actual = bfs(graph, from);
      expect(actual).to.deep.equal([from, to]);
    });

    it("should return the correct result if there are no edges", () => {
      const from = v4();
      const graph = { [from]: [] };
      const actual = bfs(graph, from);
      expect(actual).to.deep.equal([from]);
    });

    it("should return the correct result if the graph is a tree with only 2 levels", () => {
      const root = v4();
      const NUM_LEAVES = _.random(10, 100);
      const leaves = _.times(NUM_LEAVES, () => v4());
      const graph = { [root]: leaves };

      let actual = bfs(graph, root);
      expect(actual).to.deep.equal([root, ...leaves]);

      for (const leaf of leaves) {
        actual = bfs(graph, leaf);
        expect(actual).to.deep.equal([leaf]);
      }
    });

    it("should return the correct result if the graph is a linked list", () => {
      const root = v4();

      const expected = [root];
      /** @type {Object.<string, Array<string>>} */
      const graph = {};
      let node = root;
      const NUM_LINKS = _.random(10, 100);
      for (let i = 0; i < NUM_LINKS; ++i) {
        const newNode = v4();
        graph[node] = [newNode];
        node = newNode;
        expected.push(newNode);
      }
      const actual = bfs(graph, root);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe("createGraph", () => {
    it("should return the correct result when there are no vertices", () => {
      const actual = createGraph();
      const expected = {};
      expect(actual).to.deep.equal(expected);
    });

    it("should return the correct result when there is one vertex with no edges", () => {
      const vertex = v4();
      const actual = createGraph([vertex]);
      const expected = { [vertex]: [] };
      expect(actual).to.deep.equal(expected);
    });

    it("should return the correct result when there are many vertices with many edges", () => {
      const NUM_VERTICES = _.random(10, 100);
      const vertices = _.times(NUM_VERTICES, () => v4());
      /** @type {Array<[string, string]>} */
      const edges = [];
      const expected = {};
      for (const vertex of vertices) {
        const NUM_EDGES = _.random(0, NUM_VERTICES);
        const outEdges = _.sampleSize(vertices, NUM_EDGES);
        expected[vertex] = outEdges;
        // @ts-ignore
        edges.push(...outEdges.map(to => [vertex, to]));
      }

      const actual = createGraph(vertices, edges);
      expect(actual).to.deep.equal(expected);
    });
  });
});
