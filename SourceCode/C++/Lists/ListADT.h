/* ADT list - array-based implementation
 * July 2014
 */
#ifndef ALIST_H
#define ALIST_H

const int MAX_SIZE = 10;
typedef int ListItemType;

/* *** ODSATag: ListADT *** */
class List { // List class ADT 
  // Remove all contents from the list, so it is once again empty
public:
  void clear();

  // Inserts an item into the list at position index
  bool insert(const ListItemType& newItem);
    
  // Append "it" at the end of the list
  // The client must ensure that the list's capacity is not exceeded
  bool append(const ListItemType& newItem);

  // Deletes an item from the list at a given position
  ListItemType remove();

  // Set the current position to the start of the list
  void moveToStart();

  // Set the current position to the end of the list
  void moveToEnd();

   // Move the current position one step left, no change if already at beginning
  void prev();

  // Move the current position one step right, no change if already at end
  void next();
  
  //Return the number of items stored in the list
  int length();

  // Return the position of the current element
  int currPos();
  
  // Set the current position to "pos"
  bool moveToPos(int pos);

  // Return true if current position is at end of the list
  bool isAtEnd();

  // Return the current element
  ListItemType getValue();
  
/* *** ODSAendTag: ListADT *** */
  
  /********** NOT NEEDED ******/
  // Return True if the List is empty
  bool isEmpty() const;

  // Retrieves a list item by position
  void retrieve(int index);

  // Output all elements
  void print() const;
};

#endif /* ALIST H */
