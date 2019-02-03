/**
 * 
 * B+ tree implementation: Max >= 1, No negative value
 * 
 * @author Liling Yuan
 * @version December 2018
 *
 */
public class BPlusTree {

	private TreeNode root;
	private int max;
	private int update;
	private int level;
	private SingleLinkedList<TreeNode> leafValue;
	private SingleLinkedList<SingleLinkedList<TreeNode>> list;

	/**
	 * constructor
	 * 
	 * @param noc the number of value it passed by
	 */
	public BPlusTree(int noc) {
		list = new SingleLinkedList<SingleLinkedList<TreeNode>>();
		level = 1;
		max = noc;
		root = new TreeNode(noc);
		leafValue = new SingleLinkedList<TreeNode>();
		leafValue.add(root);
		list.add(leafValue);
		update = -1;
	}

	public int getLevel() {
		return level;
	}

	public TreeNode getRoot() {
		return root;
	}

	/**
	 * split the current TreeNode Return the new TreeNode
	 * 
	 * @param rt      the current TreeNode that will be split
	 * @param addInfo the new value that will be added in
	 * @return the new TreeNode that will be created
	 */
	public TreeNode split(TreeNode rt, int addInfo) {
		int leftSize = (max + 1) / 2;
		int addPos = rt.insertPos(addInfo, 0, max - 1);
		TreeNode next = new TreeNode(max);
		// add new value to the left TreeNode
		if (addPos < leftSize) {
			for (int i = leftSize - 1; i < max; i++) {
				next.insert(rt.getValue()[i]);
			}
			rt.setSize(leftSize);
			for (int i = leftSize - 1; i > addPos; i--) {
				rt.setValue(i, rt.getValue()[i - 1]);
			}
			rt.setValue(addPos, addInfo);
		}
		// add new value to the next TreeNode
		else {
			for (int i = leftSize; i < max; i++) {
				next.insert(rt.getValue()[i]);
			}
			next.insert(addInfo);
			rt.setSize(leftSize);
		}
		return next;
	}

	public TreeNode parentSplit(TreeNode rt) {
		TreeNode next = new TreeNode(max);
		int leftSize = (max + 1) / 2;
		int addPos = rt.insertPos(update, 0, max - 1);
		// deal with parentNode
		if (addPos < leftSize) {
			int updateBackUp = rt.getValue()[leftSize - 1];
			for (int i = leftSize; i < max; i++) {
				next.insert(rt.getValue()[i]);
			}
			rt.setSize(leftSize);
			for (int i = leftSize - 1; i > addPos; i--) {
				rt.setValue(i, rt.getValue()[i - 1]);
			}
			rt.setValue(addPos, update);
			update = updateBackUp;
		} else if (addPos > leftSize) {
			int updateBackUp = rt.getValue()[leftSize];
			for (int i = leftSize + 1; i < max; i++) {
				next.insert(rt.getValue()[i]);
			}
			next.insert(update);
			rt.setSize(leftSize);
			update = updateBackUp;
		} else {
			for (int i = leftSize; i < max; i++) {
				next.insert(rt.getValue()[i]);
			}
			rt.setSize(leftSize);
		}
		return next;
	}

