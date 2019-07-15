/** @typedef {Array<Array<number>>} Graph */
/** @typedef {Array<number>} Path */

/**
 * @param {object} param
 * @param {Graph} param.graph
 * @param {number} param.source
 * @param {number} param.target
 * @return {Path}
 */
export function dijkstrasAlgorithm({ graph, source, target }) {
  const Q = new Set();
  for (let i = 0; i < graph.length; ++i) {
    Q.add(i);
  }

  const prev = new Array(graph.length);
  const distances = new Array(graph.length).fill(Number.MAX_VALUE);
  distances[source] = 0;

  while (Q.size) {
    const u = computeVertexWithMinDistance({ availableVertices: Q, distances });

    if (u === target) return computePath({ source, target, prev });

    Q.delete(u);
    for (let v = 0; v < graph.length; ++v) {
      if (v === undefined || !Q.has(v)) continue;
      const alt = distances[u] + graph[u][v];
      if (alt < distances[v]) {
        distances[v] = alt;
        prev[v] = u;
      }
    }
  }
}

/**
 * @param {object} param
 * @param {ReadonlyArray<number>} param.prev
 * @param {number} param.source
 * @param {number} param.target
 * @return {Array<number>}
 */
function computePath({ source, target, prev }) {
  const result = [];
  let u = target;
  if (prev[u] !== undefined || u === source) {
    while (u !== undefined) {
      result.unshift(u);
      u = prev[u];
    }
  }
  result.shift();
  return result;
}

/**
 * @param {object} param
 * @param {Set<number>} param.availableVertices
 * @param {ReadonlyArray<number>} param.distances
 * @return {number}
 */
function computeVertexWithMinDistance({ availableVertices, distances }) {
  let championIndex = -1;
  let championCost = Number.MAX_VALUE;
  for (const vertex of availableVertices) {
    if (distances[vertex] < championCost) {
      championIndex = vertex;
      championCost = distances[vertex];
    }
  }
  return championIndex;
}

/**
 * @param {object} param
 * @param {Graph} param.graph
 * @param {number} param.source
 * @param {number} param.target
 * @return {Path}
 */
export function bruteForce({ graph, source, target }) {
  const allPaths = exports.findAllPaths({ graph, source, target });
  const allPathCosts = allPaths.map(path =>
    exports.computeCostOfPath({ graph, path, source })
  );
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
