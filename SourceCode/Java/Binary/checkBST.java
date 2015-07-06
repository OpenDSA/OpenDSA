// Assumes that equal values go to the left
/* *** ODSATag: checkBST *** */
static boolean checkBST(BSTNode rt, Comparable low, Comparable high) {
  if (rt == null) return true; // Empty subtree
  Comparable rootval = rt.element();
  if ((rootval.compareTo(low) <= 0) || (rootval.compareTo(high) > 0))
    return false; // Out of range
  if (!checkBST(rt.left(), low, rootval))
    return false; // Left side failed
  return checkBST(rt.right(), rootval, high);
}
/* *** ODSAendTag: checkBST *** */
