import java.io.*;

// Tester for "largest" function
public class LargestTest {

static boolean SUCCESS = true;

/* *** ODSATag: Largest *** */
// Return position of largest value in integer array A
static int largest(int[] A) {
  int currlarge = 0;             // Position of largest element seen
  for (int i=1; i<A.length; i++) // For each element
    if (A[currlarge] < A[i])     //   if A[i] is larger
       currlarge = i;            //     remember its position
  return currlarge;              // Return largest position
}
/* *** ODSAendTag: Largest *** */

public static void main(String args[]) throws IOException {
  int[] A = {5, 7, 10, 4, 3, 2, 10};

  int pos = largest(A);
  if (pos != 2)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Miscellaneous Testing failed");
  }
}

}
