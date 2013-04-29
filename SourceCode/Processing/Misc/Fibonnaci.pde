/* *** ODSATag: FibR *** */
/** Recursively generate and return the n'th Fibonacci
    number */
static long fibr(int n) {
  // fibr(91) is the largest value that fits in a long
  assert (n > 0) && (n <= 91) : "n out of range";
  if ((n == 1) || (n == 2)) return 1;     // Base case
  return fibr(n-1) + fibr(n-2);      // Recursive call
}
/* *** ODSAendTag: FibR *** */

/* *** ODSATag: FibRT *** */
int fibrt(int n) {
  // Assume Values has at least n slots, and all
  // slots are initialized to 0
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
  assert (n > 0) && (n <= 91) : "n out of range";
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