	/**
	 * insert into the B+ Tree
	 * 
	 * @param rt      parent Node
	 * @param addInfo new Info that will be added in
	 * @return current TreeNode
	 */
	public TreeNode insert(TreeNode rt, int addInfo, int lev) {
		if (rt.isLeaf()) {
			boolean checkAdd = rt.insert(addInfo);
			if (checkAdd) {
				update = -1;
				return rt;
			} else {
				// split
				TreeNode next = split(rt, addInfo);
				insertTreeNode(leafValue, next);// add in the single linked list
				update = next.getValue()[0];
				if (rt == root) {
					TreeNode parent = new TreeNode(max); // add new parent node
					parent.insert(update);
					parent.setChildren(0, rt);
					parent.setChildren(1, next);
					root = parent;
					update = -1;
					level++;
					list.add(new SingleLinkedList<TreeNode>());
					list.get(level - 1).add(parent);
					return parent;
				}
				return next;
			}
		} else {
			int pos = rt.insertPos(addInfo, 0, rt.size() - 1);
			TreeNode next = insert(rt.getChildren()[pos], addInfo, lev - 1); // new child
			if (next != rt.getChildren()[pos]) {
				boolean checkAdd = rt.insert(update);
				if (checkAdd) {
					addChildren(rt, next, false, null);
					update = -1;
					return rt;
				} else {
					// split
					TreeNode nextNode = parentSplit(rt); // parallel with rt
					insertTreeNode(list.get(lev - 1), nextNode);
					// change children
					addChildren(rt, next, true, nextNode);
					if (rt == root) {
						TreeNode parent = new TreeNode(max); // add new parent node
						parent.insert(update);
						parent.setChildren(0, rt);
						parent.setChildren(1, nextNode);
						root = parent;
						update = -1;
						level++;
						list.add(new SingleLinkedList<TreeNode>());
						list.get(level - 1).add(parent);
						return parent;
					}
					return nextNode;
				}
			}
			return rt;
		}
	}

	/**
	 * add Children to the parent
	 * 
	 * @param parent    parent TreeNode
	 * @param newChild  new Child that will be added in the parent
	 * @param split     false when it does not need split, true when it does need
	 *                  split
	 * @param newParent when split is true, newParent is the TreeNode that created
	 *                  to hold other part of the value of the parent, when split is
	 *                  false, newParent is null
	 */
	public void addChildren(TreeNode parent, TreeNode newChild, boolean split, TreeNode newParent) {
		int pos = parent.insertChildrenPos(newChild);
		if (split) {
			int leftSize = (max + 1) / 2;
			if (pos > leftSize) {
				int j = 0;
				for (int i = leftSize + 1; i <= max; i++) {
					newParent.setChildren(j, parent.getChildren()[i]);
					parent.setChildren(i, null);
					j++;
				}
				addChildren(newParent, newChild, false, null);
			} else {
				int j = 0;
				for (int i = leftSize; i <= max; i++) {
					newParent.setChildren(j, parent.getChildren()[i]);
					parent.setChildren(i, null);
					j++;
				}
				addChildren(parent, newChild, false, null);
			}
		} else {
			for (int i = parent.getChildrenSize(); i > pos; i--) {
				parent.setChildren(i, parent.getChildren()[i - 1]);
			}
			parent.setChildren(pos, newChild);
		}

	}

	/**
	 * add TreeNode into the linkedList: outside insert (Leaf)
	 * 
	 * @param obj the TreeNode that will be added in the linked list
	 */
	public void insertTreeNode(SingleLinkedList<TreeNode> linkedlist, TreeNode obj) {
		int pos = 0;
		int b = obj.getValue()[obj.size() - 1];
		TreeNode curr = linkedlist.get(pos);
		while (pos < linkedlist.size() - 1) {
			if (b <= curr.getValue()[0]) {
				break;
			} else {
				pos++;
				curr = linkedlist.get(pos);
			}
		}
		if (b > curr.getValue()[0]) {
			pos++;
		}
		linkedlist.add(pos, obj);
	}

	public void printTree(TreeNode rt, int level) {
		if (rt == null) {
			return;
		} else if (rt.isLeaf()) {
			System.out.print(space(level));
			System.out.println(rt.toString());
		} else {
			System.out.print(space(level));
			System.out.println(rt.toString());
			for (int i = 0; i < rt.getChildren().length; i++) {
				if (rt.getChildren()[i] != null) {
					printTree(rt.getChildren()[i], level + 1);
				}
			}
		}
	}

	public void printList() {
		for (int i = 0; i < list.size(); i++) {
			for (int j = 0; j < list.get(i).size(); j++) {
				System.out.print(list.get(i).get(j) + ", ");
			}
			System.out.println();
		}
	}

	public String space(int level) {
		String result = "";
		for (int i = 0; i < level; i++) {
			result += "  ";
		}
		return result;
	}

