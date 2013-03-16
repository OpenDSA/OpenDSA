/* *** ODSATag: BFS *** */
void BFS(Graph G, int v) {
  Queue Q = new LQueue(G.n());
  Q.enqueue(v);
  G.setValue(v, VISITED);
  while (Q.length() > 0) { // Process each vertex on Q
    int v = Q.dequeue();
    PreVisit(G, v);
    int[] nList = G.neighbors(v);
    for (int i=0; i< nList.length; i++)
      if (G.getValue(w) != VISITED) { // Put neighbors on Q
        G.setValue(w, VISITED);
        Q.enqueue(w);
      }
    PostVisit(G, v);
  }
}
/* *** ODSAendTag: BFS *** */
