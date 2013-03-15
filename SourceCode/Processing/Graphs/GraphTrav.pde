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
  G.addEdge(0, 4, 9);
  G.addEdge(4, 0, 9);
  G.addEdge(0, 2, 7);
  G.addEdge(2, 0, 7);
  G.addEdge(2, 3, 1);
  G.addEdge(3, 2, 1);
  G.addEdge(1, 2, 5);
  G.addEdge(2, 1, 5);
  G.addEdge(2, 5, 2);
  G.addEdge(5, 2, 2);
  G.addEdge(1, 5, 6);
  G.addEdge(5, 1, 6);
  G.addEdge(3, 5, 2);
  G.addEdge(5, 3, 2);
  G.addEdge(4, 5, 1);
  G.addEdge(5, 4, 1);
  out = "";
  graphTraverse(G);
  if (out.equals("0 2 1 5 3 3 4 4 5 1 2 0 ") != true)
    println("ERROR IN DFS!!!");
  out = "";
  graphTraverseBFS(G);
  if (out.equals("0 2 1 5 3 3 4 4 5 1 2 0 ") != true)
    println("ERROR IN BFS!!!");
}

void graphTraverseBFS(Graph G) {
  int v;
  for (v=0; v<G.n(); v++)
    G.nodeValue(v, null); // Initialize
  for (v=0; v<G.n(); v++)
    if (G.nodeValue(v) != VISITED)
      doTraversalBFS(G, v);
}

/* *** ODSATag: GraphTrav *** */
void graphTraverse(Graph G) {
  int v;
  for (v=0; v<G.n(); v++)
    G.nodeValue(v, null); // Initialize
  for (v=0; v<G.n(); v++)
    if (G.nodeValue(v) != VISITED)
      doTraversal(G, v);
}
/* *** ODSAendTag: GraphTrav *** */

void setup() {
  GraphM GM = new GraphM(6);
  GraphL GL = new GraphL(6);

  test(GM);
  test(GL);
  println("Test done");
  exit();
}
