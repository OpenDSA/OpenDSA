import java.io.*;

public class ListTest {

static final int testsize = 0;
static long time1, time2;

static boolean SUCCESS = true;

static void doSomething(Object it) { }

static String toString(List<Integer> L) {
  // Save the current position of the list
  int oldPos = L.currPos();
  StringBuffer out = new StringBuffer((L.length() + 1) * 4);

  L.moveToStart();
  out.append("< ");
  for (int i = 0; i < oldPos; i++) {
    out.append(L.getValue());
    out.append(" ");
    L.next();
  }
  out.append("| ");
  for (int i = oldPos; i < L.length(); i++) {
    out.append(L.getValue());
    out.append(" ");
    L.next();
  }
  out.append(">");
  L.moveToPos(oldPos); // Reset the fence to its original position
  return out.toString();
}

/* *** ODSATag: listfind *** */
// Return true if k is in list L, false otherwise
static boolean find(List<Integer> L, int k) {
  for (L.moveToStart(); !L.isAtEnd(); L.next())
    if (k == L.getValue()) return true; // Found k
  return false;                                  // k not found
}
/* *** ODSAendTag: listfind *** */

static void testAppend(List<Integer> L2) {
  L2.append(10);
  String temp = toString(L2);
  if (!temp.equals("< | 10 >")) {
    SUCCESS = false;
    System.out.println("Expected " + "< | 10 >" + ", got " + temp);
  }
  L2.append(20);
  L2.append(15);
  temp = toString(L2);
  if (!temp.equals("< | 10 20 15 >")) {
    SUCCESS = false;
    System.out.println("Expected " + "< | 10 20 15 >" + ", got " + temp);
  }
}

static void test(List<Integer> L) {
  L.moveToStart();
  L.insert(5);
  L.insert(7);
  L.next();
  L.next();
  L.insert(3);
  L.insert(17);
  String temp = toString(L);
  if (!temp.equals("< 7 5 | 17 3 >"))
    SUCCESS = false;

  Object it;
/* *** ODSATag: listiter *** */
for (L.moveToStart(); !L.isAtEnd(); L.next()) {
  it = L.getValue();
  doSomething(it);
}
/* *** ODSAendTag: listiter *** */

  if (!find(L, 5))
    SUCCESS = false;
  if (!find(L, 3))
    SUCCESS = false;
  if (find(L, 10))
    SUCCESS = false;

  L.moveToPos(2);
  it = L.remove();
  temp = toString(L);
  if (!temp.equals("< 7 5 | 3 >"))
    SUCCESS = false;
}

public static void main(String args[]) throws IOException {
  AList<Integer> AL = new AList<Integer>();
  LList<Integer> LL = new LList<Integer>();

  test(AL);
  test(LL);
  AL.clear();
  LL.clear();
  testAppend(AL);
  testAppend(LL);
  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Testing failed");
  }

  if (testsize == 0) {
    return;
  }
  System.out.println("Do the timing test");
  LList<Integer> LT = new LList<Integer>();
  time1 = System.currentTimeMillis();
  for (int i = 0; i < testsize; i++) {
    LL.insert(10);
    LL.insert(15);
    LL.insert(20);
    LL.insert(25);
    LL.clear();
  }
  time2 = System.currentTimeMillis();
  long totaltime = (time2-time1);
  System.out.println("Timing test on " + testsize + " iterations: " + totaltime);

  time1 = System.currentTimeMillis();
  for (int i = 0; i < testsize; i++) {
    Link<Integer> temp = new Link<Integer>(null, null);
    temp = new Link<Integer>(null, null);
    temp = new Link<Integer>(null, null);
    temp = new Link<Integer>(null, null);
    temp = new Link<Integer>(null, null);
  }
  time2 = System.currentTimeMillis();
  totaltime = (time2-time1);
  System.out.println("Timing test2 on " + testsize + " iterations: " + totaltime);
}

}
