boolean SUCCESS = true;

final Object VISITED = "Visited";
String out;

void PreVisit(Graph G, int v) {
  out = out + v + " ";
}

void PostVisit(Graph G, int v) {
  out = out + v + " ";
}


void doTraversal(Graph G, int v) {
  DFS(G, v);
}

void doTraversalBFS(Graph G, int v) {
  BFS(G, v);
}

void test(Graph G) {
  GraphCreate(G, "GraphTrav.gph");
  out = "";
  graphTraverse(G);
  if (out.equals("0 2 1 5 3 3 4 4 5 1 2 0 ") != true) {
    println("ERROR IN DFS!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  graphTraverseBFS(G);
  if (out.equals("0 0 2 2 4 4 1 1 3 3 5 5 ") != true) {
    println("ERROR IN BFS!!!:" + out);
    SUCCESS = false;
  }
}

void graphTraverseBFS(Graph G) {
  int v;
  for (v=0; v<G.nodeCount(); v++)
    G.setValue(v, null); // Initialize
  for (v=0; v<G.nodeCount(); v++)
    if (G.getValue(v) != VISITED)
      doTraversalBFS(G, v);
}

/* *** ODSATag: GraphTrav *** */
void graphTraverse(Graph G) {
  int v;
  for (v=0; v<G.nodeCount(); v++)
    G.setValue(v, null); // Initialize
  for (v=0; v<G.nodeCount(); v++)
    if (G.getValue(v) != VISITED)
      doTraversal(G, v);
}
/* *** ODSAendTag: GraphTrav *** */

void setup() {
  GraphM GM = new GraphM();
  GraphL GL = new GraphL();

  test(GM);
  test(GL);
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  }
  exit();
}
