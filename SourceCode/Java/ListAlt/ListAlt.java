import java.io.*;

/**
 * Wrapper to let us compile/test the alternate list implementation
 */

public class ListAlt {

    public static void main(String args[]) throws IOException {
        boolean SUCCESS = true;
        AList AL = new AList();

        ListIndex where = AL.getStart();
        System.out.println("Length: " + AL.length());

        if (SUCCESS) {
            PrintWriter output = new PrintWriter("success");
            output.println("Success");
            output.flush();
            output.close();
            System.out.println("Success!");
        }
    }
}
