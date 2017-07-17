import java.util.Random;

/** Skip list implementation for Dictionary ADT */
/* *** ODSATag: SkipBasic *** */
class SkipList<K extends Comparable<K>, E> implements Dictionary<K, E> {
  private SkipNode<K, E> head;
  private int level;
  private int size;
  static private Random ran = new Random(); // Hold the Random class object

  public SkipList() {
    head = new SkipNode<K, E>(null, null, 0);
    level = -1;
    size = 0;
  }
  /* *** ODSAendTag: SkipBasic *** */

  public void print() {
    SkipNode<K, E> temp = head;
    while (temp != null) {
      System.out
          .print("rec is " + temp.rec + " with length " + temp.forward.length + ": ");
      for (int i = 0; i < temp.forward.length; i++)
        if (temp.forward[i] == null)
          System.out.print("null ");
        else
          System.out.print(temp.forward[i] + " ");
      System.out.println();
      temp = temp.forward[0];
    }
    System.out.println();
  }

  public int size() {
    return size;
  }

  public E removeAny() {
    assert false : "removeAny not implemented";
    return null;
  }

  public E remove(K key) {
    assert false : "remove not implemented";
    return null;
  }

  public void clear() {
    assert false : "clear not implemented";
  }

  /* *** ODSATag: SkipRand *** */
  // Pick a level using a geometric distribution
  int randomLevel() {
    int lev;
    for (lev = 0; Math.abs(ran.nextInt()) % 2 == 0; lev++) // ran is random generator
      ; // Do nothing
    return lev;
  }
  /* *** ODSAendTag: SkipRand *** */

  @SuppressWarnings("unchecked")
  /* *** ODSATag: SkipInsert *** */
  /** Insert a key, element pair into the skip list */
  public void insert(K key, E elem) {
    int newLevel = randomLevel(); // New node's level
    if (newLevel > level) // If new node is deeper
      adjustHead(newLevel); // adjust the header
    // Track end of level
    SkipNode<K, E>[] update = new SkipNode[level + 1];
    SkipNode<K, E> x = head; // Start at header node
    for (int i = level; i >= 0; i--) { // Find insert position
      while ((x.forward[i] != null) && (x.forward[i].key().compareTo(key) < 0))
        x = x.forward[i];
      update[i] = x; // Track end at level i
    }
    x = new SkipNode<K, E>(key, elem, newLevel);
    for (int i = 0; i <= newLevel; i++) { // Splice into list
      x.forward[i] = update[i].forward[i]; // Who x points to
      update[i].forward[i] = x; // Who points to x
    }
    size++; // Increment dictionary size
  }

  private void adjustHead(int newLevel) {
    SkipNode<K, E> temp = head;
    head = new SkipNode<K, E>(null, null, newLevel);
    for (int i = 0; i <= level; i++)
      head.forward[i] = temp.forward[i];
    level = newLevel;
  }
  /* *** ODSAendTag: SkipInsert *** */

  /* *** ODSATag: SkipFind *** */
  // Return the (first) matching matching element if one exists, null otherwise
  public E find(K key) {
    SkipNode<K, E> x = head; // Dummy header node
    for (int i = level; i >= 0; i--) // For each level...
      while ((x.forward[i] != null) && (x.forward[i].key().compareTo(key) < 0)) // go forward
        x = x.forward[i]; // Go one last step
    x = x.forward[0]; // Move to actual record, if it exists
    if ((x != null) && (x.key().compareTo(key) == 0)) return x.element(); // Got it
    else return null; // Its not there
  }
  /* *** ODSAendTag: SkipFind *** */

  /* *** ODSATag: SkipNode *** */
 class SkipNode<K extends Comparable<K>, E> {
    private KVPair<K, E> rec;
    private SkipNode<K, E>[] forward;

    public E element() {
      return rec.value();
    }

    public K key() {
      return rec.key();
    }

    @SuppressWarnings("unchecked")
    public SkipNode(K key, E elem, int level) {
      rec = new KVPair<K, E>(key, elem);
      forward = new SkipNode[level + 1];
      for (int i = 0; i < level; i++)
        forward[i] = null;
    }

    public String toString() {
      return rec.toString();
    }
  }
 /* *** ODSAendTag: SkipNode *** */
}
