void sorttest(Comparable[] A) {
  quicksort(A, 0, A.length-1);
}

/* Warning: Partition is sensitive. If we don't make the right
   position actually cross the left, then it seems hard to get things
   to work right when there is only one element in the partition
   (i.e., a list of 2 elements). */
/* *** ODSATag: partition *** */
int partition(Comparable[] A, int left, int right, Comparable pivot) {
  while (left <= right) { // Move bounds inward until they meet
    while (A[left].compareTo(pivot) < 0) left++;
    while ((right >= left) && (A[right].compareTo(pivot) >= 0)) right--;
    if (right > left) swap(A, left, right); // Swap out-of-place values
  }
  return left;            // Return first position in right partition
}
/* *** ODSAendTag: partition *** */

/* *** ODSATag: findpivot *** */
int findpivot(Comparable[] A, int i, int j)
  { return (i+j)/2; }
/* *** ODSAendTag: findpivot *** */

/* *** ODSATag: Quicksort *** */
void quicksort(Comparable[] A, int i, int j) { // Quicksort
  int pivotindex = findpivot(A, i, j);  // Pick a pivot
  swap(A, pivotindex, j);               // Stick pivot at end
  // k will be the first position in the right subarray
  int k = partition(A, i, j-1, A[j]);
  swap(A, k, j);                        // Put pivot in place
  if ((k-i) > 1) quicksort(A, i, k-1);  // Sort left partition
  if ((j-k) > 1) quicksort(A, k+1, j);  // Sort right partition
}
/* *** ODSAendTag: Quicksort *** */

// ---------------------------------------------------------------

// Set up and implementations for doing timing runs on certain variations

void sorttime(Comparable[] B) {
  int i;
  Comparable[] A = new Comparable[B.length];
  int totaltime, runs;
  int numruns = 20;

  // Timing test for standard implementation
  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = B[i];
    time1 = millis();
    quicksort(A, 0, A.length-1);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Standard Quicksort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for optimized version
  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = B[i];
    time1 = millis();
    quicksortOpt(A, 0, A.length-1);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Optimized Quicksort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for Integer type, optimized version
  totaltime = 0;
  Integer[] AInteger = new Integer[B.length];
  Integer[] BInteger = new Integer[B.length];
  for (i=0; i<B.length; i++)
    BInteger[i] = (Integer)B[i];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) AInteger[i] = BInteger[i];
    time1 = millis();
    quicksortOptInt(AInteger, 0, AInteger.length-1);
    time2 = millis();
    checkorder(AInteger);
    totaltime += (time2-time1);
  }
  println("Optimized Integer record Quicksort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for integer-only optimized version
  totaltime = 0;
  int[] Aint = new int[B.length];
  int[] Bint = new int[B.length];
  for (i=0; i<B.length; i++)
    Bint[i] = (Integer)B[i];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) Aint[i] = Bint[i];
    time1 = millis();
    quicksortOptint(Aint, 0, Aint.length-1);
    time2 = millis();
    checkorder(Aint);
    totaltime += (time2-time1);
  }
  println("Optimized integer-only Quicksort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);
}

