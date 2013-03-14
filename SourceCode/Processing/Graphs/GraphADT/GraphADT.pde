/* *** ODSATag: GraphADT *** */
/* Graph ADT */
public interface Graph {         // Graph class ADT

  // Initialize the graph with n vertices
  public Graph(int n);

  // Return the number of vertices
  public int n();

  // Return the current number of edges
  public int e();

  // Adds a new edge from node v to node w
  // Returns the new edge
  public Edge addEdge(int v, int w);

  // Get or set the value of node with index v
  public Object nodeValue(v);
  public void nodeValue(v, Object val);

  // Removes the edge from the graph.
  public void removeEdge(int v, int w);
  public void removeEdge(Edge e);

  // Returns true iff the graph has the edge
  public boolean hasEdge(int v, int w);
  public boolean hasEdge(Edge edge);

  // Returns the Edge object connecting node indicies v and w,
  // or returns Null if no such edge exists
  public Edge getEdge(int v, int w);

  // Returns an array with all edges in the graph
  public Edge[] edges();

  // Returns an array containing the indicies of the neighbors of v
  public int[] neighbors(int v);
}

public interface Edge { // Edge class ADT
  // Returns or sets the start node of this edge.
  start();
  start(int v);

  // Returns or sets the end node of this edge.
  end();
  end(int w);

  // Returns or sets the value associated with this edge.
  Object value();
  Object value(Object val);
}
/* *** ODSAendTag: GraphADT *** */
