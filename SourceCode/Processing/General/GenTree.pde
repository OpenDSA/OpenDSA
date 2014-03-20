/* *** ODSATag: GenTreeADT *** */
// General tree node ADT
interface GTNode {
  Object value();
  boolean isLeaf();
  GTNode parent();
  GTNode leftmostChild();
  GTNode rightSibling();
  void setValue(Object value);
  void setParent(GTNode par);
  void insertFirst(GTNode n);
  void insertNext(GTNode n);
  void removeFirst();
  void removeNext();
}

// General tree ADT
interface GenTree {
  void clear();      // Clear the tree
  GTNode root();     // Return the root
  // Make the tree have a new root, give first child and sib
  void newroot(Object value, GTNode first, GTNode sib);
  void newleftchild(E value); // Add left child
}
/* *** ODSAendTag: GenTreeADT *** */


/* *** ODSATag: GenTreePrint *** */
// Preorder traversal for general trees
static void preorder(GTNode rt) {
  PrintNode(rt);
  if (!rt.isLeaf()) {
    GTNode temp = rt.leftmostChild();
    while (temp != null) {
      preorder(temp);
      temp = temp.rightSibling();
    }
  }
}
/* *** ODSAendTag: GenTreePrint *** */
