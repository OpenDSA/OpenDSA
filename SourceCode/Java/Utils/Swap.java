// Swap for int arrays
static void swap(int[] A, int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

// Swap for int arrays
static void swap(Object[] A, int i, int j) {
  Object temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
