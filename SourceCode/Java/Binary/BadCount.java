// The following code shows examples of common mistakes
// encountered when writing recursive methods.
// This code DOES NOT COMPILE, so it is not tested.
/* *** ODSATag: bad_count *** */
static int bad_count(BinNode root) {
  if (root == null) { return 0; }  // Nothing to count
  bad_count(root.left());
  1 + bad_count(root.left()) + bad_count(root.right());
}
/* *** ODSAendTag: bad_count *** */
