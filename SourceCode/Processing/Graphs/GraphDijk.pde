final Object VISITED = "Visited";
final int INFINITY = Integer.MAX_VALUE;
String out;
Boolean SUCCESS = true;

void test(Graph G) {
  GraphCreate(G, "GraphDijk.gph");
  int[] D = new int[G.n()];
  int i;
  out = "";
  Dijkstra(G, 0, D);
  for (i=0; i<G.n(); i++)
    out += D[i] + " ";
  if (out.equals("0 5 3 10 18 ") != true) {
    println("ERROR IN Dijkstra!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  DijkstraPQ(G, 0, D);
  if (out.equals("0 5 3 10 18 ") != true) {
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
