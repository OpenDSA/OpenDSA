/* *** ODSATag: ListADT *** */
/* *** ODSATag: ListADT1 *** */
// List class ADT. Generalize by using "Object" for the element type.
// An alternative would be to use Java Generics.
public interface List { // List class ADT
  // Remove all contents from the list, so it is once again empty
  public void clear();

  // Insert "it" at the current location
  // The client must ensure that the list's capacity is not exceeded
  public boolean insert(Object it);

  // Append "it" at the end of the list
  // The client must ensure that the list's capacity is not exceeded
  public boolean append(Object it);

  // Remove and return the current element
  public Object remove();
/* *** ODSAendTag: ListADT1 *** */

/* *** ODSATag: ListADT2 *** */
  // Set the current position to the start of the list
  public void moveToStart();

  // Set the current position to the end of the list
  public void moveToEnd();

  // Move the current position one step left, no change if already at beginning
  public void prev();

  // Move the current position one step right, no change if already at end
  public void next();

  // Return the number of elements in the list
  public int length();
/* *** ODSAendTag: ListADT2 *** */

/* *** ODSATag: ListADT3 *** */
  // Return the position of the current element
  public int currPos();

  // Set the current position to "pos"
  public boolean moveToPos(int pos);

  // Return true if current position is at end of the list
  public boolean isAtEnd();

  // Return the current element
  public Object getValue();
}
/* *** ODSAendTag: ListADT3 *** */
/* *** ODSAendTag: ListADT *** */
