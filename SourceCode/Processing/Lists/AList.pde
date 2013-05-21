/* *** ODSATag: AList *** */
// Array-based list implementation
class AList implements List {
  private static final int defaultSize = 10; // Default size
  private int maxSize;        // Maximum size of list
  private int listSize;       // Current # of list items
  private int curr;           // Position of current element
  private Object listArray[];   // Array holding list elements

  // Constructors
  // Create a list with the default capacity
  AList() { this(defaultSize); }
  // Create a new list object with maximum size "size"
  AList(int size) { 
    maxSize = size;
    listSize = curr = 0;
    listArray = new Object[size];  // Create listArray
  }

  public void clear()         // Reinitialize the list
    { listSize = curr = 0; }  // Simply reinitialize values

/* *** ODSATag: arrayList *** */
  // Insert "it" at current position
  void insert(Object it) {
    if (listSize >= maxSize) {
      println("List capacity exceeded, nothing inserted");
      return;
    }
    for (int i=listSize; i>curr; i--) // Shift elements up
      listArray[i] = listArray[i-1];  //   to make room
    listArray[curr] = it;
    listSize++;               // Increment list size
  }
/* *** ODSAendTag: arrayList *** */

  // Append "it" to list
  void append(Object it) {
    if (listSize >= maxSize) {
      println("List capacity exceeded, nothing inserted");
      return;
    }
    listArray[listSize++] = it;
  }

  // Remove and return the current element
  Object remove() {
    if ((curr<0) || (curr>=listSize))  // No current element
      return null;
    Object it = listArray[curr];       // Copy the element
    for(int i=curr; i<listSize-1; i++) // Shift them down
      listArray[i] = listArray[i+1];
    listSize--;               // Decrement size
    return it;
  }

  void moveToStart() { curr = 0; } // Set to front
  void moveToEnd() { curr = listSize; } // Set at end
  void prev() { if (curr != 0) curr--; }   // Back up
  void next() { if (curr < listSize) curr++; }

  // Return list size
  int length() { return listSize; }

  // Return current position
  int currPos() { return curr; }
  
  // Set current list position to "pos"
  void moveToPos(int pos) {
    if ((pos < 0) || (pos > listSize)) {
      println("Pos out of range, current position unchanged");
      return;
    }
    curr = pos;
  }

  // Return the current element
  Object getValue() {
    if ((curr < 0) || (curr >= listSize)) // No current element
      return null;
    return listArray[curr];
  }
}
/* *** ODSAendTag: AList *** */
