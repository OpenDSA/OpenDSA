// Linked list implementation that uses a Freelist

class LList<E> implements List<E> {
  private Link<E> head;         // Pointer to list header
  private Link<E> tail;         // Pointer to last element
  private Link<E> curr;         // Access to current element
  private int listSize;         // Size of list

  // Constructors
  LList(int size) { this(); }   // Constructor -- Ignore size
  LList() { clear(); }

  // Remove all elements
  public void clear() {
    while (head != null) {
      Link<E> temp = head.next();
      head.release();
      head = temp;
    }
    curr = tail = Link.get(null, null); // Create trailer
    head = Link.get(null, tail);        // Create header
    listSize = 0;
  }
  
  // WARNING: In append(), I am using a temp variable because putting that value
  // into the call to setNext generated a compiler error for no reason that I can see.

/* *** ODSATag: Freelist *** */
  // Insert "it" at current position
  public boolean insert(E it) {
    curr.setNext(Link.get(curr.element(), curr.next())); // Get link
    curr.setElement(it);
    if (tail == curr) tail = curr.next();    // New tail
    listSize++;
    return true;
  }

  // Append "it" to list
  public boolean append(E it) {
    Link<E> temp = Link.get(null, null);
    tail.setNext(temp);
    tail.setElement(it);
    tail = tail.next();
    listSize++;
    return true;
  }

  // Remove and return current element
  public E remove () {
    if (curr == tail) return null;          // Nothing to remove
    E it = curr.element();                  // Remember value
    curr.setElement(curr.next().element()); // Pull forward the next element
    if (curr.next() == tail) tail = curr;   // Removed last, move tail
    Link<E> tempptr = curr.next();             // Remember the link
    curr.setNext(curr.next().next());       // Point around unneeded link
    tempptr.release();                      // Release the link
    listSize--;                             // Decrement element count
    return it;                              // Return value
  }
  /* *** ODSAendTag: Freelist *** */

  public void moveToStart() { curr = head.next(); } // Set curr at list start
  public void moveToEnd() { curr = tail; }          // Set curr at list end

  // Move curr one step left; no change if now at front
  public void prev() {
    if (head.next() == curr) return;         // No previous element
    Link<E> temp = head;
    // March down list until we find the previous element
    while (temp.next() != curr) temp = temp.next();
    curr = temp;
  }

  // Move curr one step right; no change if now at end
  public void next() { if (curr != tail) curr = curr.next(); }

  public int length() { return listSize; }          // Return list length


  // Return the position of the current element
  public int currPos() {
    Link<E> temp = head.next();
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
  public E getValue() {
    if(curr == tail) return null;
    return curr.element();
  }
  
  // Check if the list is empty
  public boolean isEmpty() { return listSize == 0; }
  
  public String toString() {
		Link<E> temp = head.next();
		StringBuffer out = new StringBuffer((listSize + 1) * 4);

		out.append("< ");
		for (int i = 0; i < currPos(); i++) {
			out.append(temp.element());
			out.append(" ");
			temp = temp.next();
		}
		out.append("| ");
		for (int i = currPos(); i < listSize; i++) {
			out.append(temp.element());
			out.append(" ");
			temp = temp.next();
		}
		out.append(">");
		return out.toString();
	  }
}
