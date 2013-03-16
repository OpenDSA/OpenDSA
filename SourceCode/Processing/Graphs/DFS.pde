/* *** ODSATag: DFS *** */
void DFS(Graph G, int v) {
  PreVisit(G, v);
  G.setValue(v, VISITED);
  int[] nList = G.neighbors(v);
  for (int i=0; i< nList.length; i++)
    if (G.getValue(nList[i]) != VISITED)
      DFS(G, nList[i]);
  PostVisit(G, v);
}
/* *** ODSAendTag: DFS *** */
