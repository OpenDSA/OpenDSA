import java.io.*;

// Tester for BST-based dictionary code
public class BSTDictTest {

static boolean SUCCESS = true;
static final int OFFSET = 10000000;
static final int testsize = 100;

public static void main(String args[]) throws IOException {
  Integer[] A = new Integer[testsize];
  int i;
  Dictionary b = new BSTDict();

  // Initialize to simply be the values from 0 to testsize-1
  // Ultimately, these are going to be our random keys
  for (i=0; i<A.length; i++)
    A[i] = i;
  // Now, generate a permuation on the numbers
  Permute.permute(A);

  // Now, build the dictionary
  // Each record will have a random key value from the permuation.
  // Since we actually store KVPairs, we will give it a "data" value
  // That is simply the count + OFFSET (so we can distinguish "data" from keys)
  for (i=0; i<A.length; i++)
    b.insert(A[i], i + OFFSET);

  if (b.size() != testsize) {
    System.out.println("Oops! Tree size is " + b.size() + ", it should be " + testsize);
    SUCCESS = false;
  }
  // Now, let's test removeAny
  while (b.size() != 0) {
    Object k = b.removeAny();
  }

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("BST-based Dictionary code testing failed");
  }

}
}
