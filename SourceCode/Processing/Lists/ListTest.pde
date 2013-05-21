boolean SUCCESS = true;

void doSomething(Object it) { }

/* *** ODSATag: listfind *** */
// Return true if k is in list L, false otherwise
boolean find(List L, int k) {
  for (L.moveToStart(); L.currPos()<L.length(); L.next())
    if (k == (Integer)L.getValue()) return true;    // Found k
  return false;                            // k not found
}

void test(List L) {
  L.insert(5);
  L.insert(7);
  L.insert(3);
  L.insert(17);

Object it;
/* *** ODSATag: listiter *** */
for (L.moveToStart(); L.currPos()<L.length(); L.next()) {
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
}

/* *** ODSAendTag: listfind *** */

void setup() {
  AList AL = new AList();
  LList LL = new LList();

  test(AL);
  test(LL);
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  }
  exit();
}
