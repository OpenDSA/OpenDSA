boolean SUCCESS = true;

void testUF() {
  String out;
  ParPtrTree it = new ParPtrTree(10);

  it.UNION(0, 1);
  it.UNION(2, 7);
  it.UNION(6, 5);
  it.UNION(3, 4);
  it.UNION(8, 5);
  it.UNION(7, 0);
  it.UNION(4, 6);
  it.UNION(7, 4);

  out = it.print();
  if (out.equals(output) != true) {
    SUCCESS = false;
    println("Error in Union/FIND!! " + out);
  }
}

void setup() {
  testUF();
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  }
  exit();
}
