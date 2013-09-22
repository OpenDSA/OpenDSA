boolean SUCCESS = true;

/* *** ODSATag: Composite *** */
   /** Base class: Composite */
   public interface VarBinNode {
     public boolean isLeaf();
     public void traverse();
   }

   /** Leaf node: Composite */
   class VarLeafNode implements VarBinNode {
     private String operand;                 // Operand value

     public VarLeafNode(String val) { operand = val; }
     public boolean isLeaf() { return true; }
     public String value() { return operand; }

     public void traverse() {
       Visit.VisitLeafNode(operand);
     }
   }

   /** Internal node: Composite */
   class VarIntlNode implements VarBinNode { // Internal node
     private VarBinNode left;                // Left child
     private VarBinNode right;               // Right child
     private Character operator;             // Operator value

     public VarIntlNode(Character op,
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

   /** Preorder traversal */
   public static void traverse(VarBinNode rt) {
     if (rt != null) rt.traverse();
   }
/* *** ODSAendTag: Composite *** */

void setup() {
  String string1 = "Hello1";
  String string2 = "Another string";

  VarLeafNode temp1 = new VarLeafNode(string1);
  VarLeafNode temp2 = new VarLeafNode(string2);
  VarIntlNode root = new VarIntlNode(new Character('+'), temp1, temp2);
  traverse(root);
  String out = Visit.VisitOut();
  if (!out.equals("+ Hello1 Another string ")))
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
