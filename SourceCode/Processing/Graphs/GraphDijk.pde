final Object VISITED = "Visited";
final Object UNVISITED = "unVisited";
final int INFINITY = Integer.MAX_VALUE;
String out;
Boolean SUCCESS = true;

void test(Graph G) {
  GraphCreate(G, "GraphDijk.gph");
  int[] D = new int[G.nodeCount()];
  int i;
  out = "";
  Dijkstra(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 18 ") != true) {
    println("ERROR IN Dijkstra!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  DijkstraPQ(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 18 ") != true) {
    println("ERROR IN DijkstraPQ!!!:" + out);
    SUCCESS = false;
  }

  // Now, make the graph disconnected and test it.
  G.removeEdge(2, 4);
  G.removeEdge(3, 4);

  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  Dijkstra(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 2147483647 ") != true) {
    println("ERROR IN Dijkstra!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  for (i=0; i<G.nodeCount(); i++)
   G.setValue(i, UNVISITED);
  DijkstraPQ(G, 0, D);
  for (i=0; i<G.nodeCount(); i++)
    out = out + D[i] + " ";
  if (out.equals("0 5 3 10 2147483647 ") != true) {
    println("ERROR IN DijkstraPQ!!!:" + out);
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
