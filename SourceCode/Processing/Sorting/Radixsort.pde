void sorttest(Integer[] A) {
  radix(A, 4, 256);
}

/* *** ODSATag: Radixsort *** */
static void radix(Integer[] A, int k, int r) {
  Integer[] B = new Integer[A.length];
  int[] count = new int[r];     // Count[i] stores number of records with digit value i
  int i, j, rtok;

  for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
    for (j=0; j<r; j++) count[j] = 0;    // Initialize count

    // Count the number of records for each bin on this pass
    for (j=0; j<A.length; j++) count[(A[j]/rtok)%r]++;

    // count[j] will be index in B for last slot of bin j.
    // First, reduce count[0] because indexing starts at 0, not 1
    count[0] = count[0] - 1;
    for (j=1; j<r; j++) count[j] = count[j-1] + count[j];

    // Put records into bins, working from bottom of bin
    // Since bins fill from bottom, j counts downwards
    for (j=A.length-1; j>=0; j--) {
      B[count[(A[j]/rtok)%r]] = A[j];
      count[(A[j]/rtok)%r] = count[(A[j]/rtok)%r] - 1;
    }
    for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
  }
}
/* *** ODSAendTag: Radixsort *** */

// ---------------------------------------------------------------

// Set up and implementations for doing timing runs on certain variations

// Determine if an array is sorted
// Integer-only version
void checkorderint(int[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}

void sorttime(Comparable[] B) {
  int i;
  Integer[] A = new Integer[B.length];
  int totaltime, runs;
  int numruns = 20;

  // Timing test for standard implementation
  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = (Integer)B[i];
    time1 = millis();
    radix(A, 4, 256);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Standard Radixsort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for optimized implementation
  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = (Integer)B[i];
    time1 = millis();
    radixOpt(A, 4, 256);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Optimized Radixsort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for integer-only optimized implementation
  totaltime = 0;
  int[] Aint = new int[B.length];
  int[] Bint = new int[B.length];
  for (i=0; i<B.length; i++)
    Bint[i] = (Integer)B[i];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) Aint[i] = Bint[i];
    time1 = millis();
    radixOptint(Aint, 4, 256);
    time2 = millis();
    checkorderint(Aint);
    totaltime += (time2-time1);
  }
  println("Optimized primitive int-only Radixsort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for standard linked-list implementation
  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = (Integer)B[i];
    time1 = millis();
    radixlink(A, 4, 256);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Standard linked-list Radixsort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for optimized linked-list implementation
  totaltime = 0;
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) A[i] = (Integer)B[i];
    time1 = millis();
    radixlinkOpt(A, 4, 256);
    time2 = millis();
    checkorder(A);
    totaltime += (time2-time1);
  }
  println("Optimized linked-list Radixsort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);

  // Timing test for primitive int-only linked-list implementation
  totaltime = 0;
  Aint = new int[B.length];
  Bint = new int[B.length];
  for (i=0; i<B.length; i++)
    Bint[i] = (Integer)B[i];
  for (runs=0; runs<numruns; runs++) {
    for(i=0; i<B.length; i++) Aint[i] = Bint[i];
    time1 = millis();
    radixlinkOptint(Aint, 4, 256);
    time2 = millis();
    checkorderint(Aint);
    totaltime += (time2-time1);
  }
  println("Primitive int-only linked-list Radixsort for " + numruns + " runs: Size " +
           testsize + ", Time: " + totaltime);


}

// This version of Radixsort assumes a 32 bit integer key, shifted by
// some number of bits each pass
static void radixOpt(Integer[] A, int k, int r) {
  Integer[] B = new Integer[A.length];
  int[] count = new int[r];     // Count[i] stores number of records with digit value i
  int i, j, rshift, shiftstep;

  // Compute the number of bits to shift on each step, from the input radix
  for(shiftstep=0; (r>>shiftstep)>1; shiftstep++);
  for (i=0, rshift=0; i<k; i++, rshift+=shiftstep) { // For k digits
    for (j=0; j<r; j++) count[j] = 0;    // Initialize count

    // Count the number of records for each bin on this pass
    for (j=0; j<A.length; j++) count[(A[j]>>rshift)%r]++;

    // count[j] will be index in B for last slot of bin j.
    // First, reduce count[0] because indexing starts at 0, not 1
    count[0] = count[0] - 1;
    for (j=1; j<r; j++) count[j] = count[j-1] + count[j];

    // Put records into bins, working from bottom of bin
    // Since bins fill from bottom, j counts downwards
    for (j=A.length-1; j>=0; j--) {
      B[count[(A[j]>>rshift)%r]] = A[j];
      count[(A[j]>>rshift)%r] = count[(A[j]>>rshift)%r] - 1;
    }
    for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
  }
}


