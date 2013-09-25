boolean SUCCESS = true;

void visit(BinNode rt) {
  print(rt.element() + " ");
}

/* *** ODSATag: count *** */
int count(BinNode rt) {
  if (rt == null) return 0;  // Nothing to count
  return 1 + count(rt.left()) + count(rt.right());
}
/* *** ODSAendTag: count *** */

void setup() {
  BSTNode rt1 = null;
  BSTNode rt2 = new BSTNode(new KVPair(5, "John"));

  int temp = count(rt1);
  if(!checkBST(rt2, -1, 999999)) SUCCESS = false;
  rt2.setLeft(new BSTNode(new KVPair(10, "Jack")));
  if(checkBST(rt2, -1, 999999)) SUCCESS = false;

  rt1 = new BSTNode(5);
  rt1.setLeft(new BSTNode(3));
  rt1.setRight(new BSTNode(6));
  preorder(rt1);
  println();
  preorder2(rt1);
  println();

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
