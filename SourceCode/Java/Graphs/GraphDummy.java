import java.io.*;

// Tester for Graph class code
public class GraphDummy {

static final Object VISITED = "Visited";

static void DoSomething() {
}


static void Neighbor(Graph G) {
  int v = 0;
/* *** ODSATag: GraphNeighbor *** */
  int[] nList = G.neighbors(v);
  for (int i=0; i< nList.length; i++)
    if (G.getValue(nList[i]) != VISITED)
      DoSomething();
/* *** ODSAendTag: GraphNeighbor *** */
}

public static void main(String args[]) throws IOException {
  Graph G1 = new GraphM();
  G1.init(1);
  Neighbor(G1);

  Graph G2 = new GraphL();
  G2.init(1);
  Neighbor(G2);

  PrintWriter output = new PrintWriter("success");
  output.println("Success");
  output.flush();
  output.close();
  System.out.println("Success!");
}
}
