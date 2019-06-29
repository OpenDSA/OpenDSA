import java.io.*;

// Tester for factorial code
public class Fact {

static boolean SUCCESS = true;

/* *** ODSATag: RFact *** */
// Recursively compute and return n!
static long rfact(int n) {
  // fact(20) is the largest value that fits in a long
  if ((n < 0) || (n > 20)) return -1;
  if (n <= 1)  return 1;  // Base case: return base solution
  return n * rfact(n-1);   // Recursive call for n > 1
}
/* *** ODSAendTag: RFact *** */

/* *** ODSATag: Sfact *** */
// Return n!
static long sfact(int n) {
  // fact(20) is the largest value that fits in a long
  if ((n < 0) || (n > 20)) return -1;
  // Make a stack just big enough
  Stack S = new AStack(n);
  while (n > 1) S.push(n--);
  long result = 1;
  while (S.length() > 0)
    result = result * (Integer)S.pop();
  return result;
}
/* *** ODSAendTag: Sfact *** */

public static void main(String args[]) throws IOException {
  long temp1, temp2;

  temp1 = rfact(10);
  temp2 = sfact(10);
  if (temp1 != temp2)
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
