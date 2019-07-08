const consoleDir = console.dir;

console.dir = x => consoleDir(x, { depth: null });

import { generatePermutationsHeapIter } from "./permutations/permutations.heaps";

/** @typedef {Array<Array<number>>} Graph */
/** @typedef {Array<Array<number>>} Path */

/**
 *
 * @param {Graph} graph
 * @param {number} startingVertex
 * @return {{cost: number, path: Array<[number, number]>}}
 */
export function exhaustiveSearch(graph, startingVertex) {
  const allPaths = exports.generateAllHamiltonianPaths({
    graph,
    startingVertex
  });
  return exports.chooseShortestPath(allPaths);
}

/**
 *
 * @param {Object} param
 * @param {Graph} param.graph
 * @param {number} param.startingVertex
 * @return {Array<Path>}
 */
export function generateAllHamiltonianPaths({ graph, startingVertex }) {
  const vertices = [];
  for (let i = 0; i < graph.length; ++i) {
    if (i !== startingVertex) {
      vertices.push(i);
    }
  }

  if (!vertices.length) {
    return [[[startingVertex, 0]]];
  }

  /** @type {Array<Path>} */
  const result = [];

  for (const perm of generatePermutationsHeapIter({ array: vertices })) {
    /** @type {Path} */
    const path = [
      [startingVertex, 0],
      ...perm.map((vertex, index) => {
        const prevVertex = index === 0 ? startingVertex : perm[index - 1];
        return [vertex, graph[prevVertex][vertex]];
      })
    ];
    result.push(path);
  }
  return result;
}

/**
 *
 * @param {Array<Path>} paths
 * @return {Path}
 */
export function chooseShortestPath(paths) {
  let championPath;
  let championCost = Number.MAX_VALUE;

  for (const path of paths) {
    const pathCost = computePathCost(path);
    if (pathCost < championCost) {
      championPath = path;
      championCost = pathCost;
    }
  }

  return championPath;
}

/**
 *
 * @param {Path} path
 * @return {number}
 */
export function computePathCost(path) {
  return path.reduce((acc, [, cost]) => acc + cost, 0);
}

/**
 *
 * @param {Path} thisPath
 * @param {Path} thatPath
 * @return {number}
 */
export function getPathRatio(thisPath, thatPath) {
  return exports.computePathCost(thisPath) / exports.computePathCost(thatPath);
}