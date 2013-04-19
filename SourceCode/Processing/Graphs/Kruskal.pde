/* *** ODSATag: Kruskal *** */
// Kruskal's MST algorithm
void Kruskal(Graph G) {
  ParPtrTree A = new ParPtrTree(G.nodeCount()); // Equivalence array
  KVPair[] E = new KVPair[G.edgeCount()];       // Minheap array
  int edgecnt = 0; // Count of edges

  for (int i=0; i<G.nodeCount(); i++) {         // Put edges in the array
    int[] nList = G.neighbors(i);
    for (int w=0; w<nList.length; w++)
      E[edgecnt++] = new KVPair(G.weight(i, nList[w]), new int[]{i,nList[w]});
  }
  MinHeap H = new MinHeap(E, edgecnt, edgecnt);
  int numMST = G.nodeCount();                   // Initially n disjoint classes
  for (int i=0; numMST>1; i++) {        // Combine equivalence classes
    KVPair temp = H.removemin();        // Next cheapest edge
    if (temp == null) return;           // Must have disconnected vertices
    int v = ((int[])temp.value())[0];
    int u = ((int[])temp.value())[1];
    if (A.differ(v, u)) {               // If in different classes
      A.UNION(v, u);                    // Combine equiv classes
      AddEdgetoMST(v, u);               // Add this edge to MST
      numMST--;                         // One less MST
    }
  }
}
/* *** ODSAendTag: Kruskal *** */
