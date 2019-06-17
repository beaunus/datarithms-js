/**
 * Graph
 */
class Graph {
  /**
   * @param {number} numVertices
   */
  constructor(numVertices) {
    /** @type {Array<Array<number>>} */
    this.adj = new Array(numVertices);
    this.numVertices = numVertices;
    this.numEdges = 0;
    for (let i = 0; i < numVertices; ++i) {
      this.adj[i] = [];
    }
  }

  /**
   * @param {number} thisVertex
   * @param {number} thatVertex
   */
  addEdge(thisVertex, thatVertex) {
    if (
      thisVertex < 0 ||
      thisVertex > this.numVertices ||
      thatVertex < 0 ||
      thatVertex > this.numVertices
    )
      throw new RangeError();
    if (thisVertex === thatVertex)
      throw new Error("self loops are not allowed");
    this.adj[thisVertex].push(thatVertex);
    ++this.numEdges;
  }

  /**
   * @param {object} param
   * @param {number} param.start
   * @return {Array<number>}
   */
  bfs({ start }) {
    const queue = [start];
    const enqueued = new Array(this.numVertices).fill(false);
    enqueued[start] = true;
    const result = [];
    while (queue.length) {
      const next = queue.shift();
      result.push(next);
      const nextVertices = this.adj[next].filter(v => !enqueued[v]);
      for (const nextVertex of nextVertices) enqueued[nextVertex] = true;
      queue.push(...nextVertices);
    }
    return result;
  }

  /**
   * @param {number} vertex
   * @return {number}
   */
  degreeOut(vertex) {
    return this.adj[vertex].length;
  }

  /**
   * @param {object} param
   * @param {number} param.start
   * @param {Array<boolean>} [param.visited]
   * @param {Array<number>} [param.path]
   * @return {Array<number>}
   */
  dfs({ start, visited = new Array(this.numVertices).fill(false), path = [] }) {
    visited[start] = true;
    path.push(start);
    for (const neighbor of this.adj[start]) {
      if (!visited[neighbor]) {
        this.dfs({ start: neighbor, visited, path });
      }
    }
    return path;
  }

  /**
   * Create and return a copy of this graph.
   * @return {Graph}
   */
  duplicate() {
    const result = new Graph(this.numVertices);
    for (let i = 0; i < this.numVertices; ++i) {
      for (const j of this.adj[i]) {
        result.addEdge(i, j);
      }
    }
    return result;
  }

  /**
   * @param {number} vertex
   * @return {Array<number>}
   */
  neighbors(vertex) {
    return this.adj[vertex];
  }

  /** */
  print() {
    console.dir(this, { depth: null });
  }
}

/**
 * @param {number} numVertices
 * @return {Graph}
 */
function generateCompleteGraph(numVertices) {
  const result = new Graph(numVertices);
  for (let i = 0; i < numVertices; ++i) {
    for (let j = i + 1; j < numVertices; ++j) {
      result.addEdge(i, j);
      result.addEdge(j, i);
    }
  }
  return result;
}

/**
 * @param {number} numVertices
 * @return {Graph}
 */
function generateLinkedList(numVertices) {
  const result = new Graph(numVertices);
  for (let i = 0; i < numVertices - 1; ++i) {
    result.addEdge(i, i + 1);
  }
  return result;
}

/**
 *
 * @param {number} numVertices
 * @return {Graph}
 */
function generateTree(numVertices) {
  const result = new Graph(numVertices);
  for (let vertex = 0; vertex < numVertices; ++vertex) {
    const neighbors = [vertex * 2 + 1, vertex * 2 + 2].filter(
      v => v < numVertices
    );
    for (const neighbor of neighbors) result.addEdge(vertex, neighbor);
  }
  return result;
}

export { generateCompleteGraph, generateLinkedList, generateTree, Graph };
