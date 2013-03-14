/* *** ODSATag: DFS *** */
void DFS(Graph G, Node v) {
  PreVisit(G, v);
  G.nodeValue(v, VISITED);
  Node[] nList = G.neighbors(v);
  for (int i=0; i< nList.length; i++)
    if (G.nodeValue(nList[i]) != VISITED)
      DFS(G, nList[i]);
}
/* *** ODSAendTag: DFS *** */
