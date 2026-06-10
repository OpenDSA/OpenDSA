// Increment a binary counter
// An example of amortized analysis
import java.io.*;

public class Increment {

    public static void main(String args[]) throws IOException {
        int[] A = new int[10];
        int i;
/* *** ODSATag: Increment *** */
// Increment a binary countery
for (i=0; ((i<A.length) && (A[i] == 1)); i++) {
  A[i] = 0;
}
if (i < A.length) {
  A[i] = 1;
}
/* *** ODSAendTag: Increment *** */
        PrintWriter output = new PrintWriter("success");
        output.println("Success");
        output.flush();
        output.close();
        System.out.println("Success!");
    }
}
