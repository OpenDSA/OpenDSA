/* *** ODSATag: Stack *** */
public interface Stack<E> { // Stack class ADT
  // Reinitialize the stack.
  public void clear();

  // Push "it" onto the top of the stack
  public boolean push(E it);

  // Remove and return the element at the top of the stack
  public E pop();

  // Return a copy of the top element
  public E topValue();

  // Return the number of elements in the stack
  public int length();
}
/* *** ODSAendTag: Stack *** */
