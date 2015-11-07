void ineff_btInc(BinNode root , int value) {
  if (root != null)
    root.setElement(((Integer)root.element()) + value);

  if(root.left()!= null) {
    root.left().setElement(((Integer)root.left().element()) + value);
    ineff_btInc(root.left().left() , value);
  }

  if(root.right()!= null) {
   root.right().setElement(((Integer)root.right().element()) + value);
   ineff_btInc(root.right().right() , value);
  }
}
