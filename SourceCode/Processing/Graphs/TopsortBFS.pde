/* *** ODSATag: TopsortBFS *** */
void topsortBFS(Graph G) {          // Topological sort: Queue
  Queue Q = new LQueue(G.nodeCount());
  int[] Count = new int[G.nodeCount()];
  int[] nList;
  int v;
  for (v=0; v<G.nodeCount(); v++) Count[v] = 0; // Initialize
  for (v=0; v<G.nodeCount(); v++) { // Process every edge
    nList = G.neighbors(v);
    for (int i=0; i< nList.length; i++)
      Count[nList[i]]++;            // Add to v's prereq count
  }
  for (v=0; v<G.nodeCount(); v++)   // Initialize Queue
    if (Count[v] == 0)              // V has no prerequisites
      Q.enqueue(v);
  while (Q.length() > 0) {          // Process the vertices
    v = (Integer)Q.dequeue();
    printout(v);                    // PreVisit for Vertex V
    nList = G.neighbors(v);
    for (int i=0; i< nList.length; i++) {
      Count[nList[i]]--;            // One less prerequisite
      if (Count[nList[i]] == 0)     // This vertex is now free
        Q.enqueue(nList[i]);
    }
  }
}
/* *** ODSAendTag: TopsortBFS *** */
