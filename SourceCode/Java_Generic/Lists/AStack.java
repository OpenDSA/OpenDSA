// Array-based stack implementation
/* *** ODSATag: AStack1 *** */
class AStack<E> implements Stack<E> {
  private E stackArray[];         // Array holding stack
  private static final int defaultSize = 10;
  private int maxSize;            // Maximum size of stack
  private int top;                // First free position at top

  // Constructors
  @SuppressWarnings("unchecked") // Generic array allocation
  AStack(int size) {
    maxSize = size;
    top = 0; 
    stackArray = (E[])new Object[size]; // Create stackArray
  }
  AStack() { this(defaultSize); }
/* *** ODSAendTag: AStack1 *** */

  public String toString() {
    StringBuffer out = new StringBuffer(top * 4);
    for (int i=top-1; i>=0; i--) {
      out.append(stackArray[i]);
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: AStack2 *** */

  public void clear() { top = 0; }    // Reinitialize stack

// Push "it" onto stack
/* *** ODSATag: AStackPush *** */
  public boolean push(E it) {
    if (top >= maxSize) return false;
    stackArray[top++] = it;
    return true;
  }
/* *** ODSAendTag: AStackPush *** */

// Remove and return top element
/* *** ODSATag: AStackPop *** */
  public E pop() {               
    if (top == 0) return null;
    return stackArray[--top];
  }
/* *** ODSAendTag: AStackPop *** */

  public E topValue() {          // Return top element
    if (top == 0) return null;
    return stackArray[top-1];
  }

  public int length() { return top; } // Return stack size
}
/* *** ODSAendTag: AStack2 *** */
