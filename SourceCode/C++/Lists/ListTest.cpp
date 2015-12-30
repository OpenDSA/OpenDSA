#include "AList.h"
#include "List.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <cstdlib>

using namespace std;

int testsize = 0;
long time1, time2;
bool SUCCESS = true;

void doSomething(ListItemType it) { }

string toString(List& L) {
  // Save the current position of the list
  int oldPos = L.currPos();

  L.moveToStart();
  string s = "<";
  stringstream out;
  for (int i = 0; i < oldPos; i++) {
    out << L.getValue();
    s = s + out.str() + " ";
    L.next();
  }
  s = s + "| ";
  for (int i = oldPos; i < L.length(); i++) {
    out << L.getValue();
    s = s + out.str() + " ";
    L.next();
  }
  s = s + ">";
  L.moveToPos(oldPos); // Reset the fence to its original position
  return s;
}

/* *** ODSATag: listfind *** */
// Return true if k is in list L, false otherwise
bool find(List& L, int k) {
  for (L.moveToStart(); !L.isAtEnd(); L.next())
    if (k == L.getValue()) return true; // Found k
  return false;                                  // k not found
}
/* *** ODSAendTag: listfind *** */

void testAppend(List& L2) {
  L2.append(10);
  string temp = toString(L2);
  if (!temp.compare("< | 10 >")) {
    SUCCESS = false;
    cout << "Expected " << "< | 10 >" << ", got " << temp << endl;
  }
  L2.append(20);
  L2.append(15);
  temp = toString(L2);
  if (!temp.compare("< | 10 20 15 >")) {
    SUCCESS = false;
    cout << "Expected " << "< | 10 20 15 >" << ", got " << temp << endl;
  }
}

void test(List& L) {
  L.moveToStart();
  L.insert(5);
  L.insert(7);
  L.next();
  L.next();
  L.insert(3);
  L.insert(17);
  string temp = toString(L);
  if (!temp.compare("< 7 5 | 17 3 >"))
    SUCCESS = false;

  //Object it;
  ListItemType it;
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
  if (!temp.compare("< 7 5 | 3 >"))
    SUCCESS = false;
}

int main(int argc, char** argv) {
  cout << "Starting ListTest" << endl;
  fstream successfile;
  AList AL;
  // LList LL = new LList();

  test(AL);
  // test(LL);
  AL.clear();
  //LL.clear();
  testAppend(AL);
  // testAppend(LL);

  if (SUCCESS) {
    successfile.open("success", ios::out);
    if (!successfile) {
      cout << "Unable to open SUCCESS file :";
      exit(-1);
    }
    successfile << "Success";
  }

  if (testsize == 0) {
    exit(-1);
    return 0;
  }
  /*
  println("Do the timing test");
  LList LT = new LList();
  time1 = millis();
  for (int i = 0; i < testsize; i++) {
    LL.insert(10);
    LL.insert(15);
    LL.insert(20);
    LL.insert(25);
    LL.clear();
  }
  time2 = millis();
  long totaltime = (time2-time1);
  println("Timing test on " + testsize + " iterations: " + totaltime);

  time1 = millis();
  for (int i = 0; i < testsize; i++) {
    Link temp = new Link(null, null);
    temp = new Link(null, null);
    temp = new Link(null, null);
    temp = new Link(null, null);
    temp = new Link(null, null);
  }
  time2 = millis();
  totaltime = (time2-time1);
  println("Timing test2 on " + testsize + " iterations: " + totaltime);
  */

  exit(-1);
  return 0;
} //end main