// This version of Radixsort assumes that the records are primitive
// 32-bit integer values.
// Shifts are done by some number of bits each pass
static void radixOptint(int[] A, int k, int r) {
  int[] B = new int[A.length];
  int[] count = new int[r];     // Count[i] stores number of records with digit value i
  int i, j, rshift, shiftstep;

  // Compute the number of bits to shift on each step, from the input radix
  for(shiftstep=0; (r>>shiftstep)>1; shiftstep++);
  for (i=0, rshift=0; i<k; i++, rshift+=shiftstep) { // For k digits
    for (j=0; j<r; j++) count[j] = 0;    // Initialize count

    // Count the number of records for each bin on this pass
    for (j=0; j<A.length; j++) count[(A[j]>>rshift)%r]++;

    // count[j] will be index in B for last slot of bin j.
    // First, reduce count[0] because indexing starts at 0, not 1
    count[0] = count[0] - 1;
    for (j=1; j<r; j++) count[j] = count[j-1] + count[j];

    // Put records into bins, working from bottom of bin
    // Since bins fill from bottom, j counts downwards
    for (j=A.length-1; j>=0; j--) {
      B[count[(A[j]>>rshift)%r]] = A[j];
      count[(A[j]>>rshift)%r] = count[(A[j]>>rshift)%r] - 1;
    }
    for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
  }
}

// Standard radixsort using linked lists
static void radixlink(Integer[] A, int k, int r) {
  Integer[] B = new Integer[A.length];
  int[] bins = new int[r];         // List headers
  int[] tails = new int[r];        // List tails for appending
  int[] links = new int[A.length]; // The list links
  int i, j, rtok;

  for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
    for (j=0; j<r; j++) bins[j] = -1;    // Initialize linked lists to empty
    for (j=0; j<r; j++) tails[j] = -1;    // Initialize tails
    for (j=0; j<A.length; j++) links[j] = -1; // Initialize links

    // Throw everyone onto a bin
    for (j=0; j<A.length; j++) {
      int digit = (A[j]/rtok)%r;
      if (bins[digit] == -1) {
        bins[digit] = j;
        tails[digit] = j;
      }
      else {
        tails[digit] = links[tails[digit]] = j;
      }
    }
    // Take them out of the bins and put back into an array
    int Bcurr = 0;
    for (j=0; j<r; j++) {
      for (int curr = bins[j]; curr != -1; curr = links[curr]) {
        B[Bcurr++] = A[curr];
      }
    }
    // Copy the array back to prepare for the next step
    for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
  }
}


// Optimized radixsort using linked lists
static void radixlinkOpt(Integer[] A, int k, int r) {
  Integer[] B = new Integer[A.length];
  int[] bins = new int[r];         // List headers
  int[] tails = new int[r];        // List tails for appending
  int[] links = new int[A.length]; // The list links
  int i, j, rshift, shiftstep;

  // Compute the number of bits to shift on each step, from the input radix
  for(shiftstep=0; (r>>shiftstep)>1; shiftstep++);
  for (i=0, rshift=0; i<k; i++, rshift+=shiftstep) { // For k digits
    for (j=0; j<r; j++) bins[j] = -1;    // Initialize linked lists to empty
    for (j=0; j<r; j++) tails[j] = -1;    // Initialize tails
    for (j=0; j<A.length; j++) links[j] = -1; // Initialize links

    // Throw everyone onto a bin
    for (j=0; j<A.length; j++) {
      int digit = (A[j]>>rshift)%r;
      if (bins[digit] == -1) {
        bins[digit] = j;
        tails[digit] = j;
      }
      else {
        tails[digit] = links[tails[digit]] = j;
      }
    }
    // Take them out of the bins and put back into an array
    int Bcurr = 0;
    for (j=0; j<r; j++) {
      for (int curr = bins[j]; curr != -1; curr = links[curr]) {
        B[Bcurr++] = A[curr];
      }
    }
    // Copy the array back to prepare for the next step
    for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
  }
}

// Optimized radixsort using linked lists
static void radixlinkOptint(int[] A, int k, int r) {
  int[] B = new int[A.length];
  int[] bins = new int[r];         // List headers
  int[] tails = new int[r];        // List tails for appending
  int[] links = new int[A.length]; // The list links
  int i, j, rshift, shiftstep;

  // Compute the number of bits to shift on each step, from the input radix
  for(shiftstep=0; (r>>shiftstep)>1; shiftstep++);
  for (i=0, rshift=0; i<k; i++, rshift+=shiftstep) { // For k digits
    for (j=0; j<r; j++) bins[j] = -1;    // Initialize linked lists to empty
    for (j=0; j<r; j++) tails[j] = -1;    // Initialize tails
    for (j=0; j<A.length; j++) links[j] = -1; // Initialize links

    // Throw everyone onto a bin
    for (j=0; j<A.length; j++) {
      int digit = (A[j]>>rshift)%r;
      if (bins[digit] == -1) {
        bins[digit] = j;
        tails[digit] = j;
      }
      else {
        tails[digit] = links[tails[digit]] = j;
      }
    }
    // Take them out of the bins and put back into an array
    int Bcurr = 0;
    for (j=0; j<r; j++) {
      for (int curr = bins[j]; curr != -1; curr = links[curr]) {
        B[Bcurr++] = A[curr];
      }
    }
    // Copy the array back to prepare for the next step
    for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
  }
}
