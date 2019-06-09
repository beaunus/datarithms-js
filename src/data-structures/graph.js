/**
 * @param {Object.<string, Array<string>>} graph
 * @param {string} start
 * @return {Array<string>}
 */
export function bfs(graph, start) {
  /** @type {Array<string>} */
  const result = [];
  const queue = [start];
  while (queue.length > 0) {
    queue.push(...(graph[queue[0]] || []));
    result.push(queue.shift());
  }
  return result;
}

/**
 * @param {ReadonlyArray<string>} [vertices]
 * @param {ReadonlyArray<[string, string]>} [edges]
 * @return {Object.<string, Array<string>>}
 */
export function createGraph(vertices = [], edges = []) {
  /** @type {Object.<string, Array<string>>} */
  const result = {};

  for (const vertex of vertices) {
    result[vertex] = [];
  }

  for (const [from, to] of edges) {
    result[from].push(to);
  }

  return result;
}
