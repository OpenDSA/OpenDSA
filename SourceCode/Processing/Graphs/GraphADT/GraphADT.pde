/* *** ODSATag: GraphADT *** */
/* Graph ADT */
public interface Graph {         // Graph class ADT

  // Initialize the graph
  // n: The number of vertices
  public void Init(int n);

  // Return the number of vertices
  public int n();

  // Return the current number of edges
  public int e();

  // Adds a new node with value to the graph.
  // Returns the new node
  public Node addNode(Object value);

  // Removes a node from the graph.
  public Node removeNode(Node node);

  // Adds a new edge from fromNode to toNode
  // Returns the new edge
  public Node addEdge(Node fromNode, Node toNode);

  // Removes a node from the graph.
  // Edge is specified using either an object or by its
  // from and to nodes
  public Node removeEdge(Node fromNode, Node toNode);
  public Node removeEdge(Edge edge);

  // Returns true iff the graph has an edge
  public boolean hasEdge(Node fromNode, Node toNode);
  public boolean hasEdge(Edge edge);

  // Returns the Edge object connecting fromNode and toNode,
  // or returns Null if no such edge exists
  public Edge getEdge(Node fromNode, Node toNode);

  // Returns an iterable array of nodes in the graph
  // In addition, it has methods next() and hasNext() for iterating
  // over the values
  public Node[] nodes();

  // Returns an iterable array of edges in the graph
  public Edge[] edges();
}

public interface Node {  // Node class ADT
  // Returns and iterable array of the nodes that this node is
  // connected to.
  Node[] neighbors();

  // Returns the Edge object connecting this node to the given node
  // Returns NULL if no such edge exists
  Edge edgeTo(node);

  // Returns the Edge object connecting the given node to this node
  // Returns NULL if no such edge exists
  Edge edgeFrom(node);

  // Returns or sets the value associated with this node
  Object value();
  Object value(Object newValue);
  
}

public interface Edge { // Edge class ADT
  // Returns or sets the start node of this edge.
  start();
  start(Node node);

  // Returns or sets the end node of this edge.
  end();
  end(Node node);

  // Returns or sets the label attached to this edge.
  Object value();
  Object value(Object newLabel);
}
/* *** ODSAendTag: GraphADT *** */
