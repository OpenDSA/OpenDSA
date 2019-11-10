// #include "LList.h"
#include "AList.h"
#include "ErrorRec.h"
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <climits>

using namespace std;

// TODO does not have timing, ListIter, doSomething, find

// True if you want to create a text file to record errors
const bool useFile = true;
// Instance of ErrorRec class which holds the number of errors and prints
// out error messages
static ErrorRec *record;

/*
 * This program checks if all the methods in AList, LList and DList classes work
 * properly. All tests are done on ListItemType from the List implementation.
 */
class ListTest
{
private:
  // The number of items stored in stack during the test
  static const int TEST_SIZE = 9;

public:
 
  /**
  * Test a list holding ListIntType to see if it works correctly.
  * 
  * @param l List to test.
  */
  static void testList(List &l)
  {
    // Check empty list
    checkEmp(l);

    // Test moveToStart, moveToEnd, prev, and next
    doSomethingOnEmpList(l);

    // Compare list with vector to test length, getValue,
    // toString, currPos, and remove. Add items by inserting
    vector<ListItemType> tester;
    for (int i = 0; i < TEST_SIZE; i++)
    {
      // This assumes int and ListItemType are compatible.
      checkIns(l, tester, (ListItemType)(100 + i));
    }

    // Clear both lists
    reset(l, tester);

    // Compare list with java.util.list to test length, getValue,
    // toString, currPos, and remove. Add items by appending
    for (int i = 0; i < TEST_SIZE; i++) {
      checkApp(l, tester, 100 + i);
    }

    doSomethingOnNonEmpList(l, tester);
  }

  /* Set both lists provided to empty/new state.
  * The first list is OpenDSA.
  * The second list is a standard C++ one.
  */
  static void reset(List &l, vector<int> &tester)
  {
    l.clear();
    tester.clear();
  }

  /* Take a list that should be empty and perform operations
  * to see if it acts as expected.
  */
  static void doSomethingOnEmpList(List &l)
  {
    // Nothing changes
    l.moveToStart();
    l.moveToEnd();
    l.prev();
    l.next();
    checkEmp(l);
  }

  /* Takes a list that should be empty and makes sure it acts as expected */
  static void checkEmp(List &l)
  {
    // Test length with empty stack
    if (l.length() != 0)
    {
      record->printError("On empty list an unexpected length from " + string(typeid(l).name()) + ". \nLength of stack: " + to_string(l.length()) + "\nLength expected: 0");
    }

    // isEmpty should return true
    if (!l.isEmpty())
    {
      record->printError(
          "The isEmpty method in " + string(typeid(l).name()) + " does not return true when the list is empty.");
    }

    // Test currPos with empty list
    if (l.currPos() != 0)
    {
      record->printError("An unexpected topValue in empty " + string(typeid(l).name()) + ". \nTopValue in list: " + to_string(l.currPos()) + "\nValue expected: 0");
    }

    // Test remove with empty list
    ListItemType removed = l.remove();
    if (removed != (ListItemType)NULL)
    {
      record->printError("An unexpected value in empty " + string(typeid(l).name()) + ". \nDelistd from list: " + to_string(removed) + "\nValue expected: NULL");
    }

    // Test move to bad positions
    if (l.moveToPos(-1))
    {
      record->printError("An empty " + string(typeid(l).name()) + " returned true for moveToPos(-1)");
    }

    // Test clear
    l.clear();
    if (l.toString().compare("< | >") != 0)
    {
      record->printError(
          // TODO the name printed is 5AList - not sure why not actual name
          "The clear method in " + string(typeid(l).name()) + " does not work. \nPrinted list: " + l.toString());
    }
  }

  /**
   * Takes a list that should be nonempty and makes sure it acts as expected
   *
   * @param l List that should be nonempty for testing.
   * @param tester Same logical list as l but standard Java one.
   */
  static void doSomethingOnNonEmpList(List &l, vector<ListItemType> &tester) {
    // iterator to move around this vector.
    vector<int>::iterator it;
   // iterator to move around temp vector.
    vector<int>::iterator itTemp;

    // Test moveToStart and remove
    l.moveToStart();
    check(l, tester, 0);
    ListItemType removed = l.remove();
    it = tester.begin();
    ListItemType expected = *it;
    tester.erase(it);
    if (removed != expected) {
      record->printError("Unexpected removed value at the beginning of " + string(typeid(l).name()) + ".\nRemoved value: "
          + to_string(removed) + "\nExpected value: " + to_string(expected));
    }
    check(l, tester, 0);
    // Restore values
    l.insert(expected);
    it = tester.begin();
    tester.insert(it, expected);

    // Test prev
    l.prev();
    check(l, tester, 0);

    // Test next
    l.next();
    check(l, tester, 1);

    // Test moveToEnd and remove
    l.moveToEnd();
    // Curr is out of bound
    l.prev();
    check(l, tester, tester.size() - 1);
    removed = l.remove();
    it = tester.end();
    it--;
    expected = *it;
    tester.erase(it);
    if (removed != expected) {
      record->printError("Unexpected removed value at the end of " + string(typeid(l).name()) + ".\nRemoved value: " + to_string(removed)
          + "\nExpected value: " + to_string(expected));
    }
    // Curr is out of bound
    l.prev();
    check(l, tester, tester.size() - 1);
    // Restore values
    l.append(expected);
    tester.push_back(expected);

    // Keep removing items from the middle of the list
    vector<ListItemType> temp;
    int size = tester.size();
    int curr = size / 2;
    l.moveToPos(curr);
    
    it = tester.begin() + curr;
    for (int i = 0; i < size; i++) {
      removed = l.remove();
      expected = *it;
      it = tester.erase(it);
      if (removed != expected) {
        record->printError("Unexpected removed value at the index of " + to_string(curr) + " in " + string(typeid(l).name())
           + ".\nRemoved value: " + to_string(removed) + "\nExpected value: " + to_string(expected));
      }
      // If the lists are empty, call checkEmp. If curr is at tail, it is out of bound
      if (tester.empty()) {
        checkEmp(l);
      } else if (l.isAtEnd()) {
        l.prev();
        check(l, tester, curr - 1);
        l.next();
      } else {
        check(l, tester, curr);
      }
      // If this is the even-number-th removal, decrease current position by one
      if (i % 2 == 0) {
        temp.push_back(expected);
        l.prev();
        curr--;
        it = tester.begin() + curr;
      } else {
        itTemp = temp.begin();
        temp.insert(itTemp, expected);
      }
    }
    // Restore values
    itTemp = temp.begin();
    for (int i = 0; i < size; i++) {
      ListItemType tempRem = *itTemp;
      itTemp = temp.erase(itTemp);
      l.append(tempRem);
      tester.push_back(tempRem);
    }
  }

