final int numtests = 10;
final int testsize = 100;

void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

/* *** ODSATag: Shellsort *** */
void shellsort(int[] A) {
  for (int i=A.length/2; i>2; i/=2) // For each increment
    for (int j=0; j<i; j++)         // Sort each sublist
      inssort2(A, j, i);
  inssort2(A, 0, 1);     // Could call regular inssort here
}

/** Modified Insertion Sort for varying increments */
void inssort2(int[] A, int start, int incr) {
  for (int i=start+incr; i<A.length; i+=incr)
    for (int j=i; (j>=incr) && (A[j] < A[j-incr]); j-=incr)
      swap(A, j, j-incr);
}
/* *** ODSAendTag: Shellsort *** */

void setup() {
  println("begin");
  int[] A = new int[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = int(random(1000))+1;
    shellsort(A);
    for (i=1; i<A.length; i++)
      if (A[i] < A[i-1]) {
        println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        exit();
      }
  }
  println("Testing successful!");
}
