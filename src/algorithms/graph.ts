class Graph {
  public numEdges;
  public numVertices;
  public edges;
  constructor(numVertices) {
    this.numEdges = 0;
    this.numVertices = numVertices;
    this.edges = new Map();
    for (let i = 0; i < numVertices; ++i) {
      this.edges.set(i, []);
    }
  }

  public addEdge(thisVertex, thatVertex) {
    if (thisVertex === thatVertex) {
      throw new Error("Parallel edges are not allowed.");
    }
    this.validateVertex(thisVertex);
    this.validateVertex(thatVertex);
    this.edges.get(thisVertex).push(thatVertex);
    this.edges.get(thatVertex).push(thisVertex);
    ++this.numEdges;
  }

  public addVertex() {
    this.edges.set(this.numVertices, []);
    ++this.numVertices;
  }

  public degree(vertex) {
    return this.edges.get(vertex).length;
  }

  public duplicate() {
    const copy = new Graph(this.numVertices);
    copy.numEdges = this.numEdges;
    for (const [vertex, edges] of this.edges) {
      if (edges.length) {
        copy.edges.set(vertex, Array.from(edges));
      } else {
        copy.edges.set(vertex, []);
      }
    }
    return copy;
  }

  public neighbors(vertex) {
    return this.edges.get(vertex);
  }

  public validateVertex(vertex) {
    if (vertex < 0 || vertex >= this.numVertices) {
      throw new RangeError("The given vertex does not exist in the graph.");
    }
  }
}

function generateCompleteGraph(numVertices) {
  const graph = new Graph(numVertices);
  for (let thisVertex = 0; thisVertex < numVertices; ++thisVertex) {
    for (let thatVertex = thisVertex + 1; thatVertex < numVertices; ++thatVertex) {
      graph.addEdge(thisVertex, thatVertex);
    }
  }
  return graph;
}

export { Graph, generateCompleteGraph };