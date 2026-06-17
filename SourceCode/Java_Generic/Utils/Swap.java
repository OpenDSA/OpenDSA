  // Swap for arrays of generic objects
  static <T> void swap(T[] A, int i, int j) {
    T temp = A[i];
    A[i] = A[j];
    A[j] = temp;
  }
