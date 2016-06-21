// Top part of sort timing framework
// This part contains all of the test harness for defining the tests
// to be run.

import java.io.*;
import java.math.*;
import java.util.*;

// In the end, everything ends up inside a class named "SortTime"
public class SortTime {

/** Initialize the random variable */
static Random value = new Random(); // Hold the Random class object

/** Create a random number function from the standard Java Random
    class. Turn it into a uniformly distributed value within the
    range 0 to n-1 by taking the value mod n.
    @param n The upper bound for the range.
    @return A value in the range 0 to n-1.
*/
static int random(int n) {
  return Math.abs(value.nextInt()) % n;
}


static public long millis() {
  return System.currentTimeMillis();
}

// The timer variables
static long time1, time2;
static long totaltime;


// The full size of the various lists.
// The idea is to set up some number of test runs in this space.
// For full timing tests, this should be 1,000,000.
// But for debugging purposes, might want to make it shorter to speed
// things up.
final static int TESTSIZE = 10000;


// ====================================================================
// The various arrays and lists used by the sorting process
static int[] int10;      // For lists of size 10
static int[] int100;     // For lists of size 100


// ====================================================================
// Swap section: Swap the values in a list
// Add more versions of swap as needed.

// Swap for int arrays
static void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}


// ====================================================================
// Permute section: Randomly permute the values in a list
// Add more versions of permute as needed.

static void permute(int[] A, int startpos, int length) {
  for (int i = startpos + length; i > startpos; i--) // for each i
    swap(A, i-1, startpos + random(length)); // swap A[i-1] with a random
}                                            // position in the range 0 to i-1.


// ====================================================================
// Checkorder section: Implementations to check that a list of some
// type is indeed sorted.
// Add more versions of checkorder as needed.

// Simple int
void checkorder(int[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      System.out.println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}


// ====================================================================
// This section is for initializing the various lists for the many
// tests.
// Add a new version of "setup" for each data type.
// Add to each version of "setup" for additional tests.

static void setupint() {
  int startpos; // Each tests start position in array
  int numtests; // Number of tests of this size
  int i, j;

  // int array of size 10: Uniform random distribution
  int10 = new int[TESTSIZE];
  numtests = TESTSIZE/10;
  for (i=0; i<numtests; i++) {
    startpos = 10 * i;
    for (j=0; j<10; j++)
      int10[startpos + j] = j;
    permute(int10, startpos, 10);
  }

  // int array of size 100: Uniform random distribution
  int10 = new int[TESTSIZE];
  numtests = TESTSIZE/100;
  for (i=0; i<numtests; i++) {
    startpos = 100 * i;
    for (j=0; j<100; j++)
      int10[startpos + j] = j;
    permute(int10, startpos, 100);
  }
}
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

}
