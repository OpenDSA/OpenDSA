boolean SUCCESS = true;

  // Visit nodes via inorder traversal
/* *** ODSATag: inorder *** */
void inorder(BinNode rt) {
    if (rt == null) return null;
    inorder(rt.left());
    visit(rt);
    inorder(rt.right());
  }
/* *** ODSAendTag: inorder *** */

  // Visit nodes via postorder traversal
/* *** ODSATag: postorder *** */
void postorder(BinNode rt) {
    if (rt == null) return null;
    postorder(rt.left());
    postorder(rt.right());
    visit(rt);
  }
/* *** ODSAendTag: postorder *** */

/* *** ODSATag: preorder *** */
void preorder(BinNode rt) {
  if (rt == null) return; // Empty subtree - do nothing
  visit(rt);              // Process root node
  preorder(rt.left());    // Process all nodes in left
  preorder(rt.right());   // Process all nodes in right
}
/* *** ODSAendTag: preorder *** */

/* *** ODSATag: preorder2 *** */
// This is a bad idea
void preorder2(BinNode rt) {
  visit(rt);
  if (rt.left() != null) preorder2(rt.left());
  if (rt.right() != null) preorder2(rt.right());
}
/* *** ODSAendTag: preorder2 *** */

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
