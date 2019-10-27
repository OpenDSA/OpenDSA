// #include "LList.h"
#include "AList.h"
// #include "FList.h"
#include "../Utils/ErrorRec.h"
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <climits>

using namespace std;

const bool useFile = true;
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
  // True if you want to create a text file to record errors
  static const bool useFile = true;

public:
  static void testList(List &l)
  {
    // Check empty list
    checkEmp(l);
  }

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
      record->printError( // TODO fix up msg
      // TODO the name printed is 5AList - not sure why not actual name
          "The clear method in " + string(typeid(l).name()) + " does not work. \nPrinted list: " + l.toString());
    }
  }
};

int main(void)
{
  // TODO in progress; no LList tests

  // Create a file to record errors if necessary
  record = new ErrorRec("ListTest", useFile);

  // Run tests of ALIST on a new list.
  AList *list = new AList();

  ListTest::testList(*list);

  record->feedback();

  return 0;
}
