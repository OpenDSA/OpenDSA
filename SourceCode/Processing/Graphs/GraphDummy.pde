final Object VISITED = "Visited";
Graph G;

void DoSomething() {
}


void Neighbor() {
  int v = 0;
/* *** ODSATag: GraphNeighbor *** */
  int[] nList = G.neighbors(v);
  for (int i=0; i< nList.length; i++)
    if (G.getValue(nList[i]) != VISITED)
      DoSomething();
/* *** ODSAendTag: GraphNeighbor *** */
}

void setup() {
  G = new GraphM();
  G.init(1);

  Neighbor();
  PrintWriter output = createWriter("success");
  output.println("Success");
  output.flush();
  output.close();
  exit();
}
