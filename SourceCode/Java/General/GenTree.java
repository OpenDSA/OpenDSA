/* *** ODSATag: GenTreeADT *** */
// General tree node ADT
public interface GTNode {
  public Object value();
  public boolean isLeaf();
  public GTNode parent();
  public GTNode leftmostChild();
  public GTNode rightSibling();
  public void setValue(Object value);
  public void setParent(GTNode par);
  public void insertFirst(GTNode n);
  public void insertNext(GTNode n);
  public void removeFirst();
  public void removeNext();
}

// General tree ADT
public interface GenTree {
  public void clear();      // Clear the tree
  public GTNode root();     // Return the root
  // Make the tree have a new root, give first child and sib
  public void newroot(Object value, GTNode first, GTNode sib);
  public void newleftchild(E value); // Add left child
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
