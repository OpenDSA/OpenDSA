import java.io.*;
import java.util.LinkedList;

public class UFTest1 {

  static boolean SUCCESS = true;
  static String output = "1 5 7 4 5 -1 5 1 5 -1 ";

  static void testUF() {
    String out;
    ParPtrTree it = new ParPtrTree(10);

    it.UNION(0, 1);
    it.UNION(2, 7);
    it.UNION(6, 5);
    it.UNION(3, 4);
    it.UNION(8, 5);
    it.UNION(7, 0);
    it.UNION(4, 6);
    it.UNION(7, 4);

    out = it.print();
    if (out.equals(output) != true) {
      SUCCESS = false;
      System.out.println("Error in Union/FIND!! " + out);
    }
  }

  public static void main(String args[]) throws IOException {

    testUF();

    if (SUCCESS) {
      PrintWriter output = new PrintWriter("success");
      output.println("Success");
      output.flush();
      output.close();
      System.out.println("Success!");
    } else {
      System.out.println("UFTest code testing failed");
    }
  }
}
