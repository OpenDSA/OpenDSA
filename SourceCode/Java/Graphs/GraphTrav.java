static boolean SUCCESS = true;

static final Object VISITED = "Visited";
static String out;

static void PreVisit(Graph G, int v) {
  out = out + v + " ";
}

static void PostVisit(Graph G, int v) {
  out = out + v + " ";
}

static void doTraversal(Graph G, int v) {
  DFS(G, v);
}

static void doTraversalBFS(Graph G, int v) {
  BFS(G, v);
}

static void test(Graph G) throws FileNotFoundException {
  GraphCreate(G, "GraphTrav.gph");
  out = "";
  graphTraverse(G);
  if (out.equals("0 2 1 5 3 3 4 4 5 1 2 0 ") != true) {
    System.out.println("ERROR IN DFS!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  graphTraverseBFS(G);
  if (out.equals("0 0 2 2 4 4 1 1 3 3 5 5 ") != true) {
    System.out.println("ERROR IN BFS!!!:" + out);
    SUCCESS = false;
  }
}

static void graphTraverseBFS(Graph G) {
  int v;
  for (v=0; v<G.nodeCount(); v++)
    G.setValue(v, null); // Initialize
  for (v=0; v<G.nodeCount(); v++)
    if (G.getValue(v) != VISITED)
      doTraversalBFS(G, v);
}

/* *** ODSATag: GraphTrav *** */
static void graphTraverse(Graph G) {
  int v;
  for (v=0; v<G.nodeCount(); v++)
    G.setValue(v, null); // Initialize
  for (v=0; v<G.nodeCount(); v++)
    if (G.getValue(v) != VISITED)
      doTraversal(G, v);
}
/* *** ODSAendTag: GraphTrav *** */

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
