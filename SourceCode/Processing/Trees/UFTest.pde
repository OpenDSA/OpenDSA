boolean SUCCESS = true;

public void testUF() {
  String out;
  ParPtrTree it = new ParPtrTree(10);

  if (it.differ(1, 2)) it.UNION(1, 2);
  if (it.differ(3, 4)) it.UNION(3, 4);
  if (it.differ(6, 5)) it.UNION(6, 5);
  if (it.differ(4, 1)) it.UNION(4, 1);
  if (it.differ(4, 1)) it.UNION(4, 1);
  it.UNION(4, 1);
  out = it.print();
  if (out.equals("-1 3 1 -1 3 6 -1 -1 -1 -1 ") != true) {
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
