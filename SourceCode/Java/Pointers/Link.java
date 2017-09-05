/* *** ODSATag: Link *** */
class Link {
  public Link next; //Point to next node in list
  public Object data; //Value for this node

  //Constructors
  public Link(Object data, Link next) {
    this.data = data;
    this.next = next;
  }

  public Link(Object data) {
    this.data = null;
    this.next = next;
  }

  Object getData() { // Return the data field
    return data;
  }

  Object setData(Object newData) { // Set the data field
    return data = newData;
  }

  Link getNext() { // Return the next field
    return next;
  }

  Link setNext(Link newNext) { // Set the next field
    return next = newNext;
  }
}
/* *** ODSAendTag: Link *** */
