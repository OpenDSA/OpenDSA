/* *** ODSATag: DijkstraPQ *** */
/* Dijkstra's shortest-paths: priority queue version */
static void Dijkstra(Graph G, int s, int[] D) {
  int v;                              // The current vertex
  DijkElem[] E = new DijkElem[G.e()]; // Heap for edges
  E[0] = new DijkElem(s, 0);          // Initial vertex
  MinHeap<DijkElem> H = new MinHeap<DijkElem>(E, 1, G.e());
  for (int i=0; i<G.n(); i++)         // Initialize distance
    D[i] = Integer.MAX_VALUE;
  D[s] = 0;
  for (int i=0; i<G.n(); i++) {       // For each vertex
    do { v = (H.removemin()).vertex(); }    // Get position
      while (G.getMark(v) == VISITED);
    G.setMark(v, VISITED);
    if (D[v] == Integer.MAX_VALUE) return;  // Unreachable
    for (int w = G.first(v); w < G.n(); w = G.next(v, w))
      if (D[w] > (D[v] + G.weight(v, w))) { // Update D
        D[w] = D[v] + G.weight(v, w);
        H.insert(new DijkElem(w, D[w]));
      }
  }
}
/* *** ODSAendTag: DijkstraPQ *** */
