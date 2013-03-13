/* *** ODSATag: GraphM *** */
class GraphM implements Graph {
  int numV;
  int numE;

  public GraphM() {
    numV = 0;
    numE = 0;
  }

  public int n() {
    return numV;
  }

  public int e() {
    return numE;
  }

  public void setMark(int v, int m) {
  }

  public int getMark(int v) {
    return 0;
  }
}
/* *** ODSAendTag: GraphM *** */
