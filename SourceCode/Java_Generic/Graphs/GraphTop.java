static boolean SUCCESS = true;

static final Object VISITED = "Visited";
static String out;

static void printout(int v) {
  out = out + v + " ";
}

static void test(Graph G) throws FileNotFoundException {
  GraphCreate(G, "GraphTop.gph");
  out = "";
  topsortDFS(G);
  if (out.equals("6 4 3 5 1 2 0 ") != true) {
    System.out.println("ERROR IN DFS!!!:" + out);
    SUCCESS = false;
  }
  out = "";
  topsortBFS(G);
  if (out.equals("0 1 2 5 3 4 6 ") != true) {
    System.out.println("ERROR IN BFS!!!:" + out);
    SUCCESS = false;
  }
}

public static void main(String args[]) throws IOException {
  GraphM GM = new GraphM();
  GraphL GL = new GraphL();

  test(GM);
  test(GL);
  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Graph Traversal code testing failed");
  }
}
}
