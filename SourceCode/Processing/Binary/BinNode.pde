/* *** ODSATag: BinNode *** */
interface BinNode { // Binary tree node ADT
  // Get and set the element value
  Object element();
  void setElement(Object v);

  // return the children
  BinNode left();
  BinNode right();

  // return TRUE if a leaf node, FALSE otherwise
  boolean isLeaf();
}
/* *** ODSAendTag: BinNode *** */
