/* *** ODSATag: LStack1 *** */
// Linked stack implementation
class LStack implements Stack {
  private Link top;               // Pointer to first element
  private int size;               // Number of elements

  // Constructors
  public LStack() { top = null; size = 0; }
  public LStack(int size) { top = null; size = 0; }
/* *** ODSAendTag: LStack1 *** */

  String toString() {
    StringBuffer out = new StringBuffer(size * 4);
    for (Link temp = top; temp != null;  temp = temp.next()) {
      out.append(temp.element());
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: LStack2 *** */

  // Reinitialize stack
  public void clear() { top = null; size = 0; }
  
  public void push(Object it) {   // Put "it" on stack
    top = new Link(it, top);
    size++;
  }

  public Object pop() {           // Remove "it" from stack
    if (top == null) return null;
    Object it = top.element();
    top = top.next();
    size--;
    return it;
  }

  public Object topValue() {      // Return top value
    if (top == null) return null;
    return top.element();
  }

  // Return stack length
  public int length() { return size; }
}
/* *** ODSAendTag: LStack2 *** */
