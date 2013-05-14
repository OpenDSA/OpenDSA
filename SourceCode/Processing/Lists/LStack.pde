/* *** ODSATag: LStack *** */
/** Linked stack implementation */
class LStack<E> implements Stack<E> {
  private Link<E> top;          // Pointer to first element
  private int size;             // Number of elements

  /** Constructors */
  public LStack() { top = null; size = 0; }
  public LStack(int size) { top = null; size = 0; }

  /** Reinitialize stack */
  public void clear() { top = null; size = 0; }
  
  /** Put "it" on stack */
  public void push(E it) {
    top = new Link<E>(it, top);
    size++;
  }

  /** Remove "it" from stack */
  public E pop() {
    assert top != null : "Stack is empty";
    E it = top.element();
    top = top.next();
    size--;
    return it;
  }

  /** @return Top value */
  public E topValue() {
    assert top != null : "Stack is empty";
    return top.element();
  }

  /** @return Stack length */
  public int length() { return size; }
/* *** ODSAendTag: LStack *** */
