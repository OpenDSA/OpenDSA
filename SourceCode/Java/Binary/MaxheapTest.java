import java.io.*;

public class MaxheapTest {
  static boolean SUCCESS = true;
  static int testsize = 100;

  public static void main(String args[]) throws IOException {
    Integer[] A = new Integer[testsize];
    int i;

    // Initialize to simply be the values from 0 to testsize-1
    // Ultimately, these are going to be our random keys
    for (i=0; i<A.length; i++)
      A[i] = i;
    // Now, generate a permuation on the numbers
    Permute.permute(A);

    // The heap constructor invokes the buildheap method
    MaxHeap H = new MaxHeap(A, A.length, A.length);

    // Now, verify that it is really a heap
    for (i=testsize/2-1; i>=0; i--) {
      if (i < (testsize-1)/2) {
        if (A[i].compareTo(A[2*i+2]) < 0) {
          System.out.println("Oops! Heap out of order");
          SUCCESS = false;
        }
      }
      if (A[i].compareTo(A[2*i+1]) < 0) {
        System.out.println("Oops! Heap out of order");
        SUCCESS = false;
      }
    }

    if (SUCCESS) {
      PrintWriter output = new PrintWriter("success");
      output.println("Success");
      output.flush();
      output.close();
      System.out.println("Success!");
    } else {
      System.out.println("Maxheap code testing failed");
    }
  }
}
