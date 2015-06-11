/* *** ODSATag: LStack1 *** */
// Linked stack implementation
class LStack<E> implements Stack<E> {
  private Link<E> top;            // Pointer to first element
  private int size;               // Number of elements

  // Constructors
  LStack() { top = null; size = 0; }
  LStack(int size) { top = null; size = 0; }
/* *** ODSAendTag: LStack1 *** */

  public String toString() {
    StringBuffer out = new StringBuffer(size * 4);
    for (Link<E> temp = top; temp != null;  temp = temp.next()) {
      out.append(temp.element());
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: LStack2 *** */

  // Reinitialize stack
  public void clear() { top = null; size = 0; }

// Put "it" on stack
/* *** ODSATag: LStackPush *** */  
  public boolean push(E it) {  
    top = new Link<E>(it, top);
    size++;
    return true;
  }
/* *** ODSAendTag: LStackPush *** */

// Remove "it" from stack
/* *** ODSATag: LStackPop *** */    
  public E pop() {           
    if (top == null) return null;
    E it = top.element();
    top = top.next();
    size--;
    return it;
  }
/* *** ODSAendTag: LStackPop *** */

  public E topValue() {      // Return top value
    if (top == null) return null;
    return top.element();
  }

  // Return stack length
  public int length() { return size; }
}
/* *** ODSAendTag: LStack2 *** */
