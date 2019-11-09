import java.io.*;

/**
 * This program checks if all the methods in AStack and LStack classes work
 * properly.
 * 
 * @author Yuya Asano
 *
 */
public class StackTest {
  // The number of items stored in stack during the test
  static final int TEST_SIZE = 10;
  // True if you want to create a text file to record errors
  static final boolean useFile = true;
  // Instance of ErrorRec class which holds the number of errors and prints
  // out error messages
  static ErrorRec record;

  static void testInt(Stack s) {
    // Check empty stack
    checkEmp(s);

    // Compare Stack with java.util.Stack to test length, topValue,
    // toString, push, and pop
    java.util.Stack<Object> tester = new java.util.Stack<Object>();
    for (int i = 0; i < TEST_SIZE; i++) {
      check(s, tester, 100 + i);
    }
  }

  static void testStr(Stack s) {
    // Check empty stack
    checkEmp(s);

    // Compare Stack with java.util.Stack to test length, topValue,
    // toString, push, and pop
    java.util.Stack<Object> tester = new java.util.Stack<Object>();
    for (int i = 0; i < TEST_SIZE; i++) {
      check(s, tester, "Str" + i);
    }
  }

  static void check(Stack s, java.util.Stack<Object> tester, Object item) {
    // Add the item to both stacks
    s.push(item);
    tester.push(item);

    // Check the length of stack
    if (s.length() != tester.size()) {
      record.printError("An unexpected length of " + s.getClass() + ". \nLength of stack: " + s.length()
          + "\nLength expected: " + tester.size());
    }

    // isEmpty should return false
    if (s.isEmpty()) {
      record.printError(
          "The isEmpty method in " + s.getClass() + " does not return false when the stack is not empty.");
    }

    // Check topValue
    if (s.topValue() != tester.peek()) {
      record.printError("An unexpected topValue " + s.getClass() + ". \nTopValue in stack: "
          + s.topValue().toString() + "\nValue expected: " + tester.peek().toString());
    }

    // Check toString
    StringBuffer out = new StringBuffer(tester.size() * 4);
    for (int i = tester.size() - 1; i >= 0; i--) {
      out.append(tester.get(i));
      out.append(" ");
    }
    if (!s.toString().equals(out.toString())) {
      record.printError("The toString method in " + s.getClass() + " has some errors.\nValues in stack: "
          + s.toString() + "\nValues expected: " + tester.toString());
    }

    // Check values in stack
    java.util.Stack<Object> temp = new java.util.Stack<Object>();
    int initSize = tester.size();
    for (int i = 0; i < initSize; i++) {
      Object popped = s.pop();
      Object expected = tester.pop();
      if (popped != expected) {
        record.printError("An unexpected value in " + s.getClass() + ". \nPopped from stack: "
            + popped.toString() + "\nValue expected: " + expected.toString());
      }
      temp.push(expected);
    }

    // Restore values
    for (int i = 0; i < initSize; i++) {
      Object popped = temp.pop();
      s.push(popped);
      tester.push(popped);
    }
  }

  static void checkEmp(Stack s) {
    // Test length with empty stack
    if (s.length() != 0) {
      record.printError("An unexpected length of " + s.getClass() + ". \nLength of stack: " + s.length()
          + "\nLength expected: 0");
    }

    // isEmpty should return true
    if (!s.isEmpty()) {
      record.printError(
          "The isEmpty method in " + s.getClass() + " does not return true when the stack is empty.");
    }

    // Test topValue with empty stack
    if (s.topValue() != null) {
      record.printError("An unexpected topValue in empty " + s.getClass() + ". \nTopValue in stack: "
          + s.topValue().toString() + "\nValue expected: null");
    }

    // Test pop with empty stack
    Object popped = s.pop();
    if (popped != null) {
      record.printError("An unexpected value in empty " + s.getClass() + ". \nPopped from stack: "
          + popped.toString() + "\nValue expected: null");
    }

    // Test clear
    s.clear();
    if (!s.toString().equals("")) {
      record.printError(
          "The clear method in " + s.getClass() + " does not work. \nPrinted stack: " + s.toString());
    }
  }

  /**
   * Runs tests on generic AStack and LStack classes with Integer and String.
   * 
   * @param args
   *            not used
   * @throws IOException
   *             thrown if some errors happen while opening or creating a new text
   *             useFile
   */
  public static void main(String args[]) throws IOException {
    // Create a useFile to record errors if necessary
    record = new ErrorRec(useFile, "StackTest");

    // Test Integer
    AStack as = new AStack();
    LStack ls = new LStack();
    testInt(as);
    testInt(ls);

    // Test String
    AStack as1 = new AStack();
    LStack ls1 = new LStack();
    testStr(as1);
    testStr(ls1);

    // Get a feedback about the result (success or fail)
    record.feedback();
  }
}

