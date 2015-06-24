/* *** ODSATag: KVPair *** */
// KVPair class definition
public class KVPair<T> implements Comparable<T> {
  Comparable<T> theKey;
  Object theVal;

  KVPair(Comparable<T> k, Object v) {
    theKey = k;
    theVal = v;
  }

  //  int compareTo(Comparable<T> it) throws ClassCastException {
  //    if (it instanceof KVPair) // Compare two KVPair objects
  //      return theKey.compareTo(((KVPair)it).key());
  //    else if (it instanceof Comparable<T>) // Compare against a key value
  //      return theKey.compareTo(it);
  //    else
  //      throw new ClassCastException("Something comparable is expected.");
  //  }

  int compareTo(KVPair<T> it) {
    return theKey.compareTo(it.key());
  }

  int compareTo(T it) {
    return theKey.compareTo(it);
  }

  Comparable<T> key() {
    return theKey;
  }

  Object value() {
    return theVal;
  }
}
/* *** ODSAendTag: KVPair *** */
