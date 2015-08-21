boolean SUCCESS = true;

/* *** ODSATag: EffCnt *** */
static int eff_count(BinNode root) {
  if (root == null) return 0;  // Nothing to count
    return 1 + eff_count(root.left()) + eff_count(root.right());
}
/* *** ODSAendTag: EffCnt *** */


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
/* *** ODSAendTag: IneffCnt *** */ 


/* *** ODSATag: IneffbtInc *** */
static void ineff_btInc(BinNode root , int value) {
  if (root != null) {
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
}
/* *** ODSAendTag: IneffbtInc *** */

void setup() {
 
   BSTNode root = null;
   root = new BSTNode(10);
   BSTNode leftChild = new BSTNode(15);
   BSTNode rightChild = new BSTNode(20);
   root.setLeft(leftChild); 
   root.setRight(rightChild);
  
  int x= eff_count(root);

  x = ineff_count(root);

  ineff_btInc(root, 15);

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
