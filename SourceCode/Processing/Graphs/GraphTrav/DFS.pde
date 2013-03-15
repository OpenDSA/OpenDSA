void PreVisit(Graph G, int v) {
  out = out + v + " ";
}

void PostVisit(Graph G, int v) {
  out = out + v + " ";
}


/* *** ODSATag: DFS *** */
void DFS(Graph G, int v) {
  PreVisit(G, v);
  G.nodeValue(v, VISITED);
  int[] nList = G.neighbors(v);
  for (int i=0; i< nList.length; i++)
    if (G.nodeValue(nList[i]) != VISITED)
      DFS(G, nList[i]);
  PostVisit(G, v);
}
/* *** ODSAendTag: DFS *** */
