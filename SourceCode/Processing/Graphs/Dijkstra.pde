/* *** ODSATag: MinVertex *** */
// Find the unvisited vertex with the smalled distance
static int minVertex(Graph G, int[] D) {
  int v = 0;  // Initialize v to any unvisited vertex;
  for (int i=0; i<G.n(); i++)
    if (G.getMark(i) == UNVISITED) { v = i; break; }
  for (int i=0; i<G.n(); i++)  // Now find smallest value
    if ((G.getMark(i) == UNVISITED) && (D[i] < D[v]))
      v = i;
  return v;
}
/* *** ODSAendTag: MinVertex *** */


/* *** ODSATag: GraphDijk1 *** */
// Compute shortest path distances from s, store them in D
static void Dijkstra(Graph G, int s, int[] D) {
  for (int i=0; i<G.n(); i++)    // Initialize
    D[i] = Integer.MAX_VALUE;
  D[s] = 0;
  for (int i=0; i<G.n(); i++) {  // Process the vertices
    int v = minVertex(G, D);     // Find next-closest vertex
    G.setMark(v, VISITED);
    if (D[v] == Integer.MAX_VALUE) return; // Unreachable
    for (int w = G.first(v); w < G.n(); w = G.next(v, w))
      if (D[w] > (D[v] + G.weight(v, w)))
        D[w] = D[v] + G.weight(v, w);
  }
}
/* *** ODSAendTag: GraphDijk1 *** */
