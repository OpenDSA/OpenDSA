/* *** ODSATag: listiter *** */
for (L.moveToStart(); L.currPos()<L.length(); L.next()) {
  it = L.getValue();
  doSomething(it);
}
/* *** ODSAendTag: listiter *** */

/* *** ODSATag: listfind *** */
/** @return True if k is in list L, false otherwise */
public static boolean find(List<Integer> L, int k) {
  for (L.moveToStart(); L.currPos()<L.length(); L.next())
    if (k == L.getValue()) return true;    // Found k
  return false;                            // k not found
}
/* *** ODSAendTag: listfind *** */