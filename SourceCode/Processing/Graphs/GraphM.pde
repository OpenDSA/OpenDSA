/* *** ODSATag: GraphM *** */
class GraphM implements Graph {
  private int[][] matrix;
  private Object[] nodeValues;
  private int numEdge;

  // No real constructor needed
  GraphM() { }

  // Initialize the graph with n vertices
  void init(int n) {
    matrix = new int[n][n];
    nodeValues = new Object[n];
    numEdge = 0;
  }

  // Return the number of vertices
  int nodeCount() { return nodeValues.length; }

  // Return the current number of edges
  int edgeCount() { return numEdge; }
  
  // Get the value of node with index v
  Object getValue(int v) { return nodeValues[v]; }
  
  // Set the value of node with index v
  void setValue(int v, Object val) { nodeValues[v] = val; }

  // Adds a new edge from node v to node w
  // Returns the new edge
  void addEdge(int v, int w, int wgt) {
    if (wgt == 0) return; // Can't store weight of 0
    matrix[v][w] = wgt;
    numEdge++;
  }

  // Get the weight value for an edge
  int weight(int v, int w) { return matrix[v][w]; }

  // Removes the edge from the graph.
  void removeEdge(int v, int w) {
    matrix[v][w] = 0;
    numEdge--;
  }
  
  // Returns true iff the graph has the edge
  boolean hasEdge(int v, int w) { return matrix[v][w] != 0; }

  // Returns an array containing the indicies of the neighbors of v
  int[] neighbors(int v) {
    int i;
    int count = 0;
    int[] temp;
    
    for (i=0; i<nodeValues.length; i++)
      if (matrix[v][i] != 0) count++;
    temp = new int[count];
    for (i=0, count=0; i<nodeValues.length; i++)
      if (matrix[v][i] != 0) temp[count++] = i;
    return temp;
  }
}
/* *** ODSAendTag: GraphM *** */
