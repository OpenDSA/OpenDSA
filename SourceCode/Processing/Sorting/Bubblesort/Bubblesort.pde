final int numtests = 10;
final int testsize = 100;

void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

/* *** ODSATag: Bubblesort *** */
void bubblesort(int[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=A.length-1; j>i; j--)
      if (A[j] < A[j-1])
        swap(A, j, j-1);
}
/* *** ODSAendTag: Bubblesort *** */

void setup() {
  println("begin");
  int[] A = new int[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = int(random(1000))+1;
    bubblesort(A);
    for (i=1; i<A.length; i++)
      if (A[i] < A[i-1]) {
        println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        exit();
      }
  }
  println("Testing successful!");
}
