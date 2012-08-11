final int numtests = 10;
final int testsize = 100;

void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

/* *** ODSATag: Selectionsort *** */
void selsort(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    swap(A, bigindex, A.length-i-1); // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */

void setup() {
  println("begin");
  int[] A = new int[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = int(random(1000))+1;
    selsort(A);
    for (i=1; i<A.length; i++)
      if (A[i] < A[i-1]) {
        println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        exit();
      }
  }
  println("Testing successful!");
}
