// Dictionary implementation using BST
// This uses KVPair to manage the key/value pairs
class BSTDict implements Dictionary {
  private BST theBST; // The BST that stores the records

  // constructor
  BSTDict() { theBST = new BST(); }

  // Reinitialize dictionary
  public void clear() { theBST = new BST(); }

  // Insert a record
  // k: the key for the record being inserted.
  // e: the record being inserted.
  void insert(Comparable k, Object e) {
    theBST.insert(new KVPair(k, e));
  }

  // Remove and return a record.
  // k: the key of the record to be removed.
  // Return a maching record. If multiple records match "k", remove
  // an arbitrary one. Return null if no record with key "k" exists.
  Object remove(Comparable k) {
    Object temp = theBST.remove(k);
    if (temp == null) return temp;
    else return ((KVPair)temp).value();
  }

  // Remove and return an arbitrary record from dictionary.
  // Return the record removed, or null if none exists.
  Object removeAny() {
    if (theBST.size() == 0) return null;
    Object temp = theBST.remove(((KVPair)(theBST.root.element)).key());
    return ((KVPair)temp).value();
  }

  // Return a record matching "k" (null if none exists).
  // If multiple records match, return an arbitrary one.
  // k: the key of the record to find
  Object find(Comparable k) {
    Object temp = theBST.find(k);
    if (temp == null) return temp;
    else return ((KVPair)temp).value();
  }

  // Return the number of records in the dictionary.
  int size() {
    return theBST.size();
  }
}
