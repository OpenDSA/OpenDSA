boolean SUCCESS = true;

void setup() {
  AList AL = new AList();

  ListIndex where = AL.getStart();
  println("Length: " + AL.length());

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
