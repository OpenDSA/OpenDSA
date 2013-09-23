void printVisit(Object e) { }

/* *** ODSATag: BST *** */
// Binary Search Tree implementation
class BST {
  private BSTNode root; // Root of the BST
  private int nodecount; // Number of nodes in the BST

  // constructor
  BST() { root = null; nodecount = 0; }

  // Reinitialize tree
  void clear() { root = null; nodecount = 0; }

  // Insert a record into the tree.
  // Records can be anything, but they must be Comparable
  // e: The record to insert.
  void insert(Comparable e) {
    root = inserthelp(root, e);
    nodecount++;
  }

  // Remove a record from the tree
  // k: The key value of record to remove
  // Returns the record removed, null if there is none.
  Comparable remove(Comparable k) {
    Comparable temp = findhelp(root, k); // First find it
    if (temp != null) {
      root = removehelp(root, k); // Now remove it
      nodecount--;
    }
    return temp;
  }

  // Return the record with key value k, null if none exists
  // k: The key value to find
  Comparable find(Comparable k) { return findhelp(root, k); }

  // Return the number of records in the dictionary
  int size() { return nodecount; }
/* *** ODSAendTag: BST *** */

/* *** ODSATag: findhelp *** */
  private Comparable findhelp(BSTNode rt, Comparable k) {
    if (rt == null) return null;
    if (rt.element().compareTo(k) > 0)
      return findhelp(rt.left(), k);
    else if (rt.element().compareTo(k) == 0) return rt.element();
    else return findhelp(rt.right(), k);
  }
/* *** ODSAendTag: findhelp *** */

/* *** ODSATag: inserthelp *** */
  // Return the current subtree, modified to contain the new item
  private BSTNode inserthelp(BSTNode rt, Comparable e) {
    if (rt == null) return new BSTNode(e);
    if (rt.element().compareTo(e) > 0)
      rt.setLeft(inserthelp(rt.left(), e));
    else
      rt.setRight(inserthelp(rt.right(), e));
    return rt;
  }
/* *** ODSAendTag: inserthelp *** */

/* *** ODSATag: deletemin *** */
  // Delete the minimum value'd element in a subtree
  private BSTNode deletemin(BSTNode rt) {
    if (rt.left() == null) return rt.right();
    rt.setLeft(deletemin(rt.left()));
    return rt;
  }
/* *** ODSAendTag: deletemin *** */

/* *** ODSATag: getmin *** */
  // Get the minimum value'd element in a subtree
  private BSTNode getmin(BSTNode rt) {
    if (rt.left() == null) return rt;
    return getmin(rt.left());
  }
/* *** ODSAendTag: getmin *** */

/* *** ODSATag: removehelp *** */
  // Remove a node with key value k
  // Return the tree with the node removed
  private BSTNode removehelp(BSTNode rt, Comparable k) {
    if (rt == null) return null;
    if (rt.element().compareTo(k) > 0)
      rt.setLeft(removehelp(rt.left(), k));
    else if (rt.element().compareTo(k) < 0)
      rt.setRight(removehelp(rt.right(), k));
    else { // Found it
      if (rt.left() == null) return rt.right();
      else if (rt.right() == null) return rt.left();
      else { // Two children
        BSTNode temp = getmin(rt.right());
        rt.setElement(temp.element());
        rt.setRight(deletemin(rt.right()));
      }
    }
    return rt;
  }
/* *** ODSAendTag: removehelp *** */

/* *** ODSATag: printhelp *** */
  private void printhelp(BSTNode rt) {
    if (rt == null) return;
    printhelp(rt.left());
    printVisit(rt.element());
    printhelp(rt.right());
  }
/* *** ODSAendTag: printhelp *** */
}
