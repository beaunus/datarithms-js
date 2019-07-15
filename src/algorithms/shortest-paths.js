/** @typedef {Array<Array<number>>} Graph */
/** @typedef {Array<number>} Path */

/**
 * @param {object} param
 * @param {Graph} param.graph
 * @param {number} param.source
 * @param {number} param.target
 * @return {Path}
 */
export function bruteForce({ graph, source, target }) {
  const allPaths = exports.findAllPaths({ graph, source, target });
  const allPathCosts = allPaths.map(exports.computeCostOfPath);
  const indexOfShortestPath = exports.findIndexOfSmallestElement(allPathCosts);
  return allPaths[indexOfShortestPath];
}

/**
 * @param {object} param
 * @param {Graph} param.graph
 * @param {number} param.source
 * @param {number} param.target
 * @return {Array<Array<number>>}
 */
export function findAllPaths({ graph, source, target }) {
  const visited = new Array(graph.length).fill(false);
  return [...dfs({ graph, source, target, visited })];
}

/**
 *
 * @param {object} param
 * @param {Graph} param.graph
 * @param {Path} param.path
 * @param {number} param.source
 * @return {number}
 */
export function computeCostOfPath({ graph, path, source }) {
  return path.reduce((acc, cur, index) => {
    const previous = index === 0 ? source : path[index - 1];
    return acc + graph[previous][cur];
  }, 0);
}

/**
 * @param {object} param
 * @param {Graph} param.graph
 * @param {number} param.source
 * @param {number} param.target
 * @param {Array<boolean>} param.visited
 * @yields {Array<number>} the next path from the source to the target
 */
export function* dfs({ graph, source, target, visited }) {
  if (visited[source]) return;
  if (source === target) {
    yield [];
    return;
  }
  visited[source] = true;
  for (let neighbor = 0; neighbor < graph.length; ++neighbor) {
    if (!graph[source][neighbor]) continue;
    for (const smaller of dfs({ graph, source: neighbor, target, visited }))
      yield [neighbor, ...smaller];
  }
  visited[source] = false;
}

/**
 * @param {Array<number>} elements
 * @return {number}
 */
export function findIndexOfSmallestElement(elements) {
  return elements.indexOf(Math.min(...elements));
}

/**
 * @param {number} numVertices
 * @return {Graph}
 */
export function generateLinkedList(numVertices) {
  const result = new Array(numVertices);
  for (let vertex = 0; vertex < numVertices; ++vertex) {
    result[vertex] = new Array(numVertices);
    if (vertex < numVertices - 1) result[vertex][vertex + 1] = Math.random();
  }
  return result;
}

/**
 * @param {object} param
 * @param {number} param.numVertices
 * @param {number} param.density
 * @return {Graph}
 */
export function generateRandomGraph({ numVertices, density }) {
  const result = new Array(numVertices);
  for (let i = 0; i < numVertices; ++i) {
    const neighbors = new Array(numVertices);
    for (let j = 0; j < numVertices; ++j)
      if (i !== j && Math.random() < density) neighbors[j] = Math.random();
    result[i] = neighbors;
  }
  return result;
}
