void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

/* *** ODSATag: Insertionsort *** */
void inssort(int[] A) {
  for (int i=1; i<A.length; i++) // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */

void setup() {
  println("begin");
  int[] A = {92, 91, 92, 51, 22, 13, 64, 55, 83, 76};
  inssort(A);
  println("Done inssort");
  for (int i=0; i<A.length; i++)
    print(A[i] + " ");
  println();
  println("Done!");
}
