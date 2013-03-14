/* *** ODSATag: GraphM *** */
class GraphM implements Graph {
  private int[][] matrix;
  private Object[] nodeValues;
  private int numEdge;

  public GraphM(int n) {
    matrix = new int[n][n];
    nodeValues = new Object[n];
    numEdge = 0;
  }

  public int n() {
    return nodeValues.length;
  }

  public int e() {
    return numEdge;
  }
  
  // Adds a new edge from node v to node w
  // Returns the new edge
  Edge addEdge(int v, int w) {
    matrix[v][w] = ??;
    return new Edge(v, w, matrix[v][w]);
  }

  // Get or set the value of node with index v
  Object nodeValue(v) {
    return nodeValues[v];
  }
  
  void nodeValue(v, Object val) {
    nodeValues[v] = val;
  }

  // Removes the edge from the graph.
  void removeEdge(int v, int w) {
    matrix[v][w] = ??;
  }
  
  void removeEdge(Edge e) {
    matrix[??][??] = ??;
  }

  // Returns true iff the graph has the edge
  boolean hasEdge(int v, int w) {
    return matrix[v][w] != ??;
  }
  
  boolean hasEdge(Edge edge) {
    return matrix[??][??] != ??;
  }

  // Returns the Edge object connecting node indicies v and w,
  // or returns Null if no such edge exists
  Edge getEdge(int v, int w) {
    return new Edge(v, w, matrix[v][w]);
  }

  // Returns an array with all edges in the graph
  Edge[] edges() {
    println("METHOD edges() NOT YET IMPLEMENTED");
    return null;
  }

  // Returns an array containing the indicies of the neighbors of v
  int[] neighbors(int v) {
    int i;
    int count = 0;
    for (i=0; i<nodeValues.length; i++)
      if (matrix[v][i] != ??) count++;
    temp = new int[count];
    for (i=0; i<nodeValues.length; i++)
      if (matrix[v][i] != ??)
        temp[count++] = i;
    return temp;         
  }
}
/* *** ODSAendTag: GraphM *** */
