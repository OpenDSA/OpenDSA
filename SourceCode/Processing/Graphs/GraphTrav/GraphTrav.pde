final int UNVISITED = 0;

void doTraversal(Graph G, int v) {
  println("doTraversal");
}

/* *** ODSATag: GraphTrav *** */
void graphTraverse(Graph G) {
  int v;
  for (v=0; v<G.n(); v++)
    G.setMark(v, UNVISITED); // Initialize
  for (v=0; v<G.n(); v++)
    if (G.getMark(v) == UNVISITED)
      doTraversal(G, v);
}
/* *** ODSAendTag: GraphTrav *** */

void setup() {
  println("begin");
  GraphM GM;

  graphTraverse(G);
  println("Testing successful!");
}
