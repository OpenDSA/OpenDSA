// Timing test for loops: incrementing vs. decrementing (test against 0)
import java.io.*;
import java.math.*;
import java.util.*;

public class SortTime {
// Swap for int arrays
static void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
// Convenience functions for consistency with Processing code

static public void println(String s) {
  System.out.println(s);
}

static public long millis() {
  return System.currentTimeMillis();
}
static void sorttime(int[] B) {
  int i;
  int[] A = new int[B.length];

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  selsort(A);
  time2 = millis();
  checkorder(A);
  println("Standard Selection Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  selsortcheck(A);
  time2 = millis();
  checkorder(A);
  println("Standard Selection Sort: Size " + testsize + ", Time: " + (time2-time1));
}

// Same as selsort, but check if the swap is necessary
static void selsortcheck(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    if (bigindex != A.length-i-1)
      swap(A, bigindex, A.length-i-1); // Put it into place
  }
}

static void sorttest(int[] A) {
  selsort(A);
}

/* *** ODSATag: Selectionsort *** */
static void selsort(int[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    swap(A, bigindex, A.length-i-1); // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */
static int numtests = 5;
static int testsize = 10000;
static boolean SUCCESS = true;
static long time1, time2;
static Random value;

static void checkorder(int[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}

static void makenew(int[] A) {
  for (int i=0; i<A.length; i++)
    A[i] = (Math.abs(value.nextInt()) % 1000) + 1;
}

public static void main(String args[]) throws IOException {
  int[] A = new int[testsize];
  int i;
  value = new Random();

  sorttime(A);
}

}
