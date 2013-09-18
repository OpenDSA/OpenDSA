/* *** ODSATag: DictionaryADT *** */
// The Dictionary abstract class.
public interface Dictionary {

  // Reinitialize dictionary
  public void clear();

  // Insert a record
  // k: the key for the record being inserted.
  // e: the record being inserted.
  public void insert(Comparable k, Object e);

  // Remove and return a record.
  // k: the key of the record to be removed.
  // Return a maching record. If multiple records match "k", remove
  // an arbitrary one. Return null if no record with key "k" exists.
  public Object remove(Comparable k);

  // Remove and return an arbitrary record from dictionary.
  // Return the record removed, or null if none exists.
  public Object removeAny();

  // Return a record matching "k" (null if none exists).
  // If multiple records match, return an arbitrary one.
  // k: the key of the record to find
  public Object find(Comparable k);

  // Return the number of records in the dictionary.
  public int size();
};
/* *** ODSAendTag: DictionaryADT *** */
