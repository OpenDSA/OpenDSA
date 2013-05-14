/* *** ODSATag: RFact *** */
/** Recursively compute and return n! */
static long fact(int n) {
  // fact(20) is the largest value that fits in a long
  assert (n >= 0) && (n <= 20) : "n out of range";
  if (n <= 1)  return 1;  // Base case: return base solution
  return n * fact(n-1);   // Recursive call for n > 1
}
/* *** ODSAendTag: RFact *** */

/* *** ODSATag: sfact *** */
/** @return n! */
static long fact(int n) {
 // To fit n! in a long variable, require n < 21
  assert (n >= 0) && (n <= 20) : "n out of range";
  // Make a stack just big enough
  Stack<Integer> S = new AStack<Integer>(n);
  while (n > 1) S.push(n--);
  long result = 1;
  while (S.length() > 0)
    result = result * S.pop();
  return result;
}
/* *** ODSAendTag: sfact *** */
