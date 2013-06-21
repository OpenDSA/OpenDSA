boolean SUCCESS = true;

/* *** ODSATag: RFact *** */
// Recursively compute and return n!
long rfact(int n) {
  // fact(20) is the largest value that fits in a long
  if ((n < 0) || (n > 20)) return -1;
  if (n <= 1)  return 1;  // Base case: return base solution
  return n * rfact(n-1);   // Recursive call for n > 1
}
/* *** ODSAendTag: RFact *** */

/* *** ODSATag: Sfact *** */
// Return n!
long sfact(int n) {
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

void setup() {
  long temp1, temp2;

  temp1 = rfact(10);
  temp2 = sfact(10);
  if (temp1 != temp2)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  } else {
    println("Testing failed");
  }

  exit();
}
