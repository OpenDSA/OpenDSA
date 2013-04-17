/* *** ODSATag: DijkstraPQ *** */
// Dijkstra's shortest-paths: priority queue version
void DijkstraPQ(Graph G, int s, int[] D) {
  int v;                                 // The current vertex
  KVPair[] E = new KVPair[G.edgeCount()];        // Heap for edges
  E[0] = new KVPair(0, s);               // Initial vertex
  MinHeap H = new MinHeap(E, 1, G.edgeCount());
  for (int i=0; i<G.nodeCount(); i++)            // Initialize distance
    D[i] = INFINITY;
  D[s] = 0;
  for (int i=0; i<G.nodeCount(); i++) {          // For each vertex
    do { KVPair temp = H.removemin();
         if (temp == null) return;       // Unreachable nodes exist
         v = (Integer)temp.value(); } // Get position
      while (G.getValue(v) == VISITED);
    G.setValue(v, VISITED);
    if (D[v] == INFINITY) return;        // Unreachable
    int[] nList = G.neighbors(v);
    for (int j=0; j<nList.length; j++) {
      int w = nList[j];
      if (D[w] > (D[v] + G.weight(v, w))) { // Update D
        D[w] = D[v] + G.weight(v, w);
        H.insert(D[w], w);
      }
    }
  }
}
/* *** ODSAendTag: DijkstraPQ *** */
