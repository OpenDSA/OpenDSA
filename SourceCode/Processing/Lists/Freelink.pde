/* *** ODSATag: Freelink *** */
/** Singly linked list node with freelist support */
class Link<E> {
  private E element;    // Value for this node
  private Link<E> next; // Point to next node in list

  /** Constructors */
  Link(E it, Link<E> nextval)
    { element = it; next = nextval; }
  Link(Link<E> nextval) { next = nextval; }

  /** Get and set methods */
  Link<E> next() { return next; }
  Link<E> setNext(Link<E> nxtval) { return next = nxtval; }
  E element() { return element; }
  E setElement(E it) { return element = it; }

  /** Extensions to support freelists */
  static Link freelist = null;     // Freelist for the class

  /** @return A new link */
  static <E> Link<E> get(E it, Link<E> nextval) {
    if (freelist == null)
      return new Link<E>(it, nextval); // Get from "new"
    Link<E> temp = freelist;           // Get from freelist
    freelist = freelist.next();
    temp.setElement(it);
    temp.setNext(nextval);
    return temp;
  }

  /** Return a link to the freelist */
  void release() {
    element = null;   // Drop reference to the element
    next = freelist;
    freelist = this;
  }
}
/* *** ODSAendTag: Freelink *** */