// Insertion sort used by optimized quicksort
// Instead of swapping, "shift" the values down the array
void inssortshift(Comparable[] A) {
  for (int i=1; i<A.length; i++) { // Insert i'th record
    int j;
    Comparable temp = A[i];
    for (j=i; (j>0) && (temp.compareTo(A[j-1]) < 0); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Insertion sort used by optimized quicksort
// Records are of type Integer
// Instead of swapping, "shift" the values down the array
void inssortshiftInt(Integer[] A) {
  for (int i=1; i<A.length; i++) { // Insert i'th record
    int j;
    Integer temp = A[i];
    for (j=i; (j>0) && (temp < A[j-1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Insertion sort used by optimized quicksort
// Integer-only version
// Instead of swapping, "shift" the values down the array
void inssortshiftint(int[] A) {
  for (int i=1; i<A.length; i++) { // Insert i'th record
    int j;
    int temp = A[i];
    for (j=i; (j>0) && (temp < A[j-1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

int MAXSTACKSIZE = 100;

// Optimized Quicksort: Not recursive, and uses Inssort for small lists
void quicksortOpt(Comparable[] A, int oi, int oj) { // Quicksort
  int[] Stack = new int[MAXSTACKSIZE]; // Stack for array bounds
  int listsize = oj-oi+1;
  int top = -1;
  Comparable pivot;
  int pivotindex, l, r;

  Stack[++top] = oi;  // Initialize stack
  Stack[++top] = oj;

  while (top > 0) {   // While there are unprocessed subarrays
    // Pop Stack
    int j = Stack[top--];
    int i = Stack[top--];

    // Findpivot
    pivotindex = (i+j)/2;
    pivot = A[pivotindex];
    swap(A, pivotindex, j); // Stick pivot at end

    // Partition
    l = i-1;
    r = j;
    do {
      while (A[++l].compareTo(pivot)<0);
      while ((r!=0) && (A[--r].compareTo(pivot)>0));
      swap(A, l, r);
    } while (l < r);
    swap(A, l, r);  // Undo final swap
    swap(A, l, j);  // Put pivot value in place

    // Put new subarrays onto Stack if they are small
    if ((l-i) > THRESHOLD) {   // Left partition
      Stack[++top] = i;
      Stack[++top] = l-1;
    }
    if ((j-l) > THRESHOLD) {   // Right partition
      Stack[++top] = l+1;
      Stack[++top] = j;
    }
  }
  inssortshift(A);             // Final Insertion Sort
}

// Optimized Quicksort: Not recursive, and uses Inssort for small lists
// Assumes that the record is an Integer
void quicksortOptInt(Integer[] A, int oi, int oj) { // Quicksort
  int[] Stack = new int[MAXSTACKSIZE]; // Stack for array bounds
  int listsize = oj-oi+1;
  int top = -1;
  Integer pivot;
  int pivotindex, l, r;

  Stack[++top] = oi;  // Initialize stack
  Stack[++top] = oj;

  while (top > 0) {   // While there are unprocessed subarrays
    // Pop Stack
    int j = Stack[top--];
    int i = Stack[top--];

    // Findpivot
    pivotindex = (i+j)/2;
    pivot = A[pivotindex];
    swap(A, pivotindex, j); // Stick pivot at end

    // Partition
    l = i-1;
    r = j;
    do {
      while (A[++l] < pivot);
      while ((r!=0) && (A[--r] > pivot));
      swap(A, l, r);
    } while (l < r);
    swap(A, l, r);  // Undo final swap
    swap(A, l, j);  // Put pivot value in place

    // Put new subarrays onto Stack if they are small
    if ((l-i) > THRESHOLD) {   // Left partition
      Stack[++top] = i;
      Stack[++top] = l-1;
    }
    if ((j-l) > THRESHOLD) {   // Right partition
      Stack[++top] = l+1;
      Stack[++top] = j;
    }
  }
  inssortshiftInt(A);             // Final Insertion Sort
}



// Optimized Quicksort: Not recursive, and uses Inssort for small lists
// This version uses primitive integer values for the records
void quicksortOptint(int[] A, int oi, int oj) { // Quicksort
  int[] Stack = new int[MAXSTACKSIZE]; // Stack for array bounds
  int listsize = oj-oi+1;
  int top = -1;
  int pivot;
  int pivotindex, l, r;

  Stack[++top] = oi;  // Initialize stack
  Stack[++top] = oj;

  while (top > 0) {   // While there are unprocessed subarrays
    // Pop Stack
    int j = Stack[top--];
    int i = Stack[top--];

    // Findpivot
    pivotindex = (i+j)/2;
    pivot = A[pivotindex];
    swap(A, pivotindex, j); // Stick pivot at end

    // Partition
    l = i-1;
    r = j;
    do {
      while (A[++l] < pivot);
      while ((r!=0) && (A[--r] > pivot));
      swap(A, l, r);
    } while (l < r);
    swap(A, l, r);  // Undo final swap
    swap(A, l, j);  // Put pivot value in place

    // Put new subarrays onto Stack if they are small
    if ((l-i) > THRESHOLD) {   // Left partition
      Stack[++top] = i;
      Stack[++top] = l-1;
    }
    if ((j-l) > THRESHOLD) {   // Right partition
      Stack[++top] = l+1;
      Stack[++top] = j;
    }
  }
  inssortshiftint(A);             // Final Insertion Sort
}
