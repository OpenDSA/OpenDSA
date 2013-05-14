/* *** ODSATag: DLink *** */
/** Doubly linked list node */
class DLink<E> {
  private E element;         // Value for this node
  private DLink<E> next;     // Pointer to next node in list
  private DLink<E> prev;     // Pointer to previous node

  /** Constructors */
  DLink(E it, DLink<E> p, DLink<E> n)
  { element = it;  prev = p; next = n; }
  DLink(DLink<E> p, DLink<E> n) { prev = p; next = n; }

  /** Get and set methods for the data members */
  DLink<E> next() { return next; }
  DLink<E> setNext(DLink<E> nextval)
    { return next = nextval; }
  DLink<E> prev() { return prev; }
  DLink<E> setPrev(DLink<E> prevval)
    { return prev = prevval; }
  E element() { return element; }
  E setElement(E it) { return element = it; }
}
/* *** ODSAendTag: DLink *** */
