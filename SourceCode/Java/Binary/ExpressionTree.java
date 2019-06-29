/* *** ODSATag: ExpressionTree *** */
/* *** ODSATag: ExpressionTree1 *** */
// Base class for expression tree nodes
public interface VarBinNode {
  public boolean isLeaf(); // All subclasses must implement
}

/** Leaf node */
public class VarLeafNode implements VarBinNode {
  private String operand;                 // Operand value

  VarLeafNode(String val) { operand = val; }
  public boolean isLeaf() { return true; }
  public String value() { return operand; }
}
/* *** ODSAendTag: ExpressionTree1 *** */

/* *** ODSATag: ExpressionTree2 *** */
// Internal node
public class VarIntlNode implements VarBinNode {
  private VarBinNode left;                // Left child
  private VarBinNode right;               // Right child
  private Character operator;             // Operator value

  VarIntlNode(Character op, VarBinNode l, VarBinNode r)
    { operator = op; left = l; right = r; }
  public boolean isLeaf() { return false; }
  public VarBinNode leftchild() { return left; }
  public VarBinNode rightchild() { return right; }
  public Character value() { return operator; }
}
/* *** ODSAendTag: ExpressionTree2 *** */

// Preorder traversal
/* *** ODSATag: pointer based preorder *** */
public static void traverse(VarBinNode rt) {
  if (rt == null) return;          // Nothing to visit
  if (rt.isLeaf())                 // Process leaf node
    Visit.VisitLeafNode(((VarLeafNode)rt).value());
  else {                           // Process internal node
    Visit.VisitInternalNode(((VarIntlNode)rt).value());
    traverse(((VarIntlNode)rt).leftchild());
    traverse(((VarIntlNode)rt).rightchild());
  }
}
/* *** ODSAendTag: pointer based preorder *** */
/* *** ODSAendTag: ExpressionTree *** */
