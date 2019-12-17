/* ADT list - array-based implementation */
#ifndef ALIST_H
#define ALIST_H

#include <cstdlib>
#include <stdexcept> // std::out_of_range
#include "List.h"

using namespace std;

/* *** ODSATag: AList *** */
// Array-based list implementation
/* *** ODSATag: AListVars *** */
template<class T> class AList : public List<T> {
  T* listArray;            // Array holding list elements
  static const int DEFAULT_SIZE = 10; // Default size
  int maxSize;                        // Maximum size of list
  int listSize;                       // Current # of list items
  int curr;                           // Position of current element
/* *** ODSAendTag: AListVars *** */

public:
  // Constructors
  // Create a new list object with maximum size "size"
  AList(int size = DEFAULT_SIZE) : listSize(0), curr(0) {
    maxSize = size;
    listArray = new T[size];         // Create listArray
  }
  
  ~AList() { delete [] listArray; }      // destructor to remove array

  // Reinitialize the list
  void clear() { listSize = curr = 0; }  // Simply reinitialize values

/* *** ODSATag: AListInsert *** */
  // Insert "it" at current position
  bool insert(const T& it) {
    if (listSize >= maxSize) return false;
    for (int i = listSize; i > curr; i--)  // Shift elements up
      listArray[i] = listArray[i-1];       // to make room
    listArray[curr] = it;
    listSize++;                            // Increment list size
    return true;
  }
/* *** ODSAendTag: AListInsert *** */

/* *** ODSATag: AListAppend *** */
  // Append "it" to list
  bool append(const T& it) {
    if (listSize >= maxSize) return false;
    listArray[listSize++] = it;
    return true;
  }
/* *** ODSAendTag: AListAppend *** */

/* *** ODSATag: AListRemove *** */
  // Remove and return the current element
  T remove() {
    if ((curr < 0) || (curr >= listSize)) // No current element
      throw std::out_of_range("remove() in AList has current of " + to_string(curr) + " and size of "
        + to_string(listSize) + " that is not a a valid element");
    T it = listArray[curr];     // Copy the element
    for(int i = curr; i < listSize-1; i++) // Shift them down
      listArray[i] = listArray[i+1];
    listSize--;                            // Decrement size
    return it;
  }
/* *** ODSAendTag: AListRemove *** */

  void moveToStart() { curr = 0; }       // Set to front
  void moveToEnd() { curr = listSize; }  // Set at end
  void prev() { if (curr != 0) curr--; } // Move left
  void next() { if (curr < listSize) curr++; } // Move right
  int length() { return listSize; }      // Return list size
  int currPos() { return curr; }         // Return current position

  // Set current list position to "pos"
  bool moveToPos(int pos) {
    if ((pos < 0) || (pos > listSize)) return false;
    curr = pos;
    return true;
  }

  // Return true if current position is at end of the list
  bool isAtEnd() { return curr == listSize; }

  // Return the current element
  T getValue() {
    if ((curr < 0) || (curr >= listSize)) // No current element
      throw std::out_of_range("getvalue() in AList has current of " + to_string(curr) +  + " and size of "
        + to_string(listSize) + " that is not a a valid element");
    return listArray[curr];
  }
  
  // Check if the list is empty
  bool isEmpty() { return listSize == 0; }
};
/* *** ODSAendTag: AList *** */

#endif /* ALIST_H */
