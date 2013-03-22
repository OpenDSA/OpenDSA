/* *** ODSATag: Kruskal *** */
// Kruskal's MST algorithm
static void Kruskal(Graph G) {
  ParPtrTree A = new ParPtrTree(G.n()); // Equivalence array
  KruskalElem[] E = new KruskalElem[G.e()]; // Minheap array
  int edgecnt = 0; // Count of edges

  for (int i=0; i<G.n(); i++)    // Put edges in the array
    for (int w = G.first(i); w < G.n(); w = G.next(i, w))
      E[edgecnt++] = new KruskalElem(G.weight(i, w), i, w);
  MinHeap<KruskalElem> H =
              new MinHeap<KruskalElem>(E, edgecnt, edgecnt);
  int numMST = G.n();            // Initially n classes
  for (int i=0; numMST>1; i++) { // Combine equiv classes
    KruskalElem temp = H.removemin(); // Next cheapest
    int v = temp.v1();  int u = temp.v2();
    if (A.differ(v, u)) {        // If in different classes
      A.UNION(v, u);             // Combine equiv classes
      AddEdgetoMST(v, u);  // Add this edge to MST
      numMST--;                  // One less MST
    }
  }
}
/* *** ODSAendTag: Kruskal *** */
