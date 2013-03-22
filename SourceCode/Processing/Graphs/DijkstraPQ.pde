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


/* *** ODSATag: DijkstraPQ *** */
/* Dijkstra's shortest-paths: priority queue version */
void DijkstraPQ(Graph G, int s, int[] D) {
  int v;                              // The current vertex
  DijkElem[] E = new DijkElem[G.e()]; // Heap for edges
  E[0] = new DijkElem(s, 0);          // Initial vertex
  MinHeap H = new MinHeap(E, 1, G.e());
  for (int i=0; i<G.n(); i++)         // Initialize distance
    D[i] = Integer.MAX_VALUE;
  D[s] = 0;
  for (int i=0; i<G.n(); i++) {       // For each vertex
    do { v = (H.removemin()).vertex(); }    // Get position
      while (G.getValue(v) == VISITED);
    G.setValue(v, VISITED);
    if (D[v] == Integer.MAX_VALUE) return;  // Unreachable
    for (int j=0; j<nList.length; j++) {
      int w = nList[j];
      if (D[w] > (D[v] + G.weight(v, w))) { // Update D
        D[w] = D[v] + G.weight(v, w);
        H.insert(new DijkElem(w, D[w]));
      }
    }
  }
}
/* *** ODSAendTag: DijkstraPQ *** */
