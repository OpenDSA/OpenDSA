/* *** ODSATag: EffCnt *** */
static int eff_count(BinNode root) {
  if (root == null) return 0;  // Nothing to count
    return 1 + eff_count(root.left()) + count(root.right());
}
/* *** ODSAendTag: EffCnt *** */
