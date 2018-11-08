class Graph {
  constructor(numVertices) {
    this.numEdges = 0;
    this.numVertices = numVertices;
    this.edges = new Map();
    for (let i = 0; i < numVertices; ++i) {
      this.edges.set(i, []);
    }
  }

  addEdge(thisVertex, thatVertex) {
    this.edges.get(thisVertex).push(thatVertex);
    this.edges.get(thatVertex).push(thisVertex);
    ++this.numEdges;
  }

  degree(vertex) {
    return this.edges.get(vertex).length;
  }

  neighbors(vertex) {
    return this.edges.get(vertex);
  }
}

function generateCompleteGraph(numVertices) {
  const graph = new Graph(numVertices);
  for (let thisVertex = 0; thisVertex < numVertices; ++thisVertex) {
    for (let thatVertex = thisVertex; thatVertex < numVertices; ++thatVertex) {
      graph.addEdge(thisVertex, thatVertex);
    }
  }
  return graph;
}

export { Graph, generateCompleteGraph };
