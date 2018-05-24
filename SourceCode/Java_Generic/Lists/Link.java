/* *** ODSATag: Link *** */
class Link<E> {         // Singly linked list node class
  private E e;          // Value for this node
  private Link<E> n;    // Point to next node in list

  // Constructors
  Link(E it, Link<E> inn) { e = it; n = inn; }
  Link(Link<E> inn) { e = null; n = inn; }

  E element() { return e; }                        // Return the value
  E setElement(E it) { return e = it; }            // Set element value
  Link<E> next() { return n; }                     // Return next link
  Link<E> setNext(Link<E> inn) { return n = inn; } // Set next link
}
/* *** ODSAendTag: Link *** */
