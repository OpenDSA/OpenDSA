void test(Graph G) {
  GraphCreate(G, "GraphDijk.gph");
  int[] D = new int[G.n()];
  out = "";
  Dijkstra(G, 0, D);
  if (out.equals("0 2 1 5 3 3 4 4 5 1 2 0 ") != true)
    println("ERROR IN DFS!!!:" + out);

// Will add back when DijkstraPQ is ready
//  out = "";
//  DijkstraPQ(G);
//  if (out.equals("0 0 2 2 4 4 1 1 3 3 5 5 ") != true)
//    println("ERROR IN BFS!!!:" + out);
}

void setup() {
  GraphM GM = new GraphM();
  GraphL GL = new GraphL();

  test(GM);
  test(GL);
  PrintWriter output = createWriter("success");
  output.println("Success");
  output.flush();
  output.close();
  exit();
}
