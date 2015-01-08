// Linked list implementation that uses a Freelist
class LList implements List {
  private Link head;         // Pointer to list header
  private Link tail;         // Pointer to last element
  private Link curr;         // Access to current element
  private int listSize;      // Size of list

  // Constructors
  LList(int size) { this(); }   // Constructor -- Ignore size
  LList() { clear(); }

  // Remove all elements
  void clear() {
    while (head != null) {
      Link temp = head.next();
      head.release();
      head = temp;
    }
    curr = tail = Link.get(null, null); // Create trailer
    head = Link.get(null, tail);        // Create header
    listSize = 0;
  }
  
/* *** ODSATag: Freelist *** */
  // Insert "it" at current position
  boolean insert(Object it) {
    curr.setNext(Link.get(curr.element(), curr.next())); // Get link
    curr.setElement(it);
    if (tail == curr) tail = curr.next();    // New tail
    listSize++;
    return true;
  }

  // Append "it" to list
  boolean append(Object it) {
    tail.setNext(Link.get(null, null));
    tail.setElement(it);
    tail = tail.next();
    listSize++;
    return true;
  }

  // Remove and return current element
  Object remove () {
    if (curr == tail) return null;          // Nothing to remove
    Object it = curr.element();             // Remember value
    curr.setElement(curr.next().element()); // Pull forward the next element
    if (curr.next() == tail) tail = curr;   // Removed last, move tail
    Link tempptr = curr.next();             // Remember the link
    curr.setNext(curr.next().next());       // Point around unneeded link
    tempptr.release();                      // Release the link
    listSize--;                             // Decrement element count
    return it;                              // Return value
  }
  /* *** ODSAendTag: Freelist *** */

  void moveToStart() { curr = head.next(); } // Set curr at list start
  void moveToEnd() { curr = tail; }          // Set curr at list end

  // Move curr one step left; no change if now at front
  void prev() {
    if (head.next() == curr) return;         // No previous element
    Link temp = head;
    // March down list until we find the previous element
    while (temp.next() != curr) temp = temp.next();
    curr = temp;
  }

  // Move curr one step right; no change if now at end
  void next() { if (curr != tail) curr = curr.next(); }

  int length() { return listSize; }          // Return list length


  // Return the position of the current element
  int currPos() {
    Link temp = head.next();
    int i;
    for (i=0; curr != temp; i++)
      temp = temp.next();
    return i;
  }
  
  // Move down list to "pos" position
  boolean moveToPos(int pos) {
    if ((pos < 0) || (pos > listSize)) return false;
    curr = head.next();
    for(int i=0; i<pos; i++) curr = curr.next();
    return true;
  }

  // Return true if current position is at end of the list
  boolean isAtEnd() { return curr == tail; }

  // Return current element value
  Object getValue() {
    if(curr == tail) return null;
    return curr.element();
  }
}
