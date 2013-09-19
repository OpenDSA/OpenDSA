boolean SUCCESS = true;

void visit(BinNode rt) { }

/* *** ODSATag: preorder *** */
void preorder(BinNode rt) {
  if (rt == null) return; // Empty subtree - do nothing
  visit(rt);              // Process root node
  preorder(rt.left());    // Process all nodes in left
  preorder(rt.right());   // Process all nodes in right
}
/* *** ODSAendTag: preorder *** */

/* *** ODSATag: preorder2 *** */
void preorder2(BinNode rt) {
  visit(rt);
  if (rt.left() != null) preorder2(rt.left());
  if (rt.right() != null) preorder2(rt.right());
}
/* *** ODSAendTag: preorder2 *** */

/* *** ODSATag: count *** */
int count(BinNode rt) {
  if (rt == null) return 0;  // Nothing to count
  return 1 + count(rt.left()) + count(rt.right());
}
/* *** ODSAendTag: count *** */

/* *** ODSATag: checkBST *** */
boolean checkBST(BSTNode rt, int low, int high) {
  if (rt == null) return true; // Empty subtree
  int rootkey = (Integer)((KVPair)rt.element()).key();
  if ((rootkey < low) || (rootkey > high))
    return false; // Out of range
  if (!checkBST(rt.left(), low, rootkey))
    return false; // Left side failed
  return checkBST(rt.right(), rootkey, high);
}
/* *** ODSAendTag: checkBST *** */

void setup() {
  BinNode rt1 = null;
  BSTNode rt2 = new BSTNode(new KVPair(5, "John"));

  int temp = count(rt1);
  if(!checkBST(rt2, -1, 999999)) SUCCESS = false;
  rt2.setLeft(new BSTNode(new KVPair(10, "Jack")));
  if(checkBST(rt2, -1, 999999)) SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
