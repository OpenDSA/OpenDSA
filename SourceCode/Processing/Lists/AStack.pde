// Array-based stack implementation
/* *** ODSATag: AStack1 *** */
class AStack implements Stack {
  private Object stackArray[];    // Array holding stack
  private static final int defaultSize = 10;
  private int maxSize;            // Maximum size of stack
  private int top;                // First free position at top

  // Constructors
  AStack(int size) {
    maxSize = size;
    top = 0; 
    stackArray = new Object[size]; // Create stackArray
  }
  AStack() { this(defaultSize); }
/* *** ODSAendTag: AStack1 *** */

  String toString() {
    StringBuffer out = new StringBuffer(top * 4);
    for (int i=top-1; i>=0; i--) {
      out.append(stackArray[i]);
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: AStack2 *** */

  void clear() { top = 0; }       // Reinitialize stack

// Push "it" onto stack
/* *** ODSATag: AStackPush *** */
  boolean push(Object it) {
    if (top >= maxSize) return false;
    stackArray[top++] = it;
    return true;
  }
/* *** ODSAendTag: AStackPush *** */

// Remove and return top element
/* *** ODSATag: AStackPop *** */
  Object pop() {               
    if (top == 0) return null;
    return stackArray[--top];
  }
/* *** ODSAendTag: AStackPop *** */

  Object topValue() {             // Return top element
    if (top == 0) return null;
    return stackArray[top-1];
  }

  int length() { return top; }    // Return stack size
}
/* *** ODSAendTag: AStack2 *** */
