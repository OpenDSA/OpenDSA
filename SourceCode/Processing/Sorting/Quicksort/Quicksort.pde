final int numtests = 10;
final int testsize = 100;

void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

/* *** ODSATag: partition *** */
int partition(int[] A, int l, int r, int pivot) {
  do {             // Move bounds inward until they meet
    while (A[++l] < pivot);
    while ((r!=0) && (A[--r] > pivot));
    swap(A, l, r); // Swap out-of-place values
  } while (l < r); // Stop when they cross
  swap(A, l, r);   // Reverse last, wasted swap
  return l;        // Return first position in right partition
}
/* *** ODSAendTag: partition *** */

/* *** ODSATag: findpivot *** */
int findpivot(int[] A, int i, int j)
  { return (i+j)/2; }
/* *** ODSAendTag: findpivot *** */

/* *** ODSATag: Quicksort *** */
void quicksort(int[] A, int i, int j) { // Quicksort
  int pivotindex = findpivot(A, i, j);  // Pick a pivot
  swap(A, pivotindex, j);               // Stick pivot at end
  // k will be the first position in the right subarray
  int k = partition(A, i-1, j, A[j]);
  swap(A, k, j);                        // Put pivot in place
  if ((k-i) > 1) quicksort(A, i, k-1);  // Sort left partition
  if ((j-k) > 1) quicksort(A, k+1, j);  // Sort right partition
}
/* *** ODSAendTag: Quicksort *** */

void setup() {
  println("begin");
  int[] A = new int[testsize];
  int[] temp = new int[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = int(random(1000))+1;
    quicksort(A, 0, testsize-1);
    for (i=1; i<A.length; i++)
      if (A[i] < A[i-1]) {
        println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        exit();
      }
  }
  println("Testing successful!");
}
