boolean SUCCESS = true;

final Object VISITED = "Visited";
String out;

void printout(int v) {
  out = out + v + " ";
}

void test(Graph G) {
  GraphCreate(G, "GraphTop.gph");
  out = "";
  topsortDFS(G);
  if (out.equals("6 4 3 5 1 2 0 ") != true) {
    println("ERROR IN DFS!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  topsortBFS(G);
  if (out.equals("0 1 2 5 3 4 6 ") != true) {
    println("ERROR IN BFS!!!:" + out);
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
