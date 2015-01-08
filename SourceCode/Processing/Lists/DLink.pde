/* *** ODSATag: DLink *** */
class Link {            // Doubly linked list node
  private Object e;     // Value for this node
  private Link n;       // Pointer to next node in list
  private Link p;       // Pointer to previous node

  // Constructors
  Link(Object it, Link inp, Link inn) { e = it;  p = inp; n = inn; }
  Link(Link inp, Link inn) { p = inp; n = inn; }

  // Get and set methods for the data members
  Object element() { return e; }                     // Return the value
  Object setElement(Object it) { return e = it; }    // Set element value
  Link next() { return n; }                          // Return next link
  Link setNext(Link nextval) { return n = nextval; } // Set next link
  Link prev() { return p; }                          // Return prev link
  Link setPrev(Link prevval) { return p = prevval; } // Set prev link
}
/* *** ODSAendTag: DLink *** */
