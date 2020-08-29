
/** Source code example for "A Practical Introduction to Data
    Structures and Algorithm Analysis, 3rd Edition (Java)" 
    by Clifford A. Shaffer
    Copyright 2008-2011 by Clifford A. Shaffer
*/

import java.io.*;

public class SkipListTest {
  final static int maxValue = 100;

  public static void main(String args[]) throws IOException {
    SkipList<Integer, Integer> mySL = new SkipList<Integer, Integer>();

    System.out.println("maxValue is: " + maxValue);
    System.out.print("Empty list is: ");
    mySL.print();
    addValue(mySL, 10);
    addValue(mySL, 5);
    addValue(mySL, 20);
    addValue(mySL, 16);

    findValue(mySL, 3);
    findValue(mySL, 5);
    findValue(mySL, 10);
    findValue(mySL, 15);
    findValue(mySL, 16);
    findValue(mySL, 20);
    findValue(mySL, 25);

  }

  /**
   * @param slist
   * @param value
   */
  private static void addValue(SkipList<Integer, Integer> slist, int value) {
    slist.insert(value, maxValue - value);
    System.out.println("After insert of " + value);
    slist.print();
  }

  private static void findValue(SkipList<Integer, Integer> slist, int value) {
    System.out.println("Search for " + value + ": " + slist.find(value));
  }
}
