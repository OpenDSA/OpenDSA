/* *** ODSATag: MinVertex *** */
// Find the unvisited vertex with the smalled distance
int minVertex(Graph G, int[] D) {
  int v = 0;  // Initialize v to any unvisited vertex;
  for (int i=0; i<G.nodeCount(); i++)
    if (G.getValue(i) != VISITED) { v = i; break; }
  for (int i=0; i<G.nodeCount(); i++)  // Now find smallest value
    if ((G.getValue(i) != VISITED) && (D[i] < D[v]))
      v = i;
  return v;
}
/* *** ODSAendTag: MinVertex *** */


/* *** ODSATag: Prims *** */
// Compute shortest path distances from s, store them in D.
// V[i] will hold the index for the vertex that is i's parent in the MCST
void Prim(Graph G, int s, int[] D, int[] V) {
  for (int i=0; i<G.nodeCount(); i++)    // Initialize
    D[i] = INFINITY;
  D[s] = 0;
  for (int i=0; i<G.nodeCount(); i++) {  // Process the vertices
    int v = minVertex(G, D);     // Find next-closest vertex
    G.setValue(v, VISITED);
    if (D[v] == INFINITY) return; // Unreachable
    if (v != s) AddEdgetoMST(V[v], v);
    int[] nList = G.neighbors(v);
    for (int j=0; j<nList.length; j++) {
      int w = nList[j];
      if (D[w] > G.weight(v, w)) {
        D[w] = G.weight(v, w);
        V[w] = v;
      }
    }
  }
}
/* *** ODSAendTag: Prims *** */
