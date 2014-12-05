import student.TestCase;

public class TestBST extends TestCase{
   private BST<Integer> bst;
   
   public void setUp(){
      bst = new BST<Integer>();
   }
   
   public void testAdd(){
      bst.insert(new Integer(8));//We see this tree on the Wikipedia as an example of a bst 
      bst.insert(new Integer(3));//We will use it to test our insert function since we
      bst.insert(new Integer(1));//know how the traversal at the end should work. There
      bst.insert(new Integer(6));//are other ways to do this, however, this structure should 
      bst.insert(new Integer(4));//provide us not only with a series of inserts that will hit
      bst.insert(new Integer(7));//every line of code in the insert method and produce results
      bst.insert(new Integer(10));//that we can expect
      bst.insert(new Integer(14));
      bst.insert(new Integer(13));
      bst.insert(new Integer(13));//Handle inserting an element that already exists
      bst.preOrderTraversal();
      assertFuzzyEquals("8 3 1 6 4 7 10 14 13", systemOut().getHistory());
      //systemOut().getHistory() returns all information printed to the terminal
      //We use fuzzy equals as there may be leading/following whitespace and
      //we do not want to have to work to make a direct match
      systemOut().clearHistory();//Clear the history so the next time we print
      //so we do not have to worry about the past output.
      bst.inOrderTraversal();
      assertFuzzyEquals("1 3 4 6 7 8 10 13 14", systemOut().getHistory());
   }
   
   public void testRemove(){
      Exception d = null;
      try{
         bst.delete(new Integer(1));//It possible to throw an exception if
         //deleting on an empty tree
      } catch(Exception e){
         d = e;
         assertEquals(e.getMessage(), "cannot delete.");
         assertEquals(e.getClass(), RuntimeException.class);
         //There are a number of ways to test exceptions
         //One way would be to get the message that it prints, however, that
         //message will likely change in most exceptions (i.e. FileNotFound will
         //throw information about the file location). The other way to test an
         //exception would be to check the type of exception thrown. In addition,
         //it is wise to make sure an that the catch block is reached by setting
         //a marker value to guarantee it has been reached.
      }
      assertNotNull(d);//Make sure an exception was thrown
      String tree = "";
      for(int i=10; i < 20; i++){
         bst.insert(new Integer(i));
         tree += i+" ";
      }
      for(int k=9; k > -1; k--){
         bst.insert(new Integer(k));
         tree = k+" "+tree;
      }
      for(int j=0; j < 10; j++){
         bst.delete(new Integer(j));//Test basic delete functionality
         tree = tree.replaceFirst(Integer.toString(j), "");
         systemOut().clearHistory();//Clear system so we only haver current tree
         bst.inOrderTraversal();//After each removal
         assertFuzzyEquals(tree, systemOut().getHistory());//See if the tree is what we expect
      }
      for(int l=19; l > 9; l--){
         bst.delete(new Integer(l));
         tree = tree.replaceFirst(Integer.toString(l), "");
         systemOut().clearHistory();
         bst.inOrderTraversal();
         assertFuzzyEquals(tree, systemOut().getHistory());       
      }
      bst.insert(new Integer(10));//Handle the edge cases of deletion
      bst.insert(new Integer(8));//Deleting a  leaf
      bst.insert(new Integer(9));
      bst.insert(new Integer(6));
      bst.insert(new Integer(7));
      bst.delete(new Integer(6));
      systemOut().clearHistory();
      bst.inOrderTraversal();
      assertFuzzyEquals("7 8 9 10", systemOut().getHistory());
      bst.insert(new Integer(6));//Deleting an internal node
      bst.delete(new Integer(7));
      systemOut().clearHistory();
      bst.inOrderTraversal();
      assertFuzzyEquals("6 8 9 10", systemOut().getHistory());
      bst = new BST<Integer>();
      bst.insert(new Integer(10));//Deleting an internal node and pushing
      bst.insert(new Integer(8));//the new node up
      bst.insert(new Integer(9));
      bst.insert(new Integer(7));
      bst.delete(new Integer(8));
      systemOut().clearHistory();
      bst.inOrderTraversal();
      assertFuzzyEquals("7 9 10", systemOut().getHistory());
      bst = new BST<Integer>();
      bst.insert(new Integer(10));//Deleting an internal node and progressing
      bst.insert(new Integer(8));//down the left subtree to the rightmost
      bst.insert(new Integer(9));//node found in it.
      bst.insert(new Integer(6));
      bst.insert(new Integer(7));
      bst.delete(new Integer(8));
      systemOut().clearHistory();
      bst.inOrderTraversal();
      assertFuzzyEquals("6 7 9 10", systemOut().getHistory());
   }
}