  /**
   * Check that inserting on both the OpenDSA (first list) and standard
   * Java list (second list) works and does the same thing. item is what
   * is to be inserted.
   */
  static void checkIns(List &l, vector<ListItemType> &tester, ListItemType item)
  {
    // Insert the item to both lists
    vector<int>::iterator it = tester.begin() + l.currPos();
    tester.insert(it, item);
    if (!l.insert(item))
    {
      record->printError("The insert method in " + string(typeid(l).name()) + " returned false.");
    }
    // Verify lists are the same.
    check(l, tester, l.currPos());
  }

  /*
   * Check that appending on both the OpenDSA (first list) and standard
   * C++ list (second list) works and does the same thing. item is what
   * to append to lists.
   */
  static void checkApp(List &l, vector<ListItemType> &tester, ListItemType item) {
    // Append the item to both lists
    tester.push_back(item);

    if (!l.append(item)) {
      record->printError("The append method in " + string(typeid(l).name()) + " returned false.");
    }
    // Verify lists are the same.
    check(l, tester, l.currPos());
  }

  /* Check that two list: OpenDSA (first list) and standard
   * C++ list (second list) are the same thing. curr is 
   * the index of the current item on the list.
   */
  static void check(List &l, vector<ListItemType> &tester, int curr)
  {
    // Check the length of list
    if (l.length() != tester.size())
    {
      record->printError("An unexpected length of " + string(typeid(l).name()) + ". \nLength of list: " + to_string(l.length()) + "\nLength expected: " + to_string(tester.size()));
    }

    // isEmpty should return false
    if (l.isEmpty())
    {
      record->printError(
          "The isEmpty method in " + string(typeid(l).name()) + " does not return false when the list is not empty.");
    }

    // Check the current position
    if (l.currPos() != curr)
    {
      record->printError("An unexpected current position of " + string(typeid(l).name()) + ". \nCurrent position of list: " + to_string(l.currPos()) + "\nPosition expected: " + to_string(curr));
    }

    // Check the value stored in the current position
    if (l.getValue() != tester.at(curr))
    {
      record->printError("An unexpected topValue " + string(typeid(l).name()) + ". \nTopValue in list: " + to_string(l.getValue()) + "\nValue expected: " + to_string(tester.at(curr)));
    }

    // Check toString
    string out;
    out.reserve(tester.size() * 4);
    out.append("< ");
    for (int i = 0; i < curr; i++)
    {
      out.append(to_string(tester.at(i)));
      out.append(" ");
    }
    out.append("| ");
    for (int i = curr; i < tester.size(); i++)
    {
      out.append(to_string(tester.at(i)));
      out.append(" ");
    }
    out.append(">");
    if (l.toString().compare(out) != 0)
    {
      record->printError("The toString method in " + string(typeid(l).name()) + " has some errors.\nValues in list: " + l.toString() + "\nValues expected: " + out);
    }

    // Check values in list
    l.moveToStart();
    for (int i = 0; i < tester.size(); i++)
    {
      if (l.getValue() != tester.at(i))
      {
        record->printError("An unexpected value at the index of " + to_string(i) + " in " + string(typeid(l).name()) + ". \nValue in list: " + to_string(l.getValue()) + "\nValue expected: " + to_string(tester.at(i)));
      }
      l.next();
    }
    l.moveToPos(curr);
  }
};

/* Runs tests on generic AList, LList, and DList Class. */
int main(void)
{
  // TODO in progress; no LList tests

  // Create a file to record errors if necessary
  record = new ErrorRec("ListTest", useFile);

  // Run tests of ALIST on a new list.
  AList *list = new AList();

  ListTest::testList(*list);

  delete list;

  record->feedback();

  return 0;
}
