/* *** ODSATag: AList *** */
// Array-based list implementation
class AList implements List {
  private class AListIndex implements ListIndex {
    int pos;

    AListIndex(int posit) { pos = posit; }
    void prev() { if (pos != 0) pos--; }
    void next() { if (pos < listSize) pos++; }
  }

  private static final int defaultSize = 10; // Default size
  private int maxSize;                    // Maximum size of list
  private int listSize;                   // Current # of list items
  private Object listArray[];             // Array holding list elements

  // Constructors
  // Create a new list object with maximum size "size"
  AList(int size) { 
    maxSize = size;
    listSize = 0;
    listArray = new Object[size];         // Create listArray
  }
  // Create a list with the default capacity
  AList() { this(defaultSize); }          // Just call the other constructor

  void clear()                     // Reinitialize the list
    { listSize = 0; }              // Simply reinitialize values

  // Insert "it" at current position
  void insert(Object it, ListIndex where) {
    if (listSize >= maxSize) {
      println("List capacity exceeded, nothing inserted");
      return;
    }
    int pos = ((AListIndex)where).pos;
    for (int i=listSize; i>pos; i--)     // Shift elements up
      listArray[i] = listArray[i-1];      //   to make room
    listArray[pos] = it;
    listSize++;                           // Increment list size
  }

  // Append "it" to list
  void append(Object it) {
    if (listSize >= maxSize) {
      println("List capacity exceeded, nothing inserted");
      return;
    }
    listArray[listSize++] = it;
  }

  // Remove and return the current element
  Object remove(ListIndex where) {
    int pos = ((AListIndex)where).pos;
    if ((pos<0) || (pos>=listSize))     // No current element
      return null;
    Object it = listArray[pos];          // Copy the element
    for(int i=pos; i<listSize-1; i++)    // Shift them down
      listArray[i] = listArray[i+1];
    listSize--;                           // Decrement size
    return it;
  }

  // Return list size
  int length() { return listSize; }

  // Return a ListIndex to the beginning of the list
  ListIndex getStart() {
    return new AListIndex(0);
  }
  
  // Return a ListIndex past the end of the list
  ListIndex getEnd() {
    return new AListIndex(listSize);
  }
  
  ListIndex pointToPos(int pos) {
    return new AListIndex(pos);
  }

  // Return the current element
  Object getValue(ListIndex where) {
    int pos = ((AListIndex)where).pos;
    if ((pos < 0) || (pos >= listSize)) // No current element
      return null;
    return listArray[pos];
  }
}
/* *** ODSAendTag: AList *** */

