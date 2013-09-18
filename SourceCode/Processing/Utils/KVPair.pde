/* *** ODSATag: KVpair *** */
// KVPair class definition
class KVPair implements Comparable {
  Comparable theKey;
  Object theVal;

  KVPair(Comparable k, Object v) {
    theKey = k;
    theVal = v;
  }

  int compareTo(Object it) throws ClassCastException {
    if (!(it instanceof KVPair))
      throw new ClassCastException("A KVPair object expected.");
    return theKey.compareTo(((KVPair)it).key());
  }

  Comparable key() {
    return theKey;
  }

  Object value() {
    return theVal;
  }
}
/* *** ODSAendTag: KVpair *** */

// Swap for KVPair arrays
void swap(KVPair[] A, int i, int j) {
  KVPair temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
