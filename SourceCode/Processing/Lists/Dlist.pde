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
  void clear() {
    curr = tail = new Link(null, null); // Create trailer
    head = new Link(null, tail);        // Create header
    tail.setPrev(head);                 // Set prev link for trailer
    listSize = 0;
  }
/* *** ODSAendTag: LListCons *** */
  

/* *** ODSATag: Dlist *** */
// Insert "it" at current position
/* *** ODSATag: DListInsert *** */
void insert(Object it) {
  curr = new Link(it, curr.prev(), curr);
  curr.prev().setNext(curr);
  curr.next().setPrev(curr);
  listSize++;
}
/* *** ODSAendTag: DListInsert *** */

// Append "it" to list
/* *** ODSATag: DListAppend *** */
void append(Object it) {
  tail.setPrev(new Link(it, tail.prev(), tail));
  tail.prev().prev().setNext(tail.prev());
  if (curr == tail) curr = tail.prev();
  listSize++;
}
/* *** ODSAendTag: DListAppend *** */

// Remove and return current element
/* *** ODSATag: DListRemove *** */
Object remove() {
  if (curr == tail) return null;        // Nothing to remove
  Object it = curr.element();           // Remember value
  curr.next().setPrev(curr.prev());     // Remove from list
  curr.prev().setNext(curr.next());
  curr = curr.next();
  listSize--;                           // Decrement node count
  return it;                            // Return value removed
}
/* *** ODSAendTag: DListRemove *** */

// Move curr one step left; no change if at front
/* *** ODSATag: DListPrev *** */
void prev() {
  if (curr.prev() != head)   // Can't back up from list head
    curr = curr.prev();
}
/* *** ODSAendTag: DListPrev *** */

/* *** ODSAendTag: Dlist *** */

  void moveToStart() { curr = head.next(); } // Set curr at list start
  void moveToEnd() { curr = tail; }     // Set curr at list end
  // Move curr one step right; no change if now at end
  void next() { if (curr != tail) curr = curr.next(); }
  int length() { return listSize; } // Return list length
  // Return the position of the current element
  int currPos() {
    Link temp = head.next();
    int i;
    for (i=0; curr != temp; i++)
      temp = temp.next();
    return i;
  }
  
  // Move down list to "pos" position
  void moveToPos(int pos) {
    if ((pos < 0) || (pos > listSize)) {
      println("Pos out of range, current position unchanged");
      return;
    }
    curr = head.next();
    for(int i=0; i<pos; i++) curr = curr.next();
  }

  // Return true if current position is at end of the list
  Boolean isAtEnd() { return curr == tail; }

  // Return current element value
  Object getValue() {
    if(curr == tail) return null;
    return curr.element();
  }
}
