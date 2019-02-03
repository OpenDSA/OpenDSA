
/**
 * test BPlusTree
 * 
 * @author Liling Yuan
 * @version January 2019
 *
 */
public class BPlusTreeDrive {

	public static void main(String[] args) {
		BPlusTree bpTree = new BPlusTree(3);
		bpTree.insert(bpTree.getRoot(), 76, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 75, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 78, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 23, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 28, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 17, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 40, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 74, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 62, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 30, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 90, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 60, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 11, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 42, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 58, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 94, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 46, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 83, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 43, bpTree.getLevel());
		bpTree.delete(bpTree.getRoot(), 23);
		// bpTree.insert(bpTree.getRoot(), 31, bpTree.getLevel());
		bpTree.delete(bpTree.getRoot(), 40);
		bpTree.delete(bpTree.getRoot(), 46);
//		bpTree.delete(bpTree.getRoot(), 75);
		bpTree.printTree(bpTree.getRoot(), 0);
		System.out.println("List Printing: ");
		bpTree.printList();
	}

	public void two() {
		BPlusTree bpTree = new BPlusTree(2);
		bpTree.insert(bpTree.getRoot(), 1, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 10, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 100, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 1000, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 9, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 20, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 8, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 11, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 200, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 12, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 13, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 1, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 8, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 10, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 10, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 9, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 9, bpTree.getLevel());
		bpTree.printTree(bpTree.getRoot(), 0);
	}

	public void three() {
		BPlusTree bpTree = new BPlusTree(3);
		bpTree.insert(bpTree.getRoot(), 76, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 75, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 78, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 23, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 28, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 17, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 40, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 74, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 62, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 30, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 90, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 60, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 11, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 42, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 58, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 94, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 46, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 83, bpTree.getLevel());
		bpTree.insert(bpTree.getRoot(), 43, bpTree.getLevel());
		bpTree.printTree(bpTree.getRoot(), 0);
		// FbpTree.delete(bpTree.getRoot(), 46);
	}

}
