void sorttime(int[] B) {
  int i;
  int[] A = new int[B.length];

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  bubblesort(A);
  time2 = millis();
  checkorder(A);
  println("Standard Bubble Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  bubblesortcheck(A);
  time2 = millis();
  checkorder(A);
  println("Swap Check Bubble Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  bubblesortcheck2(A);
  time2 = millis();
  checkorder(A);
  println("Swap Check Bubble Sort 2: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  wikipedia(A);
  time2 = millis();
  checkorder(A);
  println("Wikipedia Bubble Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  wikipedia2(A);
  time2 = millis();
  checkorder(A);
  println("Wikipedia Bubble Sort 2: Size " + testsize + ", Time: " + (time2-time1));
}

// A flag check if a pass did not have any swaps, which lets us quit
void bubblesortcheck(int[] A) {
  for (int i=0; i<A.length-1; i++) {// Insert i'th record
    boolean swaps = false;
    for (int j=1; j<A.length-i; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        swaps = true;
      }
    if(!swaps) { println("Quit at " + i); break; }  // Can quit early
  }
}

// Modify the flag to check position of last swap taken
void bubblesortcheck2(int[] A) {
  for (int i=0; i<A.length-1; i++) {// Insert i'th record
    int lastseen = 0;
    int top = A.length;
    for (int j=1; j<top; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        lastseen = j-1;
      }
    top = lastseen;
    if (top == 0) { println("Quit at " + i); break; }  // Can quit early
  }
}

// Wikipedia article "optimization" to only swap up to the last swap seen
void wikipedia(int[] A) {
  int n = A.length-1;
  while (n>0) {
    int newn = 0;
    for (int i=0; i<n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
        newn = i;
      }
    n = newn;
  }
}

// Wikipedia article "optimization" rewritten with a for loop
void wikipedia2(int[] A) {
  int newn;
  int loopcnt = 0;
  for(int n=A.length-1; n>0; n=newn) {
    loopcnt++;
    newn = 0;
    for (int i=0; i<n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
        newn = i;
      }
  }
  println("Loopcnt was " + loopcnt);
}


void sorttest(int[] A) {
  bubblesort(A);
}

/* *** ODSATag: Bubblesort *** */
void bubblesort(int[] A) {
  for (int i=0; i<A.length-1; i++) // Insert i'th record
    for (int j=1; j<A.length-i; j++)
      if (A[j-1] > A[j])
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */
