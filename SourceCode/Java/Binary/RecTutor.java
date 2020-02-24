import java.io.*;

// Tester for analysis code
public class RecTutor {

static boolean SUCCESS = true;

/* *** ODSATag: EffCnt *** */
static int count(BinNode root) {
  if (root == null) return 0;  // Nothing to count
  return 1 + count(root.left()) + count(root.right());
}
/* *** ODSAendTag: EffCnt *** */


/* *** ODSATag: IneffCnt *** */
static int ineff_count(BinNode root) {
  if (root == null) return 0;  // Nothing to count
  int count = 0;
  if (root.left() != null) {
    count = 1 + ineff_count(root.left());
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
static void ineff_BTinc(BinNode root) {
  if (root != null) {
      root.setValue((int)(root.value()) + 1);
    if (root.left() != null) {
      root.left().setValue((int)(root.left().value()) + 1);
      ineff_BTinc(root.left().left());
    }
    if (root.right() != null) {
      root.right().setValue((int)(root.right().value()) + 1);
      ineff_BTinc(root.right().right());
    }
  }
}
/* *** ODSAendTag: IneffbtInc *** */

/* *** ODSATag: bad_count *** */
static int bad_count(BinNode root) {
  if (root == null) return 0;  // Nothing to count
  bad_count(root.left());
  1 + bad_count(root.left()) + bad_count(root.right());
}
/* *** ODSAendTag: bad_count *** */



public static void main(String args[]) throws IOException {
   BSTNode root = null;
   root = new BSTNode(10);
   BSTNode leftChild = new BSTNode(15);
   BSTNode rightChild = new BSTNode(20);
   root.setLeft(leftChild); 
   root.setRight(rightChild);
  
  int x= count(root);

  x = ineff_count(root);

  ineff_BTinc(root);

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("RecTutor code testing failed");
  }
}
}
