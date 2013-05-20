/* *** ODSATag: linkedListInsertion *** */
public  void  insert(E  it)  {
	Link<E> newLinkNode = new  Link<E>(it,  curr.next());	
	curr.setNext(newLinkNode);
	listSize++;
}
/* *** ODSAendTag: linkedListInsertion *** */