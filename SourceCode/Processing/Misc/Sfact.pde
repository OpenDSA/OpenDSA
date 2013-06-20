/* *** ODSATag: Sfact *** */
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
/* *** ODSAendTag: Sfact *** */
