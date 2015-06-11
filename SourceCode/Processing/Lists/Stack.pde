/* *** ODSATag: Stack *** */
interface Stack { // Stack class ADT
  // Reinitialize the stack.
  void clear();

  // Push "it" onto the top of the stack
  boolean push(Object it);

  // Remove and return the element at the top of the stack
  Object pop();

  // Return a copy of the top element
  Object topValue();

  // Return the number of elements in the stack
  int length();
}
/* *** ODSAendTag: Stack *** */
