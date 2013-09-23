boolean SUCCESS = true;


void setup() {
  String string1 = "Hello1";
  String string2 = "Another string";

  VarLeafNode temp1 = new VarLeafNode(string1);
  VarLeafNode temp2 = new VarLeafNode(string2);
  VarIntlNode root = new VarIntlNode(new Character('+'), temp1, temp2);
  Visit.VisitInit();
  traverse(root);
  String out = Visit.VisitOut();
  if (!out.equals("+ Hello1 Another string "))
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
