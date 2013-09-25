/* *** ODSATag: checkBST *** */
// Assumes that the nodes contain KVPair object
boolean checkBST(BSTNode rt, int low, int high) {
  if (rt == null) return true; // Empty subtree
  int rootkey = (Integer)((KVPair)rt.element()).key();
  if ((rootkey < low) || (rootkey > high))
    return false; // Out of range
  if (!checkBST(rt.left(), low, rootkey))
    return false; // Left side failed
  return checkBST(rt.right(), rootkey, high);
}
/* *** ODSAendTag: checkBST *** */
