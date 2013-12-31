/* *** ODSATag: LStack1 *** */
// Linked stack implementation
class LStack implements Stack {
  private Link top;               // Pointer to first element
  private int size;               // Number of elements

  // Constructors
  LStack() { top = null; size = 0; }
  LStack(int size) { top = null; size = 0; }
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
  void clear() { top = null; size = 0; }

// Put "it" on stack
/* *** ODSATag: LStackPush *** */  
  boolean push(Object it) {  
    top = new Link(it, top);
    size++;
    return true;
  }
/* *** ODSAendTag: LStackPush *** */

// Remove "it" from stack
/* *** ODSATag: LStackPop *** */    
  Object pop() {           
    if (top == null) return null;
    Object it = top.element();
    top = top.next();
    size--;
    return it;
  }
/* *** ODSAendTag: LStackPop *** */

  Object topValue() {      // Return top value
    if (top == null) return null;
    return top.element();
  }

  // Return stack length
  int length() { return size; }
}
/* *** ODSAendTag: LStack2 *** */
