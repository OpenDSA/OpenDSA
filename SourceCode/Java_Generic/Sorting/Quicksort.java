int THRESHOLD = 10;

void sorttime(T[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;

  System.out.println("Doing timings for an array of size " + B.length + " on the basis of " + numruns + " runs");
  
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        quicksort(A, 0, A.length-1);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Quicksort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        quicksortOpt(A, 0, A.length-1);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Optimized Mergesort/Inline swaps: Size " + A.length + ", Time: " + avgtime);
}


boolean sorttest(T[] B) {
    int i;
    System.out.println("Test Qucksort");
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    quicksort(A, 0, A.length-1);
    if (!checkorder(A)) { return false; };

    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    quicksortOpt(A, 0, A.length-1);
    if (!checkorder(A)) { return false; };
    return true;
}


/* Warning: Partition is sensitive. If we don't make the right
   position actually cross the left, then it seems hard to get things
   to work right when there is only one element in the partition
   (i.e., a list of 2 elements). */
/* *** ODSATag: partition *** */
int partition(T[] A, int left, int right, T pivot) {
  while (left <= right) { // Move bounds inward until they meet
    while (A[left].compareTo(pivot) < 0) { left++; }
    while ((right >= left) && (A[right].compareTo(pivot) >= 0)) { right--; }
      if (right > left) { swap(A, left, right); } // Swap out-of-place values
  }
  return left;            // Return first position in right partition
}
/* *** ODSAendTag: partition *** */

/* *** ODSATag: findpivot *** */
int findpivot(T[] A, int i, int j) { return (i+j)/2; }
/* *** ODSAendTag: findpivot *** */

/* *** ODSATag: Quicksort *** */
void quicksort(T[] A, int i, int j) { // Quicksort
  int pivotindex = findpivot(A, i, j);  // Pick a pivot
  swap(A, pivotindex, j);               // Stick pivot at end
  // k will be the first position in the right subarray
  int k = partition(A, i, j-1, A[j]);
  swap(A, k, j);                        // Put pivot in place
  if ((k-i) > 1) { quicksort(A, i, k-1); }  // Sort left partition
  if ((j-k) > 1) { quicksort(A, k+1, j); }  // Sort right partition
}
/* *** ODSAendTag: Quicksort *** */

// ---------------------------------------------------------------

// Insertion sort used by optimized quicksort
// Integer-only version
// Instead of swapping, "shift" the values down the array
void inssortshiftint(T[] A) {
    for (int i=1; i<A.length; i++) { // Insert i'th record
        int j;
        T temp = A[i];
        for (j=i; (j>0) && (temp.compareTo(A[j-1]) < 0); j--)
            A[j] = A[j-1];
        A[j] = temp;
    }
}


int MAXSTACKSIZE = 100;

// Optimized Quicksort: Not recursive, and uses Inssort for small lists
// This version uses primitive integer values for the records
void quicksortOpt(T[] A, int oi, int oj) { // Quicksort
    int[] Stack = new int[MAXSTACKSIZE]; // Stack for array bounds
    int listsize = oj-oi+1;
    int top = -1;
    T pivot;
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
            while (A[++l].compareTo(pivot) < 0);
            while ((r!=0) && (A[--r].compareTo(pivot) > 0));
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
