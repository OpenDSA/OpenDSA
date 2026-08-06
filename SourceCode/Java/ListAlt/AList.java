/* *** ODSATag: AList *** */
// Array-based list implementation
class AList implements List {
  private class AListIndex implements ListIndex {
    int pos;

    AListIndex(int posit) { pos = posit; }
    public void prev() { if (pos != 0) { pos--; } }
    public void next() { if (pos < listSize) { pos++; } }
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

  public void clear()                     // Reinitialize the list
    { listSize = 0; }              // Simply reinitialize values

  // Insert "it" at current position
  public void insert(Object it, ListIndex where) {
    if (listSize >= maxSize) {
      System.out.println("List capacity exceeded, nothing inserted");
      return;
    }
    int pos = ((AListIndex)where).pos;
    for (int i=listSize; i>pos; i--) {     // Shift elements up
      listArray[i] = listArray[i-1];      //   to make room
    }
    listArray[pos] = it;
    listSize++;                           // Increment list size
  }

  // Append "it" to list
  public void append(Object it) {
    if (listSize >= maxSize) {
      System.out.println("List capacity exceeded, nothing inserted");
      return;
    }
    listArray[listSize++] = it;
  }

  // Remove and return the current element
  public Object remove(ListIndex where) {
    int pos = ((AListIndex)where).pos;
    if ((pos<0) || (pos>=listSize)) {     // No current element
      return null;
    }
    Object it = listArray[pos];          // Copy the element
    for(int i=pos; i<listSize-1; i++) {    // Shift them down
      listArray[i] = listArray[i+1];
    }
    listSize--;                           // Decrement size
    return it;
  }

  // Return list size
  public int length() { return listSize; }

  // Return a ListIndex to the beginning of the list
  public ListIndex getStart() {
    return new AListIndex(0);
  }
  
  // Return a ListIndex past the end of the list
  public ListIndex getEnd() {
    return new AListIndex(listSize);
  }
  
  public ListIndex pointToPos(int pos) {
    return new AListIndex(pos);
  }

  // Return the current element
  public Object getValue(ListIndex where) {
    int pos = ((AListIndex)where).pos;
    if ((pos < 0) || (pos >= listSize)) { // No current element
      return null;
    }
    return listArray[pos];
  }
}
/* *** ODSAendTag: AList *** */

