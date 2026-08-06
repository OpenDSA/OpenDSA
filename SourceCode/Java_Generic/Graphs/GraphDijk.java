static final Object VISITED = "Visited";
static final Object UNVISITED = "unVisited";
static final int INFINITY = Integer.MAX_VALUE;
static String out;
static Boolean SUCCESS = true;

static void test(Graph G) throws FileNotFoundException {
  GraphCreate(G, "GraphDijk.gph");
  int[] D = new int[G.nodeCount()];
  int i;
  out = "";
  Dijkstra(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 18 ") != true) {
    System.out.println("ERROR IN Dijkstra!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  DijkstraPQ(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 18 ") != true) {
    System.out.println("ERROR IN DijkstraPQ!!!:" + out);
    SUCCESS = false;
  }

  // Now, make the graph disconnected and test it.
  G.removeEdge(2, 4);
  G.removeEdge(3, 4);

  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  Dijkstra(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 2147483647 ") != true) {
    System.out.println("ERROR IN Dijkstra!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  DijkstraPQ(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 2147483647 ") != true) {
    System.out.println("ERROR IN DijkstraPQ!!!:" + out);
    SUCCESS = false;
  }

}

public static void main(String args[]) throws IOException {
  GraphM GM = new GraphM();
  GraphL GL = new GraphL();

  test(GM);
  test(GL);
  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Graph Traversal code testing failed");
  }
}
}
