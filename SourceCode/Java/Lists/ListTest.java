import java.io.*;
import java.util.LinkedList;

/**
 * This program checks if all the methods in AList, LList and DList classes work
 * properly.
 * 
 * @author Yuya Asano
 *
 */
public class ListTest {
  // The number of items stored in stack during the test
  static final int TEST_SIZE = 9;
  // True if you want to create a text file to record errors
  static final boolean useFile = true;
  // Instance of ErrorRec class which holds the number of errors and prints
  // out error messages
  static ErrorRec record;

  static long time1, time2;

  static void listIter() {
  List L = new AList();
  Object it;
/* *** ODSATag: listiter *** */
for (L.moveToStart(); !L.isAtEnd(); L.next()) {
  it = L.getValue();
  doSomething(it);
}
/* *** ODSAendTag: listiter *** */
  }

  static void doSomething(Object it) {
  }

/* *** ODSATag: listfind *** */
// Return true if k is in list L, false otherwise
static boolean find(List L, Object k) {
  for (L.moveToStart(); !L.isAtEnd(); L.next())
  if (k == L.getValue()) return true; // Found k
  return false;                       // k not found
}
/* *** ODSAendTag: listfind *** */

  static void testInt(List l) {
    // Check empty list
    checkEmp(l);

    // Test moveToStart, moveToEnd, prev, and next
    doSomethingOnEmpList(l);

    // Compare list with java.util.list to test length, getValue,
    // toString, currPos, and remove. Add items by inserting
    LinkedList<Object> tester = new LinkedList<Object>();
    for (int i = 0; i < TEST_SIZE; i++) {
     checkIns(l, tester, 100 + i);
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

  static void testStr(List l) {
  // Check empty list
    checkEmp(l);

    // Test moveToStart, moveToEnd, prev, and next
    doSomethingOnEmpList(l);

    // Compare list with java.util.list to test length, getValue,
    // toString, currPos, and remove. Add items by inserting
    LinkedList<Object> tester = new LinkedList<Object>();
    for (int i = 0; i < TEST_SIZE; i++) {
      checkIns(l, tester, "Str" + i);
    }

    // Clear both lists
    reset(l, tester);

    // Compare list with java.util.list to test length, getValue,
    // toString, currPos, and remove. Add items by appending
    for (int i = 0; i < TEST_SIZE; i++) {
      checkApp(l, tester, "Str" + i);
    }

    doSomethingOnNonEmpList(l, tester);
  }

  static void reset(List l, LinkedList<Object> tester) {
    l.clear();
    tester.clear();
  }

  static void doSomethingOnEmpList(List l) {
    // Nothing changes
    l.moveToStart();
    l.moveToEnd();
    l.prev();
    l.next();
    checkEmp(l);
  }

  static void checkEmp(List l) {
    // Test length with empty stack
    if (l.length() != 0) {
      record.printError("An unexpected length of " + l.getClass() + ". \nLength of stack: " + l.length()
          + "\nLength expected: 0");
    }

    // isEmpty should return true
    if (!l.isEmpty()) {
      record.printError(
          "The isEmpty method in " + l.getClass() + " does not return true when the list is empty.");
    }

    // Test currPos with empty list
    if (l.currPos() != 0) {
      record.printError("An unexpected topValue in empty " + l.getClass() + ". \nTopValue in list: " + l.currPos()
         + "\nValue expected: 0");
    }

    // Test remove with empty list
    Object removed = l.remove();
    if (removed != null) {
      record.printError("An unexpected value in empty " + l.getClass() + ". \nDelistd from list: "
         + removed.toString() + "\nValue expected: null");
    }

    // Test move to bad positions
    if (l.moveToPos(-1)) {
      record.printError("An empty " + l.getClass() + " returned true for moveToPos(-1)");
    }

    // Test clear
    l.clear();
    if (!l.toString().equals("< | >")) {
      record.printError(
          "The clear method in " + l.getClass() + " does not work. \nPrinted list: " + l.toString());
    }
  }

  static void doSomethingOnNonEmpList(List l, LinkedList<Object> tester) {
    // Test moveToStart and remove
    l.moveToStart();
    check(l, tester, 0);
    Object removed = l.remove();
    Object expected = tester.remove(0);
    if (removed != expected) {
      record.printError("Unexpected removed value at the beginning of " + l.getClass() + ".\nRemoved value: "
          + removed + "\nExpected value: " + expected);
    }
    check(l, tester, 0);
    // Restore values
    l.insert(expected);
    tester.addFirst(expected);

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
    expected = tester.remove(tester.size() - 1);
    if (removed != expected) {
      record.printError("Unexpected removed value at the end of " + l.getClass() + ".\nRemoved value: " + removed
          + "\nExpected value: " + expected);
    }
    // Curr is out of bound
    l.prev();
    check(l, tester, tester.size() - 1);
    // Restore values
    l.append(expected);
    tester.addLast(expected);

    // Keep removing items from the middle of the list
    LinkedList<Object> temp = new LinkedList<Object>();
    int size = tester.size();
    int curr = size / 2;
    l.moveToPos(curr);
    for (int i = 0; i < size; i++) {
      removed = l.remove();
      expected = tester.remove(curr);
      if (removed != expected) {
        record.printError("Unexpected removed value at the index of " + curr + " in " + l.getClass()
           + ".\nRemoved value: " + removed + "\nExpected value: " + expected);
      }
      // If the lists are empty, call checkEmp. If curr is at tail, it is out of bound
      if (tester.isEmpty()) {
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
        temp.addLast(expected);
        l.prev();
        curr--;
      } else {
        temp.addFirst(expected);
      }
    }
    // Restore values
    for (int i = 0; i < size; i++) {
      Object tempRem = temp.removeFirst();
      l.append(tempRem);
      tester.add(tempRem);
    }
  }

  static void checkIns(List l, LinkedList<Object> tester, Object item) {
    // Insert the item to both lists
    tester.add(l.currPos(), item);
    if (!l.insert(item)) {
      record.printError("The insert method in " + l.getClass() + " returned false.");
    }
    check(l, tester, l.currPos());
  }

  static void checkApp(List l, LinkedList<Object> tester, Object item) {
    // Append the item to both lists
    tester.add(item);
    if (!l.append(item)) {
      record.printError("The append method in " + l.getClass() + " returned false.");
    }
    check(l, tester, l.currPos());
  }

  static void check(List l, LinkedList<Object> tester, int curr) {
    // Check the length of list
    if (l.length() != tester.size()) {
      record.printError("An unexpected length of " + l.getClass() + ". \nLength of list: " + l.length()
          + "\nLength expected: " + tester.size());
    }

    // isEmpty should return false
    if (l.isEmpty()) {
      record.printError(
          "The isEmpty method in " + l.getClass() + " does not return false when the list is not empty.");
    }

    // Check the current position
    if (l.currPos() != curr) {
      record.printError("An unexpected current position of " + l.getClass() + ". \nCurrent position of list: "
          + l.currPos() + "\nPosition expected: " + curr);
    }

    // Check the value stored in the current position
    if (l.getValue() != tester.get(curr)) {
      record.printError("An unexpected topValue " + l.getClass() + ". \nTopValue in list: "
          + l.getValue().toString() + "\nValue expected: " + tester.get(curr).toString());
    }

    // Check toString
    StringBuffer out = new StringBuffer(tester.size() * 4);
    out.append("< ");
    for (int i = 0; i < curr; i++) {
      out.append(tester.get(i));
      out.append(" ");
    }
    out.append("| ");
    for (int i = curr; i < tester.size(); i++) {
      out.append(tester.get(i));
      out.append(" ");
    }
    out.append(">");
    if (!l.toString().equals(out.toString())) {
      record.printError("The toString method in " + l.getClass() + " has some errors.\nValues in list: "
         + l.toString() + "\nValues expected: " + out.toString());
    }

    // Check values in list
    l.moveToStart();
    for (int i = 0; i < tester.size(); i++) {
      if (l.getValue() != tester.get(i)) {
        record.printError("An unexpected value at the index of " + i + " in " + l.getClass()
          + ". \nValue in list: " + l.getValue() + "\nValue expected: " + tester.get(i));
      }
      l.next();
    }
    l.moveToPos(curr);
  }

  /**
   * Runs tests on generic AList, LList, and DList Class with Integer and String.
   * 
   * @param args
   *        not used
   * @throws IOException
   *         thrown if some errors happen while opening or creating a new text
   *         file
   */
  public static void main(String args[]) throws IOException {
    // Create a file to record errors if necessary
    record = new ErrorRec(useFile, "ListTest");

    // Test Integers
    AList al = new AList();
    LList ll = new LList();
    testInt(al);
    testInt(ll);

    // Test Strings
    AList al1 = new AList();
    LList ll1 = new LList();
    testStr(al1);
    testStr(ll1);

    // Get a feedback about the result (success or fail)
    record.feedback();

    if (TEST_SIZE != 0) timing();
  }

  static void timing() {
    System.out.println("Do the timing test");
    LList LT = new LList();
    time1 = System.currentTimeMillis();
    for (int i = 0; i < TEST_SIZE; i++) {
      LT.insert(10);
      LT.insert(15);
      LT.insert(20);
      LT.insert(25);
      LT.clear();
    }
    time2 = System.currentTimeMillis();
    long totaltime = (time2 - time1);
    System.out.println("Timing test on " + TEST_SIZE + " iterations: " + totaltime);

    time1 = System.currentTimeMillis();
    for (int i = 0; i < TEST_SIZE; i++) {
      @SuppressWarnings("unused") // This is ok
      Link temp = new Link(null, null);
      temp = new Link(null, null);
      temp = new Link(null, null);
      temp = new Link(null, null);
      temp = new Link(null, null);
    }
    time2 = System.currentTimeMillis();
    totaltime = (time2 - time1);
    System.out.println("Timing test2 on " + TEST_SIZE + " iterations: " + totaltime);
  }

}
