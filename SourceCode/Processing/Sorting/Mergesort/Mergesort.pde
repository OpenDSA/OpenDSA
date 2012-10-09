final int numtests = 10;
final int testsize = 100;

void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

/* *** ODSATag: Mergesort *** */
void mergesort(int[] A, int[] temp, int l, int r) {
  int mid = (l+r)/2;              // Select midpoint
  if (l == r) return;             // List has one record
  mergesort(A, temp, l, mid-1);   // Mergesort first half
  mergesort(A, temp, mid, r);     // Mergesort second half
  for (int i=l; i<=r; i++)        // Copy subarray to temp
    temp[i] = A[i];
  // Do the merge operation back to A
  int i1 = l;
  int i2 = mid + 1;
  for (int curr=l; curr<=r; curr++) {
    if (i1 == mid+1)              // Left sublist exhausted
      A[curr] = temp[i2++];
    else if (i2 > r)              // Right sublist exhausted
      A[curr] = temp[i1++];
    else if (temp[i1] < temp[i2]) // Get smaller value
      A[curr] = temp[i1++];
    else A[curr] = temp[i2++];
  }
}
/* *** ODSAendTag: Mergesort *** */

void setup() {
  println("begin");
  int[] A = new int[testsize];
  int[] temp = new int[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = int(random(1000))+1;
    mergesort(A, temp, 0, testsize-1);
    for (i=1; i<A.length; i++)
      if (A[i] < A[i-1]) {
        println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        exit();
      }
  }
  println("Testing successful!");
}