	/**
	 * delete help method which check if this b plus tree has value of delInfo
	 * 
	 * @param rt      root
	 * @param delInfo info that we are looking for
	 * @return true if it contains, otherwise, return false
	 */
	public boolean find(TreeNode rt, int delInfo) {
		if (rt.isLeaf()) {
			for (int i = 0; i < rt.size(); i++) {
				if (rt.getValue()[i] == delInfo) {
					return true;
				}
			}
			return false;
		} else {
			int pos = rt.findHelp(delInfo, 0, rt.size() - 1);
			return find(rt.getChildren()[pos], delInfo);
		}
	}

	public void delete(TreeNode rt, int delInfo) {
		if (find(rt, delInfo)) {
			if (leafValue.size() > 1) {
				remove(rt, delInfo, level);
			} else {
				rt.delete(delInfo);
			}
		} else {
			System.out.println("Not Found!");
		}
	}

	public int getPosInList(SingleLinkedList<TreeNode> search, TreeNode node) {
		for (int i = 0; i < search.size(); i++) {
			if (search.get(i) == node) {
				return i;
			}
		}
		return -1;
	}

	public TreeNode mergeLeaf(TreeNode rt) {
		if ((double) (rt.size()) < ((double) max) / 2) { // need borrow or merge
			int index = getPosInList(leafValue, rt);
			// Borrow from Left
			if (index != 0 && (double) (leafValue.get(index - 1).size() - 1) >= ((double) max) / 2) {
				int biggestPos = leafValue.get(index - 1).size() - 1;
				int biggest = leafValue.get(index - 1).getValue()[biggestPos];
				leafValue.get(index - 1).delete(biggest);
				rt.insert(biggest);
			}
			// Borrow from Right
			else if (index != leafValue.size() - 1
					&& (double) (leafValue.get(index + 1).size() - 1) >= ((double) max) / 2) {
				int smallest = leafValue.get(index + 1).getValue()[0];
				leafValue.get(index + 1).delete(smallest);
				rt.insert(smallest);
				return leafValue.get(index + 1);
			}
			// Merge to the Left - Deal with the Value
			else if (index != 0) {
				TreeNode prev = leafValue.get(index - 1);
				for (int i = 0; i < rt.size(); i++) {
					int del = rt.getValue()[i];
					prev.insert(del);
					rt.delete(del);
				}
			}
			// Merge to the Right - Deal with the Value
			else {
				TreeNode next = leafValue.get(index + 1);
				for (int i = 0; i < rt.size(); i++) {
					int del = rt.getValue()[i];
					next.insert(del);
					rt.delete(del);
				}
			}
		}
		return rt;
	}

	public int getSmallest(TreeNode rt) {
		while (rt.getChildren()[0] != null) {
			rt = rt.getChildren()[0];
		}
		return rt.getValue()[0];
	}

	public TreeNode updateParent(TreeNode rt, int info) {
		if (rt.isLeaf()) {
			return rt;
		} else {
			int pos = rt.findHelp(info, 0, rt.size() - 1);
			TreeNode next = updateParent(rt.getChildren()[pos], info);
			if (next != null && pos == 0) {
				return rt;
			} else if (next != null) {
				rt.setValue(pos - 1, next.getValue()[0]);
			}
			return null;
		}
	}

