/* *** ODSATag: MinVertex *** */
// Find the unvisited vertex with the smalled distance
int minVertex(Graph G, int[] D) {
  int v = 0;  // Initialize v to any unvisited vertex;
  for (int i=0; i<G.n(); i++)
    if (G.getValue(i) != VISITED) { v = i; break; }
  for (int i=0; i<G.n(); i++)  // Now find smallest value
    if ((G.getValue(i) != VISITED) && (D[i] < D[v]))
      v = i;
  return v;
}
/* *** ODSAendTag: MinVertex *** */


/* *** ODSATag: Prims *** */
// Compute shortest path distances from s, store them in D
void Prim(Graph G, int s, int[] D, int[] V) {
  for (int i=0; i<G.n(); i++)    // Initialize
    D[i] = INFINITY;
  D[s] = 0;
  for (int i=0; i<G.n(); i++) {  // Process the vertices
    int v = minVertex(G, D);     // Find next-closest vertex
    G.setValue(v, VISITED);
    if (v != s) AddEdgetoMST(V[v], v);
    if (D[v] == INFINITY) return; // Unreachable
    int[] nList = G.neighbors(v);
    for (int j=0; j<nList.length; j++) {
      int w = nList[j];
      if (D[w] > G.weight(v, w))) {
        D[w] = G.weight(v, w);
        V[w] = v;
      }
    }
  }
}
/* *** ODSAendTag: Prims *** */
