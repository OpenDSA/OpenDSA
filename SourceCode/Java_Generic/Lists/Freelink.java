// WARNING: The defnition for freelist generates unchecked warnings
// I don't know of a way to get around this, or to suppress (all of) the warnings.
/* *** ODSATag: Freelink *** */
class Link<E> {      // Singly linked list node with freelist support
  private E e;       // Value for this node
  private Link<E> n;    // Point to next node in list

  // Constructors
  Link(E it, Link<E> inn) { e = it; n = inn; }
  Link(Link<E> inn) { e = null; n = inn; }

  E element() { return e; }                        // Return the value
  E setElement(E it) { return e = it; }            // Set element value
  Link<E> next() { return n; }                     // Return next link
  Link<E> setNext(Link<E> inn) { return n = inn; } // Set next link

  // Extensions to support freelists
  private static Link freelist = null;                  // Freelist for the class

  // Return a new link, from freelist if possible
  static <E> Link<E> get(E it, Link<E> inn) {
    if (freelist == null)
      return new Link<E>(it, inn);                 // Get from "new"
    Link<E> temp = freelist;                       // Get from freelist
    freelist = freelist.next();
    temp.setElement(it);
    temp.setNext(inn);
    return temp;
  }

  // Return a link node to the freelist
  void release() {
    e = null;   // Drop reference to the element
    n = freelist;
    freelist = this;
  }
}
/* *** ODSAendTag: Freelink *** */
