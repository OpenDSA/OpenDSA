/* *** ODSATag: KVPair *** */
// KVPair class definition
public class KVPair<K extends Comparable<K>, E> implements Comparable<KVPair<K, E>> {
  K theKey;
  E theVal;

  KVPair(K k, E v) {
    theKey = k;
    theVal = v;
  }

  // Compare KVPairs
  public int compareTo(KVPair<K,E> it) {
    return theKey.compareTo(it.key());
  }

  // Compare against a key
  public int compareTo(K it) {
    return theKey.compareTo(it);
  }

  public K key() {
    return theKey;
  }

  public E value() {
    return theVal;
  }


  public String toString() {
    String s = "(";
    if (theKey != null) { s += theKey.toString(); }
    else { s += "null"; }
    s += ", ";
    if (theVal != null) { s += theVal.toString(); }
    else { s += "null"; }
    s += ")";
    return s;
  }
}
/* *** ODSAendTag: KVPair *** */
