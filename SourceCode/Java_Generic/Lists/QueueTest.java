import java.io.*;
import java.util.Deque;
import java.util.LinkedList;

/**
 * This program checks if all the methods in AQueue and LQueue classes work
 * properly.
 * 
 * @author Yuya Asano
 *
 */
public class QueueTest {
  // The number of items stored in stack during the test
  static final int TEST_SIZE = 10;
  // True if you want to create a text file to record errors
  static final boolean useFile = true;
  // Instance of ErrorRec class which holds the number of errors and prints
  // out error messages
  static ErrorRec record;

  static void testInt(Queue<Integer> q) {
    // Check empty queue
    checkEmp(q);

    // Compare Queue with java.util.Queue to test length, frontValue,
    // toString, enqueue, and dequeue
    Deque<Integer> tester = new LinkedList<Integer>();
    for (int i = 0; i < TEST_SIZE; i++) {
      check(q, tester, 100 + i);
    }
  }

  static void testStr(Queue<String> q) {
    // Check empty queue
    checkEmp(q);

    // Compare Queue with java.util.Queue to test length, frontValue,
    // toString, enqueue, and dequeue
    Deque<String> tester = new LinkedList<String>();
    for (int i = 0; i < TEST_SIZE; i++) {
      check(q, tester, "Str" + i);
    }
  }

  static <E> void checkEmp(Queue<E> q) {
    // Test length with empty stack
    if (q.length() != 0) {
      record.printError("An unexpected length of " + q.getClass() + ". \nLength of stack: " + q.length()
          + "\nLength expected: 0");
    }

    // isEmpty should return true
    if (!q.isEmpty()) {
      record.printError(
          "The isEmpty method in " + q.getClass() + " does not return true when the queue is empty.");
    }

    // Test frontValue with empty queue
    if (q.frontValue() != null) {
      record.printError("An unexpected topValue in empty " + q.getClass() + ". \nTopValue in queue: "
          + q.frontValue().toString() + "\nValue expected: null");
    }

    // Test dequeue with empty queue
    E dequeued = q.dequeue();
    if (dequeued != null) {
      record.printError("An unexpected value in empty " + q.getClass() + ". \nDequeued from queue: "
          + dequeued.toString() + "\nValue expected: null");
    }

    // Test clear
    q.clear();
    if (!q.toString().equals("")) {
      record.printError(
          "The clear method in " + q.getClass() + " does not work. \nPrinted queue: " + q.toString());
    }
  }

  static <E> void check(Queue<E> q, Deque<E> tester, E item) {
    // Add the item to both queues
    q.enqueue(item);
    tester.addLast(item);

    // Check the length of queue
    if (q.length() != tester.size()) {
      record.printError("An unexpected length of " + q.getClass() + ". \nLength of queue: " + q.length()
          + "\nLength expected: " + tester.size());
    }

    // isEmpty should return false
    if (q.isEmpty()) {
      record.printError(
          "The isEmpty method in " + q.getClass() + " does not return false when the queue is not empty.");
    }

    // Check frontValue
    if (q.frontValue() != tester.peekFirst()) {
      record.printError("An unexpected topValue " + q.getClass() + ". \nTopValue in queue: "
          + q.frontValue().toString() + "\nValue expected: " + tester.peekFirst().toString());
    }

    // Check toString
    StringBuffer out = new StringBuffer(tester.size() * 4);
    for (int i = 0; i < tester.size(); i++) {
      E itemT = tester.pollFirst();
      tester.addLast(itemT);
      out.append(itemT);
      out.append(" ");
    }
    if (!q.toString().equals(out.toString())) {
      record.printError("The toString method in " + q.getClass() + " has some errors.\nValues in queue: "
          + q.toString() + "\nValues expected: " + out.toString());
    }

    // Check values in queue
    for (int i = 0; i < tester.size(); i++) {
      E dequeued = q.dequeue();
      E expected = tester.pollFirst();
      if (dequeued != expected) {
        record.printError("An unexpected value in " + q.getClass() + ". \nPopped from queue: "
            + dequeued.toString() + "\nValue expected: " + expected.toString());
      }
      // Restore values
      q.enqueue(expected);
      tester.addLast(expected);
    }
  }

  /**
   * Runs tests on generic AQueue and LQueue Class with Integer and String.
   * 
   * @param args
   *            not used
   * @throws IOException
   *             thrown if some errors happen while opening or creating a new text
   *             file
   */
  public static void main(String args[]) throws IOException {
    // Create a file to record errors if necessary
    record = new ErrorRec(useFile, "QueueTest");

    // Test integer
    AQueue<Integer> aq = new AQueue<Integer>();
    LQueue<Integer> lq = new LQueue<Integer>();
    testInt(aq);
    testInt(lq);

    // Test String
    AQueue<String> aq1 = new AQueue<String>();
    LQueue<String> lq1 = new LQueue<String>();
    testStr(aq1);
    testStr(lq1);

    // Get a feedback about the result (success or fail)
    record.feedback();
  }

}
