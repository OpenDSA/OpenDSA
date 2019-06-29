import java.io.*;

public class SkipListTest {
  final static int maxValue = 100;

  public static void main(String args[]) throws IOException {
    SkipList mySL = new SkipList();

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
  private static void addValue(SkipList slist, int value) {
    slist.insert(value, maxValue - value);
    System.out.println("After insert of " + value);
    slist.print();
  }

  private static void findValue(SkipList slist, int value) {
    System.out.println("Search for " + value + ": " + slist.find(value));
  }
}
