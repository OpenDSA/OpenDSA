/**
 * Create a node of the single list and the method
 * for the single list
 */

/**
 * @author {Liling Yuan}
 * @param <E> the class that you want it to store
 * @version {September 2018}
 *
 */

public class SingleLinkedList<E> implements LList<E> {

	/**
	 * This represents a node in a singly linked list. This node stores data along
	 * with having a pointer to the next node in the list
	 * 
	 * @param <D> This is the type of object that this class will store
	 */
	private static class Node<D> {
		private D data;
		private Node<D> next;

		/**
		 * Creates a new node with the given data
		 * 
		 * @param d the data to put inside the node
		 */
		public Node(D d) {
			data = d;
			next = null;
		}

		/**
		 * Sets the node after this node
		 * 
		 * @param n the node after this one
		 */
		public void setNext(Node<D> n) {
			next = n;
		}

		/**
		 * Gets the next node
		 * 
		 * @return the next node
		 */
		public Node<D> next() {
			return next;
		}

		/*
		 * Gets the data in the node
		 * 
		 * @return the data in the node
		 *
		 * public D getData() { return data; }
		 */
	}

	private Node<E> head;
	private int size;

	/**
	 * Creates a new LinkedList object
	 */
	public SingleLinkedList() {
		head = null;
		size = 0;
	}

	/**
	 * Get the node in givenPosition PreCondition: List is not empty
	 * 
	 * @param givenPosition position that the Node we want stored in
	 * @throws IndexOutOfBoundsException if index is less than zero or greater than
	 *                                   size
	 * @throws IllegalArgumentException  if there is nothing in the Linked List
	 * @return node at givenPosition
	 */
	private Node<E> getNodeAt(int givenPosition) {
		if (givenPosition < 0 || givenPosition > size) {
			throw new IndexOutOfBoundsException("Index exceeds the size.");
		} else if (head == null) {
			throw new IllegalArgumentException("Nothing in the List");
		} else {
			Node<E> curr = head;
			int index = 0;
			while (index != givenPosition) {
				curr = curr.next;
				index++;
			}
			return curr;
		}
	}

	/**
	 * Gets the number of elements in the list
	 * 
	 * @return the number of elements
	 */
	@Override
	public int size() {
		return size;
	}

	/**
	 * Adds the object to the position in the list
	 * 
	 * @precondition obj cannot be null
	 * @param index where to add the object
	 * @param obj   the object to add
	 * @throws IndexOutOfBoundsException if index is less than zero or greater than
	 *                                   size
	 * @throws IllegalArgumentException  if obj is null
	 */
	@Override
	public void add(int index, E obj) {
		if (obj == null) {
			throw new IllegalArgumentException("Object is null");
		}
		if ((index < 0) || (index > size)) {
			throw new IndexOutOfBoundsException("Index is out of bounds");
		}
		Node<E> result = null;
		if (index == 0) {
			result = new Node<E>(obj);
			result.setNext(head);
			head = result;
		} else {
			Node<E> front = getNodeAt(index - 1);
			Node<E> frontNext = front.next();
			result = new Node<E>(obj);
			front.setNext(result);
			result.setNext(frontNext);
		}
		size++;
	}

	/**
	 * Adds the object to the end of the list.
	 * 
	 * @Precondition obj cannot be null
	 * @param obj the object to add
	 * @throws IllegalArgumentException is obj is null
	 */
	@Override
	public void add(E obj) {
		if (obj == null) {
			throw new IllegalArgumentException("Object is null");
		}
		Node<E> newNode = new Node<E>(obj);
		if (isEmpty()) {
			head = newNode;
		} else {
			Node<E> lastNode = getNodeAt(size - 1);
			lastNode.setNext(newNode);
		}
		size++;
	}

	/**
	 * Check if list is empty
	 * 
	 * @return check if size equal to 1
	 */
	@Override
	public boolean isEmpty() {
		return size == 0;
	}

	/**
	 * Remove the object at the given position
	 * 
	 * @param index the position of the object
	 * @return true if the removal was successful
	 * @throws IndexOutOfBoundsException if there is not an element at the index
	 */
	@Override
	public boolean remove(int index) {
		if ((index < 0) || (index > size) || head == null) {
			throw new IndexOutOfBoundsException("Index is out of bounds");
		}
		if (index == 0) {
			head = head.next;
			size--;
			return true;
		} else {
			Node<E> front = getNodeAt(index - 1);
			Node<E> frontNext = front.next.next;
			front.setNext(frontNext);
			size--;
			return true;
		}
	}

	/**
	 * Gets the data at index
	 * 
	 * @param index the object is located
	 * @return The object at the given position
	 */
	@Override
	public E get(int index) {
		return getNodeAt(index).data;
	}

	/**
	 * remove all of the elements from the list
	 */
	@Override
	public void clear() {
		if (head != null) {
			head.setNext(null);
			head = null;
			size = 0;
		}
	}

	// B+ Tree help method
	public int getPosition(E goal) {
		Node<E> curr = head;
		int pos = -1;
		while (curr != null) {
			pos++;
			if (curr.data == goal) {
				return pos;
			}
			curr = curr.next;
		}
		return pos;
	}

}
