final int numtests = 10;
final int testsize = 100;
final int THRESHOLD = 9;

void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

void inssort(int[] A, int left, int right) {
  for (int i=left+1; i<=right; i++)        // Insert i'th record
    for (int j=i; (j>left) && (A[j] < A[j-1]); j--)
      swap(A, j, j-1);
}

/* *** ODSATag: MergesortOpt *** */
void mergesort(int[] A, int[] temp, int left, int right) {
  int i, j, k, mid = (left+right)/2;  // Select the midpoint
  if (left == right) return;          // List has one record
  if ((mid-left) >= THRESHOLD) mergesort(A, temp, left, mid);
  else inssort(A, left, mid);
  if ((right-mid) > THRESHOLD) mergesort(A, temp, mid+1, right);
  else inssort(A, mid+1, right);
  // Do the merge operation.  First, copy 2 halves to temp.
  for (i=left; i<=mid; i++) temp[i] = A[i];
  for (j=right; j>mid; j--) temp[i++] = A[j];
  // Merge sublists back to array
  for (i=left,j=right,k=left; k<=right; k++)
    if (temp[i] < temp[j]) A[k] = temp[i++];
    else A[k] = temp[j--];
}
/* *** ODSAendTag: MergesortOpt *** */

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
