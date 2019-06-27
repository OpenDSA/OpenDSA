/* *** ODSATag: Composite *** */
/* *** ODSATag: Composite1 *** */
   /** Base class: Composite */
   public interface VarBinNode {
     public boolean isLeaf();
     public void traverse();
   }

   /** Leaf node: Composite */
   public class VarLeafNode implements VarBinNode {
     private String operand;                 // Operand value

     VarLeafNode(String val) { operand = val; }
     public boolean isLeaf() { return true; }
     public String value() { return operand; }

     public void traverse() {
       Visit.VisitLeafNode(operand);
     }
   }
/* *** ODSAendTag: Composite1 *** */

/* *** ODSATag: Composite2 *** */
   /** Internal node: Composite */
   public class VarIntlNode implements VarBinNode { // Internal node
     private VarBinNode left;                // Left child
     private VarBinNode right;               // Right child
     private Character operator;             // Operator value

     VarIntlNode(Character op,
                        VarBinNode l, VarBinNode r)
       { operator = op; left = l; right = r; }
     public boolean isLeaf() { return false; }
     public VarBinNode leftchild() { return left; }
     public VarBinNode rightchild() { return right; }
     public Character value() { return operator; }

     public void traverse() {
       Visit.VisitInternalNode(operator);
       if (left != null) left.traverse();
       if (right != null) right.traverse();
     }
   }
/* *** ODSAendTag: Composite2 *** */

/* *** ODSATag: Composite3 *** */
   /** Preorder traversal */
   public static void traverse(VarBinNode rt) {
     if (rt != null) rt.traverse();
   }
/* *** ODSAendTag: Composite3 *** */
/* *** ODSAendTag: Composite *** */
