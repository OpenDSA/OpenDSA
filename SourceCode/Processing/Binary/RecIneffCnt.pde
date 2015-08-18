/* *** ODSATag: IneffCnt *** */
static int ineff_count(BinNode root) {
  if (root == null) {
    return 0;
  }
  int count = 0;
  if (root.left() != null) {
    count = 1+ ineff_count(root.left());
  }
  if (root.right() != null) {
    count = 1 + ineff_count(root.right());
  }  
  if (root.left() == null && root.right() == null) {
    return 1;
  }
  return 1 + count;
  }   
}
/* *** ODSAendTag: IneffCnt *** */ 
