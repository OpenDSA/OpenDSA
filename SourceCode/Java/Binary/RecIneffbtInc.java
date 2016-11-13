/* *** ODSATag: IneffbtInc *** */
static void ineff_btInc(BinNode root , int value) {
  if (root != null) {
    root.setElement(((Integer)root.value()) + value);
	if(root.left()!= null) {
      root.left().setValue(((Integer)root.left().value()) + value);
	  ineff_btInc(root.left().left() , value);
	}
	if(root.right()!= null) {
      root.right().setValue(((Integer)root.right().value()) + value);
	  ineff_btInc(root.right().right() , value);
    }
   }
}
/* *** ODSAendTag: IneffbtInc *** */
