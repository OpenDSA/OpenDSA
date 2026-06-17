/* *** ODSATag: BSTNode *** */
// Binary tree node implementation for int values
class BSTNode implements BinNode {
  private int element; // Element for this node
  private BSTNode left;          // Pointer to left child
  private BSTNode right;         // Pointer to right child

  // Constructors
  BSTNode() { left = right = null; }
  BSTNode(int val) { left = right = null; element = val; }
  BSTNode(int val, BSTNode l, BSTNode r)
    { left = l; right = r; element = val; }

  // Get and set the element value
  public int value() { return element; }
  public void setValue(int v) { element = v; }

  // Get and set the left child
  public BSTNode left() { return left; }
  public void setLeft(BSTNode p) { left = p; }

  // Get and set the right child
  public BSTNode right() { return right; }
  public void setRight(BSTNode p) { right = p; }

  // return TRUE if a leaf node, FALSE otherwise
  public boolean isLeaf() { return (left == null) && (right == null); }
}
/* *** ODSAendTag: BSTNode *** */
