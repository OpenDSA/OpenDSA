/* *** ODSATag: TopsortDFS *** */
void topsortDFS(Graph G) {
  int v;
  for (v=0; v<G.nodeCount(); v++)
    G.setValue(v, null); // Initialize
  for (v=0; v<G.nodeCount(); v++)
    if (G.getValue(v) != VISITED)
      tophelp(G, v);
}

void tophelp(Graph G, int v) {
  G.setValue(v, VISITED);
  int[] nList = G.neighbors(v);
  for (int i=0; i< nList.length; i++)
    if (G.getValue(nList[i]) != VISITED)
      tophelp(G, nList[i]);
  printout(v);
}
/* *** ODSAendTag: TopsortDFS *** */
