// Timing test for loops: incrementing vs. decrementing (test against 0)
import java.io.*;
import java.math.*;
import java.util.*;

public class SortTest {

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
  inssort(A);
  time2 = millis();
  checkorder(A);
  println("Standard Insertion Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  inssort2(A);
  time2 = millis();
  checkorder(A);
  println("Standard Insertion Sort: Size " + testsize + ", Time: " + (time2-time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  makenew(A);
  time1 = millis();
  inssortshift(A);
  time2 = millis();
  checkorder(A);
  println("shuffling Insertion Sort: Size " + testsize + ", Time: " + (time2-time1));

  makenew(A);
  time1 = millis();
  inssortshift2(A);
  time2 = millis();
  checkorder(A);
  println("shuffling Insertion Sort 2: Size " + testsize + ", Time: " + (time2-time1));
}


// Same as inssortsuffle, but try != instead of < for the zero test
// This will only matter to JavaScript
static void inssortshift2(int[] A) {
  for (int i=1; i<A.length; i++) { // Insert i'th record
    int j;
    int temp = A[i];
    for (j=i; (j!=0) && (temp < A[j-1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Instead of swapping, "shift" the values down the array
static void inssortshift(int[] A) {
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
static void inssort2(int[] A) {
  int temp;
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}

static void sorttest(int[] A) {
  inssort(A);
}

/* *** ODSATag: Insertionsort *** */
static void inssort(int[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */
static int numtests = 5;
static int testsize = 100;
static boolean SUCCESS = true;
static long time1, time2;

static void makenew(int[] A) { }
static void checkorder(int[] A) { }

public static void main(String args[]) throws IOException {
  int[] A = new int[testsize];
  int i;

  Random value = new Random();
  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = (Math.abs(value.nextInt()) % 1000) + 1;
    sorttest(A);
    for (i=1; i<A.length; i++)
      if (A[i] < A[i-1]) {
        println("Error! Value " + A[i] + " at position " + i +
                " was less than " + A[i-1] + " at position " + (i-1));
        SUCCESS = false;
      }
  }
  println("Hooray!");
}

}
