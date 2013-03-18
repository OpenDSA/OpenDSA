/* *** ODSATag: GraphL *** */
// PLACEHOLDER FOR ADJACENCY LIST IMPLEMENTATION
class GraphL implements Graph {

  private class GLink { // Doubly linked list node
    int vertex;
    int weight;
    GLink prev;
    GLink next;

    GLink(int v, int w, GLink p, GLink n) {
      vertex = v;
      weight = w;
      prev = p;
      next = n;
    }
  }

  private GLink[] nodeArray;
  private Object[] nodeValues;
  private int numEdge;

  // Initialize the graph with n vertices
  GraphL() {
  }

  void init(int n) {
    nodeArray = new GLink[n];
    // List headers;
    for (int i=0; i<n; i++) nodeArray[i] = new GLink(-1, -1, null, null);
    nodeValues = new Object[n];
    numEdge = 0;
  }

  // Return the number of vertices
  int n() {
    return nodeArray.length;
  }

  // Return the current number of edges
  int e() {
    return numEdge;
  }

  // Get the value of node with index v
  Object getValue(int v) {
    return nodeValues[v];
  }

  // Set the value of node with index v
  void setValue(int v, Object val) {
    nodeValues[v] = val;
  }
  
  // Return the link in v's neighbor list that preceeds the
  // one with w (or where it would be)
  private GLink find (int v, int w) {
    GLink curr = nodeArray[v];
    while ((curr.next != null) && (curr.next.vertex < w))
      curr = curr.next;
    return curr;
  }

  // Adds a new edge from node v to node w with weight wgt
  void addEdge(int v, int w, int wgt) {
    if (wgt == 0) return; // Can't store weight of 0
    GLink curr = find(v, w);
    if ((curr.next != null) && (curr.next.vertex == w))
      curr.next.weight = wgt;
    else {
      curr.next = new GLink(w, wgt, curr, curr.next);
      if (curr.next.next != null) curr.next.next.prev = curr.next;
    }
    numEdge++;
  }


  // Get the weight value for an edge
  int weight(int v, int w) {
    GLink curr = find(v, w);
    if ((curr.next == null) || (curr.next.vertex != w)) return 0;
    else return curr.next.weight;
  }

  // Removes the edge from the graph.
  void removeEdge(int v, int w) {
    GLink curr = find(v, w);
    if ((curr.next == null) || curr.next.vertex != w) return;
    else {
      curr.next = curr.next.next;
      if (curr.next != null) curr.next.prev = curr;
    }
    numEdge--;
  }

  // Returns true iff the graph has the edge
  boolean hasEdge(int v, int w) {
    return weight(v, w) != 0;
  }

  // Returns an array containing the indicies of the neighbors of v
  int[] neighbors(int v) {
    int cnt = 0;
    GLink curr;
    for (curr = nodeArray[v].next; curr != null; curr = curr.next)
      cnt++;
    int[] temp = new int[cnt];
    cnt = 0;
    for (curr = nodeArray[v].next; curr != null; curr = curr.next)
      temp[cnt++] = curr.vertex;
    return temp;
  }
}
/* *** ODSAendTag: GraphL *** */