	public TreeNode mergeParent(TreeNode rt, int lev) {
		SingleLinkedList<TreeNode> parentValue = list.get(lev - 1);
		int index = getPosInList(parentValue, rt);
		// Borrow from Left
		if (index != 0 && parentValue.get(index - 1).size() != 1) {
			// deal with value
			int biggestPos = parentValue.get(index - 1).size() - 1;
			int biggest = parentValue.get(index - 1).getValue()[biggestPos];
			parentValue.get(index - 1).delete(biggest);
			rt.clearValue();
			rt.insert(getSmallest(rt.getChildren()[0]));
			// deal with children
			TreeNode moveChild = parentValue.get(index - 1).getChildren()[biggestPos + 1];
			parentValue.get(index - 1).setChildren(biggestPos + 1, null);
			int lowerBound = rt.getChildrenSize();
			for (int j = lowerBound; j > 0; j--) {
				rt.setChildren(j, rt.getChildren()[j - 1]);
			}
			rt.setChildren(0, moveChild);
			TreeNode node = moveChild;
			while (node.getChildren()[0] != null) {
				node = node.getChildren()[0];
			}
			return node;
		}
		// Borrow from Right
		else if (index != parentValue.size() - 1 && parentValue.get(index + 1).size() != 1) {
			// deal with value
			int smallest = parentValue.get(index + 1).getValue()[0];
			parentValue.get(index + 1).delete(smallest);
			rt.clearValue();
			// deal with children
			rt.setChildren(1, parentValue.get(index + 1).getChildren()[0]);
			int upperBound = parentValue.get(index + 1).getChildrenSize() - 1;
			for (int j = 0; j < upperBound; j++) {
				parentValue.get(index + 1).setChildren(j, parentValue.get(index + 1).getChildren()[j + 1]);
			}
			parentValue.get(index + 1).setChildren(parentValue.get(index + 1).getChildrenSize() - 1, null);
			rt.insert(getSmallest(rt.getChildren()[1]));
			TreeNode node = parentValue.get(index + 1);
			while (node.getChildren()[0] != null) {
				node = node.getChildren()[0];
			}
			updateParent(node, node.getValue()[0]);
			return null;
		}
		// Merge to the Left - Deal with the Value
		else if (index != 0) {
			TreeNode prev = parentValue.get(index - 1);
			// deal with value
			rt.clearValue();
			prev.insert(getSmallest(rt.getChildren()[0]));
			// deal with children
			prev.setChildren(prev.getChildrenSize(), rt.getChildren()[0]);
			rt.clearChildren();
			return rt;
		}
		// Merge to the Right - Deal with the Value
		else {
			// deal with value
			rt.clearValue();
			parentValue.get(index + 1).insert(getSmallest(rt.getChildren()[0]));
			// deal with children
			int oriSize = parentValue.get(index + 1).getChildrenSize();
			for (int j = oriSize; j > 0; j--) {
				parentValue.get(index + 1).setChildren(j, parentValue.get(index + 1).getChildren()[j]);
			}
			parentValue.get(index + 1).setChildren(0, rt.getChildren()[0]);
			rt.clearChildren();
			return rt;
		}
	}

	public TreeNode remove(TreeNode rt, int delInfo, int lev) {
		if (rt.isLeaf()) { // leaf node
			rt.delete(delInfo);
			return mergeLeaf(rt);
		} else { // parent node
			int pos = rt.findHelp(delInfo, 0, rt.size() - 1);
			TreeNode change = remove(rt.getChildren()[pos], delInfo, lev - 1); // changed child
			if (change != null) {
				TreeNode mergeNode = change;
				if (change.size() == 0) { // update parent rt after merging
					int i = getPosInList(list.get(lev - 2), change);
					if (pos == 0) {
						mergeNode = list.get(lev - 2).get(i + 1);
						while (mergeNode.getChildren()[0] != null) {
							mergeNode = mergeNode.getChildren()[0];
						}
					}
					list.get(lev - 2).remove(i); // remove from the list
					int upperBound = rt.getChildrenSize();
					for (int j = pos; j < upperBound - 1; j++) {
						rt.setChildren(j, rt.getChildren()[j + 1]);
					}
					rt.setChildren(upperBound - 1, null);
					rt.clearValue();
					for (int j = 1; j < upperBound - 1; j++) {
						rt.insert(getSmallest(rt.getChildren()[j]));
					}
				} else {// borrow from the right
					if (pos + 1 < rt.getChildrenSize() && rt.getChildren()[pos + 1] == change) {
						pos++;
					}
				}
				if (rt == root && rt.getChildrenSize() == 1) {
					root = rt.getChildren()[0];
					return root;
				} else if (rt.getChildrenSize() == 1) { // need borrow and merge
					return mergeParent(rt, lev);
				} else if (change.size() == 0) {
					if (change != mergeNode) {
						return mergeNode;
					}
				} else if (pos != 0) {
					rt.setValue(pos - 1, change.getValue()[0]);
				} else {
					return change;
				}
			}
			return null;
		}
	}

}
