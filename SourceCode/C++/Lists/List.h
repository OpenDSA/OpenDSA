/* ADT list */

#ifndef LIST_H
#define LIST_H

#include <string>

using namespace std;

// Can change type stored but assumed int here.
typedef int ListItemType;

/* *** ODSATag: ListADT *** */
/* *** ODSATag: ListADT1 *** */
// List class ADT.
class List { // List class ADT
public:
  // Destructor
  virtual ~ List () =default;

  // Remove all contents from the list, so it is once again empty
  virtual void clear() =0;

  // Insert "it" at the current location
  // The client must ensure that the list's capacity is not exceeded
  virtual bool insert(const ListItemType& it) =0;

  // Append "it" at the end of the list
  // The client must ensure that the list's capacity is not exceeded
  virtual bool append(const ListItemType& it) =0;

  // Remove and return the current element
  virtual ListItemType remove() =0;
/* *** ODSAendTag: ListADT1 *** */

/* *** ODSATag: ListADT2 *** */
  // Set the current position to the start of the list
  virtual void moveToStart() =0;

  // Set the current position to the end of the list
  virtual void moveToEnd() =0;

  // Move the current position one step left, no change if already at beginning
  virtual void prev() =0;

  // Move the current position one step right, no change if already at end
  virtual void next() =0;

  // Return the number of elements in the list
  virtual int length() =0;
/* *** ODSAendTag: ListADT2 *** */

/* *** ODSATag: ListADT3 *** */
  // Return the position of the current element
  virtual int currPos() =0;

  // Set the current position to "pos"
  virtual bool moveToPos(int pos) =0;

  // Return true if current position is at end of the list
  virtual bool isAtEnd() =0;

  // Return the current element
  virtual ListItemType getValue() =0;
  
  virtual bool isEmpty() =0;
};
/* *** ODSAendTag: ListADT3 *** */
/* *** ODSAendTag: ListADT *** */

#endif /* LIST_H */
