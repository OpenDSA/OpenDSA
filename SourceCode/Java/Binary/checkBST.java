// Assumes that equal values go to the left
/* *** ODSATag: checkBST *** */
static boolean checkBST(BSTNode rt, int low, int high) {
  if (rt == null) return true; // Empty subtree
  int rootval = rt.value();
  if ((rootval <= low) || (rootval > high))
    return false; // Out of range
  if (!checkBST(rt.left(), low, rootval))
    return false; // Left side failed
  return checkBST(rt.right(), rootval, high);
}
/* *** ODSAendTag: checkBST *** */
