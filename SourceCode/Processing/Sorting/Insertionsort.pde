// Special checkorder for int arrays
void checkorderint(int[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}


// Special swap for int arrays
void swapint(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

void sorttime(Comparable[] B) {
  int i;
  Comparable[] A = new Comparable[B.length];
  int totaltime, runs;
  int numruns = 20;

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssort(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Standard Insertion Sort for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssort2(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Standard Insertion Sort for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssortshift(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("shuffling Insertion Sort for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  inssortshift2(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("shuffling Insertion Sort 2 for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
int[] Aint = new int[B.length];
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) Aint[i] = (int)((Integer)B[i]);
  time1 = millis();
  inssortint(Aint);
  time2 = millis();
  checkorderint(Aint);
totaltime += (time2-time1);
}
  println("Straight integer Insertion Sort for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
KVPair[] AKV = new KVPair[B.length];
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) AKV[i] = new KVPair(B[i], (Integer)B[i]);
  time1 = millis();
  inssort(AKV);
  time2 = millis();
  checkorder(AKV);
  totaltime += (time2-time1);
}
  println("KVPairs Insertion Sort for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);
}


// Same as inssortsuffle, but try != instead of < for the zero test
// This will only matter to JavaScript
void inssortshift2(Comparable[] A) {
  for (int i=1; i!=A.length; i++) { // Insert i'th record
    int j;
    Comparable temp = A[i];
    for (j=i; (j!=0) && (temp.compareTo(A[j-1])< 0); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

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

// Same as standard insertion sort, except get rid of the swap
// function call
void inssort2(Comparable[] A) {
  Comparable temp;
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}

void sorttest(Comparable[] A) {
  inssort(A);
}

void inssortint(int[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--)
      swapint(A, j, j-1);
}

/* *** ODSATag: Insertionsort *** */
void inssort(Comparable[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */
