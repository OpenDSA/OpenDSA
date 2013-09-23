boolean SUCCESS = true;
int testsize = 100;

void setup() {
  Integer[] A = new Integer[testsize];
  int i;

  // Initialize to simply be the values from 0 to testsize-1
  // Ultimately, these are going to be our random keys
  for (i=0; i<A.length; i++)
    A[i] = i;
  // Now, generate a permuation on the numbers
  permute(A);

  // The heap constructor invokes the buildheap method
  MaxHeap H = new MaxHeap(A, A.length, A.length);

  // Now, verify that it is really a heap
  for (i=testsize/2-1; i>=0; i--) {
    if (i < (testsize-1)/2) {
      if (A[i].compareTo(A[2*i+2]) < 0) {
        println("Oops! Heap out of order");
        SUCCESS = false;
      }
    }
    if (A[i].compareTo(A[2*i+1]) < 0) {
      println("Oops! Heap out of order");
      SUCCESS = false;
    }
  }

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
