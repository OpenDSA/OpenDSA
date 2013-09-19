/* *** ODSATag: ExpressionTree *** */
// Base class for expression tree nodes
public interface VarBinNode {
  public boolean isLeaf(); // All subclasses must implement
}

/** Leaf node */
   class VarLeafNode implements VarBinNode {
     private String operand;                 // Operand value

     public VarLeafNode(String val) { operand = val; }
     public boolean isLeaf() { return true; }
     public String value() { return operand; }
   };

   /** Internal node */
   class VarIntlNode implements VarBinNode {
     private VarBinNode left;                // Left child
     private VarBinNode right;               // Right child
     private Character operator;             // Operator value

     public VarIntlNode(Character op, VarBinNode l, VarBinNode r)
       { operator = op; left = l; right = r; }
     public boolean isLeaf() { return false; }
     public VarBinNode leftchild() { return left; }
     public VarBinNode rightchild() { return right; }
     public Character value() { return operator; }
   }

   /** Preorder traversal */
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
/* *** ODSAendTag: ExpressionTree *** */
