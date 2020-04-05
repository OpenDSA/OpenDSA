import java.io.*;

// Tester for binary search function
public class Bsearch {

static boolean SUCCESS = true;

/* *** ODSATag: BinarySearch *** */
// Return the position of an element in sorted array A with value K.
// If K is not in A, return A.length.
public static int binarySearch(int[] A, int K) {
  int low = 0;
  int high = A.length - 1;
  while(low <= high) {                  // Stop when low and high meet
    int mid = (low + high) / 2;         // Check middle of subarray
    if( A[mid] < K) low = mid + 1;      // In right half
    else if(A[mid] > K) high = mid - 1; // In left half
    else return mid;                    // Found it
  }
  return A.length;                      // Search value not in A
}
/* *** ODSAendTag: BinarySearch *** */

public static void main(String args[]) throws IOException {
  int[] A = {2, 3, 4, 5, 7, 10};

  int pos = binarySearch(A, 4);
  if (pos != 2)
    SUCCESS = false;

  pos = binarySearch(A, 6);
  if (pos != 6)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Binary Search Testing failed");
  }
}

}
