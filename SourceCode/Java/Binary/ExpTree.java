import java.io.*;

// Tester for Expression Tree
public class ExpTree {

// Preorder traversal
/* *** ODSATag: ExpressionTraverse *** */
static void traverse(VarBinNode rt) {
  if (rt == null) { return; }         // Nothing to visit
  if (rt.isLeaf()) {                 // Process leaf node
    Visit.VisitLeafNode(((VarLeafNode)rt).value());
  }
  else {                           // Process internal node
    Visit.VisitInternalNode(((VarIntlNode)rt).value());
    traverse(((VarIntlNode)rt).leftchild());
    traverse(((VarIntlNode)rt).rightchild());
  }
}
/* *** ODSAendTag: ExpressionTraverse *** */

    static boolean SUCCESS = true;

    public static void main(String args[]) throws IOException {
        String string1 = "Hello1";
        String string2 = "Another string";

        VarLeafNode temp1 = new VarLeafNode(string1);
        VarLeafNode temp2 = new VarLeafNode(string2);
        VarIntlNode root = new VarIntlNode(Character.valueOf('+'), temp1, temp2);
        Visit.VisitInit();
        traverse(root);
        String out = Visit.VisitOut();
        if (!out.equals("+ Hello1 Another string "))
            SUCCESS = false;

        if (SUCCESS) {
            PrintWriter output = new PrintWriter("success");
            output.println("Success");
            output.flush();
            output.close();
            System.out.println("Success!");
        } else {
            System.out.println("Expression Tree code testing failed");
        }
    }
}
