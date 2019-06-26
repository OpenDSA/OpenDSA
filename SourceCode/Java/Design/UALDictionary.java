/* *** ODSATag: UALDictionary *** */
// Dictionary implemented by unsorted array-based list.
public class UALDictionary implements Dictionary {
  private static final int defaultSize = 10; // Default size
  private AList list;                        // To store dictionary

  // Constructors
  UALDictionary() { this(defaultSize); }
  UALDictionary(int sz) { list = new AList(sz); }

  // Reinitialize
  public void clear() { list.clear(); }

  // Insert an element: append to list
  public void insert(Comparable k, Object e) {
    KVPair temp = new KVPair(k, e);
    list.append(temp);
  }

  // Use sequential search to find the element to remove
  public Object remove(Comparable k) {
    Object temp = find(k);
    if (temp != null) list.remove();
    return temp;
  }

  // Remove the last element
  public Object removeAny() {
    if (size() != 0) {
      list.moveToEnd();
      list.prev();
      KVPair e = (KVPair)list.remove();
      return e.value();
    }
    else return null;
  }

  // Find k using sequential search
  // Return the record with key value k
  public Object find(Comparable k) {
    for(list.moveToStart(); list.currPos() < list.length();
        list.next()) {
      KVPair temp = (KVPair)list.getValue();
      if (k.compareTo(temp.key()) == 0)
        return temp.value();
    }
    return null; // "k" does not appear in dictionary
  }

  // Return list size
  public int size() { return list.length(); }
}
/* *** ODSAendTag: UALDictionary *** */
