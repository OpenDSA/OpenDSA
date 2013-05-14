/* *** ODSATag: Dlist *** */
/** Insert "it" at current position */
public void insert(E it) {
  curr.setNext(new DLink<E>(it, curr, curr.next()));  
  curr.next().next().setPrev(curr.next());
  cnt++;
}

/** Append "it" to list */
public void append(E it) {
  tail.setPrev(new DLink<E>(it, tail.prev(), tail));
  tail.prev().prev().setNext(tail.prev());
  cnt++;
}

/** Remove and return current element */
public E remove() {
  if (curr.next() == tail) return null; // Nothing to remove
  E it = curr.next().element();      // Remember value
  curr.next().next().setPrev(curr);
  curr.setNext(curr.next().next());  // Remove from list
  cnt--;			     	            // Decrement the
  count
  return it;                         // Return value removed
}

/** Move curr one step left; no change if at front */
public void prev() {
  if (curr != head)   // Can't back up from list head
    curr = curr.prev();
}
/* *** ODSAendTag: Dlist *** */
