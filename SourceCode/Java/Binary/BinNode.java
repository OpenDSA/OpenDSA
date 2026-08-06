/* *** ODSATag: BinNode *** */
interface BinNode { // Binary tree node ADT
  // Get and set the element value
  public int value();
  public void setValue(int v);

  // return the children
  public BinNode left();
  public BinNode right();

  // return TRUE if a leaf node, FALSE otherwise
  public boolean isLeaf();
}
/* *** ODSAendTag: BinNode *** */
