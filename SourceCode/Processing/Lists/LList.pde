/* *** ODSATag: LList *** */
/** Linked list implementation */
class LList<E> implements List<E> {
private Link<E> head;         // Pointer to list header
private Link<E> tail;         // Pointer to last element
protected Link<E> curr;       // Access to current element
private int cnt;              // Size of list

/** Constructors */
LList(int size) { this(); }   // Constructor -- Ignore size
LList() {
  curr = tail = head = new Link<E>(null); // Create header
  cnt = 0;
}

/** Remove all elements */
public void clear() {
  head.setNext(null);         // Drop access to links
  curr = tail = head = new Link<E>(null); // Create header
  cnt = 0;
}

/** Insert "it" at current position */
public void insert(E it) {
  curr.setNext(new Link<E>(it, curr.next()));  
  if (tail == curr) tail = curr.next();  // New tail
  cnt++;
}

/** Append "it" to list */
public void append(E it) {
  tail = tail.setNext(new Link<E>(it, null));
  cnt++;
}

/** Remove and return current element */
public E remove() {
  if (curr.next() == null) return null; // Nothing to remove
  E it = curr.next().element();         // Remember value
  if (tail == curr.next()) tail = curr; // Removed last
  curr.setNext(curr.next().next());     // Remove from list
  cnt--;                                // Decrement count
  return it;                            // Return value
}

/** Set curr at list start */
public void moveToStart()
{ curr = head; }

/** Set curr at list end */
public void moveToEnd()
{ curr = tail; }

/** Move curr one step left; no change if now at front */
public void prev() {
  if (curr == head) return; // No previous element
  Link<E> temp = head;
  // March down list until we find the previous element
  while (temp.next() != curr) temp = temp.next();
  curr = temp;
}

/** Move curr one step right; no change if now at end */
public void next()
  { if (curr != tail) curr = curr.next(); }

/** @return List length */
public int length() { return cnt; }

/** @return The position of the current element */
public int currPos() {
  Link<E> temp = head;
  int i;
  for (i=0; curr != temp; i++)
    temp = temp.next();
  return i;
}

/** Move down list to "pos" position */
public void moveToPos(int pos) {
  assert (pos>=0) && (pos<=cnt) : "Position out of range";
  curr = head;
  for(int i=0; i<pos; i++) curr = curr.next();
}

/** @return Current element value */
public E getValue() {
  if(curr.next() == null) return null;
  return curr.next().element();
}
/* *** ODSAendTag: LList *** */
