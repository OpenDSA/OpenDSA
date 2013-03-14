/* *** ODSATag: GraphADT *** */
interface Graph { // Graph class ADT
  // Initialize the graph with n vertices
  Graph(int n);

  // Return the number of vertices
  int n();

  // Return the current number of edges
  int e();

  // Adds a new edge from node v to node w
  // Returns the new edge
  Edge addEdge(int v, int w);

  // Get or set the value of node with index v
  Object nodeValue(v);
  void nodeValue(v, Object val);

  // Removes the edge from the graph.
  void removeEdge(int v, int w);
  void removeEdge(Edge e);

  // Returns true iff the graph has the edge
  boolean hasEdge(int v, int w);
  boolean hasEdge(Edge edge);

  // Returns the Edge object connecting node indicies v and w,
  // or returns Null if no such edge exists
  Edge getEdge(int v, int w);

  // Returns an array with all edges in the graph
  Edge[] edges();

  // Returns an array containing the indicies of the neighbors of v
  int[] neighbors(int v);
}

class Edge { // Edge class implementation
  
  Edge(int sv, int ev, Object theVal) {
    s = sv;
    e = ev;
    val = theVal;
  }
  
  // Returns or sets the start node of this edge.
  int start() {
    return s;
  }
  
  void start(int v) {
    s = v;
  }

  // Returns or sets the end node of this edge.
  int end() {
    return e;
  }
  
  void end(int w) {
    e = w;
  }
  
  PROBLEM: HOW TO SET/CHANGE THE WEIGHT OF AN EDGE? MUST AFFECT THE GRAPH,
  NOT JUST AN EDGE OBJECT. SEE MY BOOK ADT.
  
  // Returns or sets the value associated with this edge.
  Object value();
  Object value(Object val);
}
/* *** ODSAendTag: GraphADT *** */

