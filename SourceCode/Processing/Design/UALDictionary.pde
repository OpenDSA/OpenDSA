/* *** ODSATag: UALDictionary *** */
/** Dictionary implemented by unsorted array-based list. */
class UALdictionary<Key, E> implements Dictionary<Key, E> {
  private static final int defaultSize = 10; // Default size
  private AList<KVpair<Key,E>> list;  // To store dictionary

  /** Constructors */
  UALdictionary() { this(defaultSize); }
  UALdictionary(int sz)
    { list = new AList<KVpair<Key, E>>(sz); }

  /** Reinitialize */
  public void clear() { list.clear(); }

  /** Insert an element: append to list */
  public void insert(Key k, E e) {
    KVpair<Key,E> temp = new KVpair<Key,E>(k, e);
    list.append(temp);
  }

  /** Use sequential search to find the element to remove */
  public E remove(Key k) {
    E temp = find(k);
    if (temp != null) list.remove();
    return temp;
  }

  /** Remove the last element */
  public E removeAny() {
    if (size() != 0) {
      list.moveToEnd();
      list.prev();
      KVpair<Key,E> e = list.remove();
      return e.value();
    }
    else return null;
  }

  /** Find k using sequential search
      @return Record with key value k */
  public E find(Key k) {
    for(list.moveToStart(); list.currPos() < list.length();
        list.next()) {
      KVpair<Key,E> temp = list.getValue();
      if (k == temp.key())
        return temp.value();
    }
    return null; // "k" does not appear in dictionary
  }

  /** @return List size */
  public int size()
    { return list.length(); }
}
/* *** ODSAendTag: UALDictionary *** */
