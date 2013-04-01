void sorttime(int[] B) {
  int i;
  int[] A = new int[B.length];

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssort(A);
  time2 = millis();
  checkorder(A);
  println("Standard Insertion Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssort2(A);
  time2 = millis();
  checkorder(A);
  println("Standard Insertion Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssortshift(A);
  time2 = millis();
  checkorder(A);
  println("shuffling Insertion Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssortshift2(A);
  time2 = millis();
  checkorder(A);
  println("shuffling Insertion Sort 2: Size " + testsize + ", Time: " + (time2-time1));
}


// Same as inssortsuffle, but try != instead of < for the zero test
// This will only matter to JavaScript
void inssortshift2(int[] A) {
  for (int i=1; i!=A.length; i++) { // Insert i'th record
    int j;
    int temp = A[i];
    for (j=i; (j!=0) && (temp < A[j-1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Instead of swapping, "shift" the values down the array
void inssortshift(int[] A) {
  for (int i=1; i<A.length; i++) { // Insert i'th record
    int j;
    int temp = A[i];
    for (j=i; (j>0) && (temp < A[j-1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Same as standard insertion sort, except get rid of the swap
// function call
void inssort2(int[] A) {
  int temp;
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}

void sorttest(int[] A) {
  inssort(A);
}

/* *** ODSATag: Insertionsort *** */
void inssort(int[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */
