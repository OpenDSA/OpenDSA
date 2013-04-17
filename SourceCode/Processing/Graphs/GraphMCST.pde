final Object VISITED = "Visited";
final Object UNVISITED = "Unvisited";
final int INFINITY = Integer.MAX_VALUE;
String out;
Boolean SUCCESS = true;

void AddEdgetoMST(int v1, int v2) {
  out = out + v1 + " " + v2 + " ";
}

void test(Graph G) {
  GraphCreate(G, "GraphTrav.gph");
  int[] D = new int[G.nodeCount()];
  int[] V = new int[G.nodeCount()];
  int i;
  out = "";
  Prim(G, 0, D, V);
  for (i=0; i<G.nodeCount(); i++)
    out = out + V[i] + " ";
  if (out.equals("0 2 2 3 2 5 5 4 2 1 0 2 3 2 5 4 ") != true) {
    println("ERROR IN Prim!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
    G.setValue(i, UNVISITED);
  V = new int[G.nodeCount()];
  PrimPQ(G, 0, D, V);
  for (i=0; i<G.nodeCount(); i++)
    out =  out + V[i] + " ";
  if (out.equals("0 2 2 3 2 5 5 4 2 1 0 2 3 2 5 4 ") != true) {
    println("ERROR IN PrimPQ!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  Kruskal(G);
  if (out.equals("5 4 3 2 2 5 2 1 0 2 ") != true) {
    println("ERROR IN Kruskal!!!:" + out);
    SUCCESS = false;
  }

  // Now, make the graph disconnected and test it.
  G.removeEdge(2, 3);
  G.removeEdge(3, 2);
  G.removeEdge(3, 5);
  G.removeEdge(5, 3);

  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  V = new int[G.nodeCount()];
  Prim(G, 0, D, V);
  for (i=0; i<G.nodeCount(); i++)
    out = out + V[i] + " ";
  if (out.equals("0 2 2 5 5 4 2 1 0 2 5 0 5 4 ") != true) {
    println("ERROR IN Prim disconnect test!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  V = new int[G.nodeCount()];
  PrimPQ(G, 0, D, V);
  for (i=0; i<G.nodeCount(); i++)
    out =  out + V[i] + " ";
  if (out.equals("0 2 2 5 5 4 2 1 0 2 5 0 5 4 ") != true) {
    println("ERROR IN PrimPQ disconnect test!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  Kruskal(G);
  if (out.equals("4 5 5 2 1 2 2 0 ") != true) {
    println("ERROR IN Kruskal disconnect test!!!:" + out);
    SUCCESS = false;
  }
}

void setup() {
  GraphM GM = new GraphM();
  GraphL GL = new GraphL();

  test(GM);
  test(GL);
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  }
  exit();
}
