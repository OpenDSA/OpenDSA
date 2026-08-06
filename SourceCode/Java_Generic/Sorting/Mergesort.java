int THRESHOLD = 10;

void sorttime(T[] B) {
    int i;
    long totaltime;
    int runs;
    double avgtime;

    if (!prod)
        System.out.println("Doing timings for an array of size " + B.length + " on the basis of " + numruns + " runs");
  
    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        mergesort(A, mtemp, 0, A.length-1);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    if (!prod)
        System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Standard Mergesort: Size " + A.length + ", Time: " + avgtime);

    totaltime = 0;
    for (runs=0; runs<numruns; runs++) {
        for (i=0; i<B.length; i++) {
            A[i] = B[i];
        }
        time1 = System.nanoTime();
        mergesortOpt(A, mtemp, 0, A.length-1);
        time2 = System.nanoTime();
        checkorder(A);
        totaltime += (time2-time1);
    }
    if (!prod)
        System.out.println("Total time is: " + totaltime + ", numruns is: " + numruns);
    avgtime = (((double)totaltime)/numruns) / 1000000.0;
    System.out.println("Optimized Mergesort/Inline swaps: Size " + A.length + ", Time: " + avgtime);
}


boolean sorttest(T[] B) {
    int i;
    System.out.println("Test Mergesort");
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    mergesort(A, mtemp, 0, A.length-1);
    if (!checkorder(A)) { return false; };

    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    mergesortOpt(A, mtemp, 0, A.length-1);
    if (!checkorder(A)) { return false; };
    return true;
}

/* *** ODSATag: Mergesort *** */
void mergesort(T[] A, T[] temp, int left, int right) {
  if (left == right) { return; }       // List has one record
  int mid = (left+right)/2;          // Select midpoint
  mergesort(A, temp, left, mid);     // Mergesort first half
  mergesort(A, temp, mid+1, right);  // Mergesort second half
  for (int i=left; i<=right; i++) {    // Copy subarray to temp
    temp[i] = A[i];
  }
  // Do the merge operation back to A
  int i1 = left;
  int i2 = mid + 1;
  for (int curr = left; curr <= right; curr++) {
    if (i1 == mid+1) {                 // Left sublist exhausted
      A[curr] = temp[i2++];
    }
    else if (i2 > right) {             // Right sublist exhausted
      A[curr] = temp[i1++];
    }
    else if (temp[i1].compareTo(temp[i2]) <= 0) {  // Get smaller value
      A[curr] = temp[i1++];
    }
    else{
      A[curr] = temp[i2++];
    }
  }
}
/* *** ODSAendTag: Mergesort *** */

void inssort(T[] A, int left, int right) {
  for (int i=left+1; i<=right; i++)        // Insert i'th record
    for (int j=i; (j>left) && (A[j].compareTo(A[j-1]) < 0); j--)
      swap(A, j, j-1);
}

/* *** ODSATag: MergesortOpt *** */
void mergesortOpt(T[] A, T[] temp, int left, int right) {
  int i, j, k, mid = (left+right)/2;  // Select the midpoint
  if (left == right) { return; }          // List has one record
  if ((mid-left) >= THRESHOLD) { mergesortOpt(A, temp, left, mid); }
  else { inssort(A, left, mid); }
  if ((right-mid) > THRESHOLD) { mergesortOpt(A, temp, mid+1, right); }
  else { inssort(A, mid+1, right); }
  // Do the merge operation.  First, copy 2 halves to temp.
  for (i=left; i<=mid; i++) { temp[i] = A[i]; }
  for (j=right; j>mid; j--) { temp[i++] = A[j]; }
  // Merge sublists back to array
  for (i=left,j=right,k=left; k<=right; k++) {
    if (temp[i].compareTo(temp[j]) <= 0) { A[k] = temp[i++]; }
    else { 
      A[k] = temp[j--];
    }
  }
}
/* *** ODSAendTag: MergesortOpt *** */
