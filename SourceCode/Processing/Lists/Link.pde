/* *** ODSATag: Link *** */
class Link {         // Singly linked list node class
  private Object e;  // Value for this node
  private Link n;    // Point to next node in list

  // Constructors
  Link(Object it, Link inn) { e = it; n = inn; }
  Link(Link inn) { e = null; n = inn; }

  Object element() { return e; }           // Return the value
  void setelement(Object it) { e = it; }   // Set element value
  Link next() { return n; }                // Return next link
  void setnext(Link inn) { n = inn; }      // Set next link
}
/* *** ODSAendTag: Link *** */
