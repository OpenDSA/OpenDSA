import java.io.*;

// Tester for binary search function
public class Sequential {

static boolean SUCCESS = true;

/* *** ODSATag: Sequential *** */
static int sequential(int[] A, int K) {
  for (int i=1; i<A.length; i++) 
    if (A[i] == K)               
       return i;               
  return A.length;
}
/* *** ODSAendTag: Sequential *** */

public static void main(String args[]) throws IOException {
  int[] A = {2, 3, 4, 5, 7, 10};

  int pos = sequential(A, 4);
  if (pos != 2)
    SUCCESS = false;

  pos = sequential(A, 6);
  if (pos != 6)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Binary Search Testing failed");
  }
}

}
