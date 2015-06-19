// Doubly Linked list implementation
class LList implements List {
  private Link head;         // Pointer to list header
  private Link tail;         // Pointer to last element
  private Link curr;         // Access to current element
  private int listSize;      // Size of list

  // Constructors
  LList(int size) { this(); }     // Constructor -- Ignore size
  LList() { clear(); }

  // Remove all elements
  public void clear() {
    curr = tail = new Link(null, null); // Create trailer
    head = new Link(null, tail);        // Create header
    tail.setPrev(head);                 // Set prev link for trailer
    listSize = 0;
  }

/* *** ODSATag: Dlist *** */
  // Insert "it" at current position
/* *** ODSATag: DListInsert *** */
  public boolean insert(Object it) {
    curr = new Link(it, curr.prev(), curr);
    curr.prev().setNext(curr);
    curr.next().setPrev(curr);
    listSize++;
    return true;
  }
/* *** ODSAendTag: DListInsert *** */

// Append "it" to list
/* *** ODSATag: DListAppend *** */
  public boolean append(Object it) {
    tail.setPrev(new Link(it, tail.prev(), tail));
    tail.prev().prev().setNext(tail.prev());
    if (curr == tail) curr = tail.prev();
    listSize++;
    return true;
  }
/* *** ODSAendTag: DListAppend *** */

  // Remove and return current element
/* *** ODSATag: DListRemove *** */
  public Object remove() {
    if (curr == tail) return null;        // Nothing to remove
    Object it = curr.element();           // Remember value
    curr.prev().setNext(curr.next());     // Remove from list
    curr.next().setPrev(curr.prev());
    curr = curr.next();
    listSize--;                           // Decrement node count
    return it;                            // Return value removed
  }
/* *** ODSAendTag: DListRemove *** */

// Move curr one step left; no change if at front
/* *** ODSATag: DListPrev *** */
  public void prev() {
    if (curr.prev() != head)   // Can't back up from list head
      curr = curr.prev();
  }
/* *** ODSAendTag: DListPrev *** */

/* *** ODSAendTag: Dlist *** */

  public void moveToStart() { curr = head.next(); } // Set curr at list start
  public void moveToEnd() { curr = tail; }     // Set curr at list end
  // Move curr one step right; no change if now at end
  public void next() { if (curr != tail) curr = curr.next(); }
  public int length() { return listSize; } // Return list length
  // Return the position of the current element
  public int currPos() {
    Link temp = head.next();
    int i;
    for (i=0; curr != temp; i++)
      temp = temp.next();
    return i;
  }
  
  // Move down list to "pos" position
  public boolean moveToPos(int pos) {
    if ((pos < 0) || (pos > listSize)) return false;
    curr = head.next();
    for(int i=0; i<pos; i++) curr = curr.next();
    return true;
  }

  // Return true if current position is at end of the list
  public boolean isAtEnd() { return curr == tail; }

  // Return current element value
  public Object getValue() {
    if(curr == tail) return null;
    return curr.element();
  }

  // Test for XOR concept
  public void XOR() {
    int a = 1, b = 1, c = 1;
/* *** ODSATag: XOR *** */
a = a + b;
b = a - b; // Now b contains original value of a
a = a - b; // Now a contains original value of b
/* *** ODSAendTag: XOR *** */
  }
}
