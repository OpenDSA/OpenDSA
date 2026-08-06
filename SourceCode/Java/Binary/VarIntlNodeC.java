/** Internal node: Composite */
public class VarIntlNode implements VarBinNode { // Internal node
  private VarBinNode left;                // Left child
  private VarBinNode right;               // Right child
  private Character operator;             // Operator value

  VarIntlNode(Character op, VarBinNode l, VarBinNode r) {
    operator = op; left = l; right = r;
  }
  public boolean isLeaf() { return false; }
  public VarBinNode leftchild() { return left; }
  public VarBinNode rightchild() { return right; }
  public Character value() { return operator; }

  public void traverse() {
    Visit.VisitInternalNode(operator);
    if (left != null) { left.traverse(); }
    if (right != null) { right.traverse(); }
  }
}
