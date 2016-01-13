/* *** ODSATag: SkipRand *** */
/** Pick a level using a geometric distribution */
int randomLevel() {
  int lev;
  for (lev=0; DSutil.random(2) == 0; lev++); // Do nothing
  return lev;
}
/* *** ODSAendTag: SkipRand *** */


/* *** ODSATag: SkipInsert *** */
/** Insert a KVPair into the skiplist */
public boolean insert(KVPair<K,E> it) {
  int newLevel = randomLevel();
  Comparable<K> k = it.key();
  if (level < newLevel)
    adjustHead(newLevel);
  @SuppressWarnings("unchecked") // Generic array allocation
  SkipNode[] update = (SkipNode[])Array.newInstance(SkipList.SkipNode.class, level+1);
  SkipNode x = head;        // Start at header node
  for (int i=level; i>=0; i--) { // Find insert position
    while((x.forward[i] != null) && (k.compareTo((x.forward[i]).element().key()) > 0))
      x = x.forward[i];
    update[i] = x;               // Track end at level i
  }	
  x = new SkipNode(it, newLevel);
  for (int i=0; i<=newLevel; i++) {      // Splice into list
    x.forward[i] = update[i].forward[i]; // Who x points to
    update[i].forward[i] = x;            // Who y points to
  }
  size++;                       // Increment dictionary size
  return true;
}
/* *** ODSAendTag: SkipInsert *** */

/* *** ODSATag: SkipFind *** */
/** Skiplist Search */
private SkipNode searchhelp(Comparable<K> key) {
  SkipNode x = head;                     // Dummy header node
  for (int i=level; i>=0; i--)           // For each level...
    while ((x.forward[i] != null) &&
           (key.compareTo(x.forward[i].element().key()) > 0)) // go forward
      x = x.forward[i];              // Go one last step
  x = x.forward[0];  // Move to actual record, if it exists
  return x;
}

// Print any matching elements. Return true iff at least one element is found
public boolean search(Comparable<K> key) {
  boolean found = false;
  SkipNode x = searchhelp(key);
  while ((x != null) && (key.compareTo(x.element().key()) == 0)) {
    System.out.println("Found: " + x.element());
    found = true;
    x = x.forward[0];
  }
  return found;
}
/* *** ODSAendTag: SkipFind *** */
