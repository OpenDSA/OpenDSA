/* *** ODSATag: preorder *** */
static void preorder(BinNode rt) {
  if (rt == null) return; // Empty subtree - do nothing
  visit(rt);              // Process root node
  preorder(rt.left());    // Process all nodes in left
  preorder(rt.right());   // Process all nodes in right
}
/* *** ODSAendTag: preorder *** */

/* *** ODSATag: preorder2 *** */
// This is a bad idea
static void preorder2(BinNode rt) {
  visit(rt);
  if (rt.left() != null) preorder2(rt.left());
  if (rt.right() != null) preorder2(rt.right());
}
/* *** ODSAendTag: preorder2 *** */
