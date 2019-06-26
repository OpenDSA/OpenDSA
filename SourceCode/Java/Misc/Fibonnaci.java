import java.io.*;

// Tester for Fibonnaci code
public class Fibonnaci {

static boolean SUCCESS = true;
static int Values[];

/* *** ODSATag: FibR *** */
/** Recursively generate and return the n'th Fibonacci
    number */
static long fibr(int n) {
  // fibr(91) is the largest value that fits in a long
  if ((n <= 0) || (n > 91)) return -1;
  if ((n == 1) || (n == 2)) return 1;     // Base case
  return fibr(n-1) + fibr(n-2);      // Recursive call
}
/* *** ODSAendTag: FibR *** */

/* *** ODSATag: FibRT *** */
static int fibrt(int n) {
  // Assume Values has at least n slots, and all
  // slots are initialized to 0
  if ((n <= 0) || (n > 91)) return -1;
  if (n <= 2) return 1;             // Base case
  if (Values[n] == 0)
    Values[n] = fibrt(n-1) + fibrt(n-2);
  return Values[n];
}
/* *** ODSAendTag: FibRT *** */

/* *** ODSATag: FibI *** */
/** Iteratively generate and return the n'th Fibonacci
    number */
static long fibi(int n) {
  // fibr(91) is the largest value that fits in a long
  if ((n <= 0) || (n > 91)) return -1;
  long curr, prev, past;
  if ((n == 1) || (n == 2)) return 1;
  curr = prev = 1;     // curr holds current Fib value
  for (int i=3; i<=n; i++) { // Compute next value
    past = prev;             // past holds fibi(i-2)
    prev = curr;             // prev holds fibi(i-1)
    curr = past + prev;      // curr now holds fibi(i)
  }
  return curr;
}
/* *** ODSAendTag: FibI *** */

public static void main(String args[]) throws IOException {
  long temp1, temp2, temp3;

  Values = new int[92];

  for (int i=0; i<=91; i++) Values[i] = 0;
  temp1 = fibr(30);
  temp2 = fibrt(30);
  temp3 = fibi(30);
  System.out.println("Got " + temp1);
  if ((temp1 != temp2) || (temp1 != temp3))
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Testing failed");
  }
}

}
