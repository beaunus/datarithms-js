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
    this.adj[thatVertex].push(thisVertex);
    ++this.numEdges;
  }

  /**
   * @param {number} vertex
   * @return {number}
   */
  degree(vertex) {
    return this.adj[vertex].length;
  }

  /**
   * Create and return a copy of this graph.
   * @return {Graph}
   */
  duplicate() {
    const result = new Graph(this.numVertices);
    for (let i = 0; i < this.numVertices; ++i) {
      for (const j of this.adj[i]) {
        if (j > i) result.addEdge(i, j);
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
    }
  }
  return result;
}

export { Graph, generateCompleteGraph };
