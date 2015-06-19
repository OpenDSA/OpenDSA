/* *** ODSATag: DLink *** */
class Link<E> {         // Doubly linked list node
  private E e;          // Value for this node
  private Link<E> n;    // Pointer to next node in list
  private Link<E> p;    // Pointer to previous node

  // Constructors
  Link(E it, Link<E> inp, Link<E> inn) { e = it;  p = inp; n = inn; }
  Link(Link<E> inp, Link<E> inn) { p = inp; n = inn; }

  // Get and set methods for the data members
  public E element() { return e; }                                // Return the value
  public E setElement(E it) { return e = it; }                    // Set element value
  public Link<E> next() { return n; }                             // Return next link
  public Link<E> setNext(Link<E> nextval) { return n = nextval; } // Set next link
  public Link<E> prev() { return p; }                             // Return prev link
  public Link<E> setPrev(Link<E> prevval) { return p = prevval; } // Set prev link
}
/* *** ODSAendTag: DLink *** */
