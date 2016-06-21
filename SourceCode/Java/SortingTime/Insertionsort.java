// Standard insertion sort
static void inssort(int[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      swap(A, j, j-1);
    }
}


// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2(int[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}


// Run the various sorting tests on each of the sorting algorithms
public static void main(String args[]) throws IOException {
  value = new Random();
  int i;

  // inssort
  setupint();
  totaltime = 0;
  for (i=0; i<TESTSIZE; i += 10) {
    time1 = millis();
    inssort(int10, i, 10);
    time2 = millis();
    totaltime += (time2-time1);
  }
  System.out.println("inssort Time for lists of size 10: " + totaltime);

  totaltime = 0;
  for (i=0; i<TESTSIZE; i += 100) {
    time1 = millis();
    inssort(int10, i, 100);
    time2 = millis();
    totaltime += (time2-time1);
  }
  System.out.println("inssort Time for lists of size 100: " + totaltime);

  // inssort2
  setupint();
  totaltime = 0;
  for (i=0; i<TESTSIZE; i += 10) {
    time1 = millis();
    inssort2(int10, i, 10);
    time2 = millis();
    totaltime += (time2-time1);
  }
  System.out.println("inssort2 Time for lists of size 10: " + totaltime);

  totaltime = 0;
  for (i=0; i<TESTSIZE; i += 100) {
    time1 = millis();
    inssort2(int10, i, 100);
    time2 = millis();
    totaltime += (time2-time1);
  }
  System.out.println("inssort2 Time for lists of size 100: " + totaltime);

}
