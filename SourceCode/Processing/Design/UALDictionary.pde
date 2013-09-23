/* *** ODSATag: UALDictionary *** */
// Dictionary implemented by unsorted array-based list.
class UALdictionary implements Dictionary {
  private static final int defaultSize = 10; // Default size
  private AList list;                        // To store dictionary

  // Constructors
  UALdictionary() { this(defaultSize); }
  UALdictionary(int sz) { list = new AList(sz); }

  // Reinitialize
  void clear() { list.clear(); }

  // Insert an element: append to list
  void insert(Comparable k, Object e) {
    KVPair temp = new KVPair(k, e);
    list.append(temp);
  }

  // Use sequential search to find the element to remove
  Object remove(Comparable k) {
    Object temp = find(k);
    if (temp != null) list.remove();
    return temp;
  }

  // Remove the last element
  Object removeAny() {
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
  Object find(Comparable k) {
    for(list.moveToStart(); list.currPos() < list.length();
        list.next()) {
      KVPair temp = (KVPair)list.getValue();
      if (k == temp.key())
        return temp.value();
    }
    return null; // "k" does not appear in dictionary
  }

  // Return list size
  int size() { return list.length(); }
}
/* *** ODSAendTag: UALDictionary *** */
