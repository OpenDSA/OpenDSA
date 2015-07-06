/* *** ODSATag: KVPair *** */
// KVPair class definition
public class KVPair implements Comparable {
  Comparable theKey;
  Object theVal;

  KVPair(Comparable k, Object v) {
    theKey = k;
    theVal = v;
  }

  public int compareTo(Object it) throws ClassCastException {
    if (it instanceof KVPair) // Compare two KVPair objects
      return theKey.compareTo(((KVPair)it).key());
    else if (it instanceof Comparable) // Compare against a key value
      return theKey.compareTo(it);
    else
      throw new ClassCastException("Something comparable is expected.");
  }

  public Comparable key() {
    return theKey;
  }

  public Object value() {
    return theVal;
  }
}
/* *** ODSAendTag: KVPair *** */
