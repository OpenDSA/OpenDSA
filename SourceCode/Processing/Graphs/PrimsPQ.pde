/* *** ODSATag: DijkElement *** */
class DijkElem {
  private int vertex, weight;

  DijkElem(int v, int w) {
    vertex = v;
    weight = w;
  }

  int vertex() { return vertex; }
  int weight() { return weight; }
}
/* *** ODSAendTag: DijkElement *** */


/* *** ODSATag: PrimsPQ *** */
// Prims MCST algorithm: priority queue version
void PrimPQ(Graph G, int s, int[] D, int[] V) {
  int v;                              // The current vertex
  DijkElem[] E = new DijkElem[G.e()]; // Heap for edges
  E[0] = new DijkElem(s, 0);          // Initial vertex
  MinHeap H = new MinHeap(E, 1, G.e());
  for (int i=0; i<G.n(); i++)         // Initialize distance
    D[i] = INFINITY;
  D[s] = 0;
  for (int i=0; i<G.n(); i++) {       // For each vertex
    do { v = (H.removemin()).vertex(); }    // Get position
      while (G.getValue(v) == VISITED);
    G.setValue(v, VISITED);
    if (v != s) AddEdgetoMST(V[v], v); // Add edge to MST
    if (D[v] == INFINITY) return;  // Unreachable
    for (int j=0; j<nList.length; j++) {
      int w = nList[j];
      if (D[w] > G.weight(v, w)) { // Update D
        D[w] = G.weight(v, w);
        V[w] = v;                  // Where it came from
        H.insert(new DijkElem(w, D[w]));
      }
    }
  }
}
/* *** ODSAendTag: DijkstraPQ *** */
