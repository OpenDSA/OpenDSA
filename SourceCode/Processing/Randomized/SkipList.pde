/* *** ODSATag: SkipRand *** */
/** Pick a level using a geometric distribution */
int randomLevel() {
  int lev;
  for (lev=0; DSutil.random(2) == 0; lev++); // Do nothing
  return lev;
}
/* *** ODSAendTag: SkipRand *** */


/* *** ODSATag: SkipInsert *** */
/** Insert a record into the skiplist */
public void insert(Key k, E newValue) {
  int newLevel = randomLevel();  // New node's level
  if (newLevel > level)          // If new node is deeper
    AdjustHead(newLevel);        //   adjust the header
  // Track end of level
  SkipNode<Key,E>[] update =
         (SkipNode<Key,E>[])new SkipNode[level+1];
  SkipNode<Key,E> x = head;        // Start at header node
  for (int i=level; i>=0; i--) { // Find insert position
    while((x.forward[i] != null) &&
          (k.compareTo(x.forward[i].key()) > 0))
      x = x.forward[i];
    update[i] = x;               // Track end at level i
  }
  x = new SkipNode<Key,E>(k, newValue, newLevel);
  for (int i=0; i<=newLevel; i++) {      // Splice into list
    x.forward[i] = update[i].forward[i]; // Who x points to
    update[i].forward[i] = x;            // Who y points to
  }
  size++;                       // Increment dictionary size
}
/* *** ODSAendTag: SkipInsert *** */

/* *** ODSATag: SkipFind *** */
/** Skiplist Search */
public E find(Key searchKey) {
  SkipNode<Key,E> x = head;          // Dummy header node
  for (int i=level; i>=0; i--)       // For each level...
    while ((x.forward[i] != null) && // go forward
           (searchKey.compareTo(x.forward[i].key()) > 0))
      x = x.forward[i];              // Go one last step
  x = x.forward[0];  // Move to actual record, if it exists
  if ((x != null) && (searchKey.compareTo(x.key()) == 0))
    return x.element();              // Got it
  else return null;                  // Its not there
}
/* *** ODSAendTag: SkipFind *** */
