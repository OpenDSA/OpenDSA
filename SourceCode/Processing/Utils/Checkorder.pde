// Determine if an array is sorted
void checkorder(Comparable[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i].compareTo(A[i-1]) < 0) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
      SUCCESS = false;
    }
}

// Special checkorder for int arrays
void checkorder(int[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
      SUCCESS = false;
    }
}

// Determine if an array is sorted
// Integer record version
void checkorder(Integer[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}
