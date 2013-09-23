/* *** ODSATag: GenTreeADT *** */
/** General tree node ADT */
interface GTNode<E> {
  E value();
  boolean isLeaf();
  GTNode<E> parent();
  GTNode<E> leftmostChild();
  GTNode<E> rightSibling();
  void setValue(E value);
  void setParent(GTNode<E> par);
  void insertFirst(GTNode<E> n);
  void insertNext(GTNode<E> n);
  void removeFirst();
  void removeNext();
}

/** General tree ADT */
interface GenTree<E> {
  void clear();      // Clear the tree
  GTNode<E> root();  // Return the root
  // Make the tree have a new root, give first child and sib
  void newroot(E value, GTNode<E> first,
                               GTNode<E> sib);
  void newleftchild(E value); // Add left child
}
/* *** ODSAendTag: GenTreeADT *** */


/* *** ODSATag: GenTreePrint *** */
/** Preorder traversal for general trees */
static <E> void preorder(GTNode<E> rt) {
  PrintNode(rt);
  if (!rt.isLeaf()) {
    GTNode<E> temp = rt.leftmostChild();
    while (temp != null) {
      preorder(temp);
      temp = temp.rightSibling();
    }
  }
}
/* *** ODSAendTag: GenTreePrint *** */
