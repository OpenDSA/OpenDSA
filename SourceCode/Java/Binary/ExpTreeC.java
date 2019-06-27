import java.io.*;

// Tester for Expression Tree
public class ExpTreeC {

    static boolean SUCCESS = true;

    public static void main(String args[]) throws IOException {
        String string1 = "Hello1";
        String string2 = "Another string";

        VarLeafNode temp1 = new VarLeafNode(string1);
        VarLeafNode temp2 = new VarLeafNode(string2);
        VarIntlNode root = new VarIntlNode(new Character('+'), temp1, temp2);
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
            System.out.println("Expression Tree Composite code testing failed");
        }
    }
}
