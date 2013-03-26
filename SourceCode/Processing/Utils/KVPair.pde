// KVPair class definition
class KVPair {
  int theKey;
  Object theVal;

  KVPair(int k, Object v) {
    theKey = k;
    theVal = v;
  }

  int key() {
    return theKey;
  }

  Object value() {
    return theVal;
  }
}

// Swap for KVPair arrays
void swap(KVPair[] A, int i, int j) {
  KVPair temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
