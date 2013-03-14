final Object VISITED = "Visited";

void doTraversal(Graph G, int v) {
  println("doTraversal");
}

/* *** ODSATag: GraphTrav *** */
void graphTraverse(Graph G) {
  Node [] all = G.nodes();
  int v;
  for (v=0; v<G.n(); v++)
    all[v].value(null); // Initialize
  for (v=0; v<G.n(); v++)
    if (all[v].value() != VISITED)
      doTraversal(G, v);
}
/* *** ODSAendTag: GraphTrav *** */

void setup() {
  println("begin");
  GraphM GM = new GraphM();

  graphTraverse(GM);
  println("Testing successful!");
}

