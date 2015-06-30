/* *** ODSATag: ExpressionTree *** */
// Base class for expression tree nodes
interface VarBinNode {
  boolean isLeaf(); // All subclasses must implement
}

/** Leaf node */
class VarLeafNode implements VarBinNode {
  private String operand;                 // Operand value

  VarLeafNode(String val) { operand = val; }
  boolean isLeaf() { return true; }
  String value() { return operand; }
};

/** Internal node */
class VarIntlNode implements VarBinNode {
  private VarBinNode left;                // Left child
  private VarBinNode right;               // Right child
  private Character operator;             // Operator value

  VarIntlNode(Character op, VarBinNode l, VarBinNode r)
    { operator = op; left = l; right = r; }
  boolean isLeaf() { return false; }
  VarBinNode leftchild() { return left; }
  VarBinNode rightchild() { return right; }
  Character value() { return operator; }
}

/** Preorder traversal */
/* *** ODSATag: pointer based preorder *** */
static void traverse(VarBinNode rt) {
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
