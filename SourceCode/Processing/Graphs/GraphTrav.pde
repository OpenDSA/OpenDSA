final Object VISITED = "Visited";
String out;

void doTraversal(Graph G, int v) {
  DFS(G, v);
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
    println("ERROR!!!");
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

  test(GM);
  println("Test done");
  exit();
}

