/* *** ODSATag: Freelist *** */
/** Insert "it" at current position */
public void insert(E it) {
  curr.setNext(Link.get(it, curr.next())); // Get link
  if (tail == curr) tail = curr.next();    // New tail
  cnt++;
}

/** Append "it" to list */
public void append(E it) {
  tail = tail.setNext(Link.get(it, null));
  cnt++;
}

/** Remove and return current element */
public E remove() {
  if (curr.next() == null) return null; // Nothing to remove
  E it = curr.next().element();         // Remember value
  if (tail == curr.next()) tail = curr; // Removed last
  Link<E> tempptr = curr.next();        // Remember link
  curr.setNext(curr.next().next());     // Remove from list
  tempptr.release();                    // Release link
  cnt--;				   	           // Decrement count
  return it;                            // Return removed
}
/* *** ODSAendTag: Freelist *** */
