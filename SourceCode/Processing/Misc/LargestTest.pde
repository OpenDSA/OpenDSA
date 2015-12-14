/* *** ODSATag: Largest *** */
// Return position of largest value in integer array A
int largest(int[] A) {
  int currlarge = 0;             // Position of largest element seen
  for (int i=1; i<A.length; i++) // For each element
    if (A[currlarge] < A[i])     //   if A[i] is larger
       currlarge = i;            //     remember its position
  return currlarge;              // Return largest position
}
/* *** ODSAendTag: Largest *** */

void setup() {
  int[] A = {5, 7, 10, 4, 3, 2, 10};

  int pos = largest(A);
  if (pos != 2)
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  } else {
    println("Testing failed");
  }

  exit();
}
