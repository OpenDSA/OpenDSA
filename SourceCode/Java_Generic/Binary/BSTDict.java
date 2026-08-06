/* *** ODSATag: BSTDicta *** */
// Dictionary implementation using BST
// This uses KVPair to manage the key/value pairs
public class BSTDict<K extends Comparable<K>, E> implements Dictionary<K, E> {
  private BST<KVPair<K, E>> theBST; // The BST that stores the records

  // constructor
  BSTDict() { theBST = new BST<KVPair<K, E>>(); }

  // Reinitialize dictionary
  public void clear() { theBST = new BST<KVPair<K, E>>(); }

  // Insert a record
  // k: the key for the record being inserted.
  // e: the record being inserted.
  public void insert(K k, E e) {
      theBST.insert(new KVPair<K, E>(k, e));
  }

  // Remove and return a record.
  // k: the key of the record to be removed.
  // Return a maching record. If multiple records match "k", remove
  // an arbitrary one. Return null if no record with key "k" exists.
  public E remove(K k) {
    KVPair<K, E> temp = theBST.remove(new KVPair<K, E>(k, null));
    if (temp == null) { return null; }
    else { return temp.value(); }
  }
/* *** ODSAendTag: BSTDicta *** */

/* *** ODSATag: BSTDictb *** */
  // Remove and return an arbitrary record from dictionary.
  // Return the record removed, or null if none exists.
  public E removeAny() {
    if (theBST.size() == 0) { return null; }
    KVPair<K, E> temp = theBST.remove(theBST.root().value());
    return temp.value();
  }

  // Return a record matching "k" (null if none exists).
  // If multiple records match, return an arbitrary one.
  // k: the key of the record to find
  public E find(K k) {
    KVPair<K, E> temp = theBST.find(new KVPair<K, E>(k, null));
    if (temp == null) { return null; }
    else { return temp.value(); }
  }

  // Return the number of records in the dictionary.
  public int size() {
    return theBST.size();
  }
}
/* *** ODSAendTag: BSTDictb *** */
