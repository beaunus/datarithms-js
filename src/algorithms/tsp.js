const consoleDir = console.dir;

console.dir = x => consoleDir(x, { depth: null });

import { generatePermutationsHeapIter } from "./permutations/permutations.heaps";

/** @typedef {Array<Array<number>>} Graph */
/** @typedef {Array<Array<number>>} Path */

/**
 *
 * @param {Graph} graph
 * @return {Array<[number, number]>}
 */
export function exhaustiveSearch(graph) {
  const allPaths = exports.generateAllHamiltonianPaths({ graph });
  return exports.chooseShortestPath(allPaths);
}

/**
 *
 * @param {Graph} graph
 * @return {Array<[number, number]>}
 */
export function nearestNeighbor(graph) {
  /** @type Array<[number, number]> */
  const result = [];
  const visited = new Array(graph.length).fill(false);
  let next = 0;
  while (result.length < graph.length) {
    let champion;
    let championCost = Number.MAX_SAFE_INTEGER;
    for (let neighbor = 0; neighbor < graph.length; ++neighbor) {
      if (!visited[neighbor] && graph[next][neighbor] < championCost) {
        champion = neighbor;
        championCost = graph[next][neighbor];
      }
    }
    visited[champion] = true;
    result.push([champion, championCost]);
    next = champion;
  }
  return result;
}

/**
 *
 * @param {Object} param
 * @param {Graph} param.graph
 * @return {Array<Path>}
 */
export function generateAllHamiltonianPaths({ graph }) {
  const vertices = [];
  for (let i = 1; i < graph.length; ++i) vertices.push(i);

  if (!vertices.length) return [[[0, 0]]];

  /** @type {Array<Path>} */
  const result = [];

  for (const perm of generatePermutationsHeapIter({ array: vertices })) {
    /** @type {Path} */
    const path = [
      [0, 0],
      ...perm.map((vertex, index) => {
        const prevVertex = index === 0 ? 0 : perm[index - 1];
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
