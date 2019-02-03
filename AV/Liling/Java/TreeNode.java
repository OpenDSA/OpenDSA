
/**
 * Tree Node that will be stored in the B+ tree
 * 
 * @author Liling Yuan
 * @version November 2018
 *
 */
public class TreeNode {

	private int[] value;
	private TreeNode[] children;
	private int max;
	private int size;

	public TreeNode(int numOfValue) {
		max = numOfValue;
		value = new int[max];
		children = new TreeNode[max + 1];
		size = 0;
	}

	public boolean isFull() {
		return max == size;
	}

	/**
	 * set the value at pos to val
	 * 
	 * @param pos the position that will change
	 * @param val the new value that will put into position pos
	 */
	public void setValue(int pos, int val) {
		value[pos] = val;
	}

	public void setChildren(int pos, TreeNode val) {
		children[pos] = val;
	}

	public void clearValue() {
		size = 0;
		for (int i = 0; i < max; i++) {
			value[i] = 0;
		}
	}

	public int getChildrenSize() {
		int s = 0;
		for (int i = 0; i < max + 1; i++) {
			if (children[i] != null) {
				s++;
			} else {
				break;
			}
		}
		return s;
	}

	public void clearChildren() {
		for (int i = 0; i < max + 1; i++) {
			children[i] = null;
		}
	}

	public boolean insert(int addInfo) {
		if (isFull()) {
			return false;
		} else if (size == 0) {
			value[0] = addInfo;
			size++;
			return true;
		} else {
			int pos = insertPos(addInfo, 0, size - 1);
			for (int i = size; i > pos; i--) {
				value[i] = value[i - 1];
			}
			value[pos] = addInfo;
			size++;
			return true;
		}
	}

	/**
	 * delete value delInfo in the value array in the TreeNode
	 * 
	 * @param delInfo the value that will be deleted
	 * @return false if there is no value of delInfo in the array of value
	 */
	public boolean delete(int delInfo) {
		int pos = -1;
		for (int i = 0; i < size; i++) {
			if (value[i] == delInfo) {
				pos = i;
			}
		}
		if (pos != -1) {
			size--;
			for (int i = pos; i < size; i++) {
				value[i] = value[i + 1];
			}
			return true;
		}
		return false;
	}

	/**
	 * find the position to add in the array: inside insert(when addInfo equal to
	 * the value in the parent, go to left side) used for insert
	 * 
	 * @param addInfo the information that will be add in
	 * @param small   the smallest bound (pos)
	 * @param big     the biggest bound (pos)
	 * @return the index that we are going to added in
	 */
	public int insertPos(int addInfo, int small, int big) {
		if (addInfo <= value[small]) {
			return small;
		} else if (addInfo > value[big]) {
			return big + 1;
		} else if (addInfo == value[big]) {
			return big;
		}
		int index = (big + small) / 2;
		if (big - small == 1) {
			return big;
		} else if (addInfo >= value[index]) {
			return insertPos(addInfo, index, big);
		} else {
			return insertPos(addInfo, small, index);
		}
	}

	/**
	 * find the position to add in the array: inside insert(when addInfo equal to
	 * the value in the parent, go to right side) used for delete
	 * 
	 * @param addInfo the information that will be add in
	 * @param small   the smallest bound (pos)
	 * @param big     the biggest bound (pos)
	 * @return the index that we are going to added in
	 */
	public int findHelp(int addInfo, int small, int big) {
		if (addInfo < value[small]) {
			return small;
		} else if (addInfo == value[small]) {
			return small + 1;
		} else if (addInfo >= value[big]) {
			return big + 1;
		}
		int index = (big + small) / 2;
		if (big - small == 1) {
			return big;
		} else if (addInfo >= value[index]) {
			return insertPos(addInfo, index, big);
		} else {
			return insertPos(addInfo, small, index);
		}
	}

	/**
	 * the Position that we will add Children in
	 * 
	 * @param newChild new Child that will be added in the parent
	 * @return position that the new TreeNode will be added in
	 */
	public int insertChildrenPos(TreeNode newChild) {
		int pos = 0;
		int b = newChild.getValue()[newChild.size() - 1];
		TreeNode curr = getChildren()[pos];
		while (pos < getChildrenSize() - 1) {
			if (b <= curr.getValue()[0]) {
				break;
			} else {
				pos++;
				curr = getChildren()[pos];
			}
		}
		if (b > curr.getValue()[0]) {
			pos++;
		}
		return pos;
	}

	public int size() {
		return size;
	}

	public void setSize(int newSize) {
		size = newSize;
	}

	public int[] getValue() {
		return value;
	}

	public TreeNode[] getChildren() {
		return children;
	}

	public boolean isLeaf() {
		for (int i = 0; i < max + 1; i++) {
			if (children[i] != null) {
				return false;
			}
		}
		return true;
	}

	public String toString() {
		String result = "[";
		for (int i = 0; i < size - 1; i++) {
			result += value[i];
			result += ",";
		}
		result += value[size - 1];
		result += "]";
		return result;
	}
}
