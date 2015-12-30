#include "List.h"
#include <iostream>

using namespace std;

/* *** ODSATag: AList *** */
// Array-based list implementation
/* *** ODSATag: AListVars *** */
class AList : public List {
  ListItemType listArray[MAX_SIZE];  //Array holding list elements
  int listSize;   //Current number of list items
  int curr;   //Position of current element
  /* *** ODSAendTag: AListVars *** */

public:

  //Constructor
  // Create a new list element with maximum size "MAX_SIZE"
  AList() : listSize(0)
{
  //Initial the array
  for (int k = 0; k < MAX_SIZE; k++) listArray[k] = 0;
} //end constructor
/*
bool isEmpty() const
{
  return listSize == 0;
  }*/
  void clear()              // Reinitialize the list
  { listSize = curr = 0; } // Simply reinitialize values

/* *** ODSATag: AListInsert *** */
// Insert "it" at current position
bool insert(const ListItemType& it) {
  if (listSize >= MAX_SIZE) return false;
  for (int i = listSize; i > curr; i--) //Shift elements up
    listArray[i] = listArray[i-1];      //to make room
  listArray[curr] = it;
  listSize++;                           //Increment list size
  return true;
}
/* *** ODSAendTag: AListInsert *** */

/* *** ODSATag: AListAppend *** */
// Append "it" to list
bool append(const ListItemType& it) {
  if ( listSize >= MAX_SIZE ) return false;
  listArray[listSize++] = it;
  return true;
}
/* *** ODSAendTag: AListAppend *** */

/* *** ODSATag: AListRemove *** */
// Remove and return the current element
ListItemType remove() {
  if( (curr < 0) || (curr >= listSize) )  // No current element
    return 0;
  ListItemType it = listArray[curr];      // Copy the element
  for (int i = curr; i < listSize; i++)   // Shift them down
    listArray[i] = listArray[i+1];
  listSize--;                             // Decrement size
  return it;
}
/* *** ODSAendTag: AListRemove *** */

void moveToStart() { curr = 0; }          // Set to front
void moveToEnd() { curr = listSize; }     // Set to end
void prev() { if (curr != 0) curr--; }    // Move left
void next() { if (curr < listSize) curr++; } // Move right
int length() { return listSize; }         // Return list size
int currPos() { return curr; }            // Return current position

// Set current list position to "pos"
bool moveToPos(int pos) {
  if ((pos < 0) || (pos > listSize)) return false;
  curr = pos;
  return true;
}

// Return true if current position is at end of the list
bool isAtEnd() { return curr == listSize; }

// Return the current element
ListItemType getValue() {
  if ((curr < 0) || (curr >= listSize)) // No current element
    return 0;
  return listArray[curr];
}
/* *** ODSAendTag: AList *** */

};

