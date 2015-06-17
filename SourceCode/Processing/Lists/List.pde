/* *** ODSATag: ListADT *** */
// List class ADT. Generalize by using "Object" for the element type.
// An alternative would be to use Java Generics.
interface List { // List class ADT
  // Remove all contents from the list, so it is once again empty
  void clear();

  // Insert "it" at the current location
  // The client must ensure that the list's capacity is not exceeded
  boolean insert(Object it);

  // Append "it" at the end of the list
  // The client must ensure that the list's capacity is not exceeded
  boolean append(Object it);

  // Remove and return the current element
  Object remove();

  // Set the current position to the start of the list
  void moveToStart();

  // Set the current position to the end of the list
  void moveToEnd();

  // Move the current position one step left, no change if already at beginning
  void prev();

  // Move the current position one step right, no change if already at end
  void next();

  // Return the number of elements in the list
  int length();

  // Return the position of the current element
  int currPos();

  // Set the current position to "pos"
  boolean moveToPos(int pos);

  // Return true if current position is at end of the list
  boolean isAtEnd();

  // Return the current element
  Object getValue();
}
/* *** ODSAendTag: ListADT *** */
