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
    if (it instanceof KVPair) // Compare two KVPair objects
      return theKey.compareTo(((KVPair)it).key());
    else if (it instanceof Comparable) // Compare against a key value
      return theKey.compareTo(it);
    else
      throw new ClassCastException("Something comparable is expected.");
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
