  /** Initialize the random variable */
  static private Random value = new Random(); // Hold the Random class object

  /** Create a random number function from the standard Java Random
      class. Turn it into a uniformly distributed value within the
      range 0 to n-1 by taking the value mod n.
      @param n The upper bound for the range.
      @return A value in the range 0 to n-1.
  */
  static int random(int n) {
        return Math.abs(value.nextInt()) % n;
  }


/* *** ODSATag: Permute *** */
// Randomly permute the values in array A
static <T> void permute(T[] A) {
  for (int i = A.length; i > 0; i--) // for each i
    swap(A, i-1, random(i));         //   swap A[i-1] with a random
}                                    //   position in the range 0 to i-1.
/* *** ODSAendTag: Permute *** */
