/* *** ODSATag: Link *** */
class Link {
  public Link next; //Point to next node in list
  public Object data; //Value for this node

  //Constructors
  public Link(Object dataIn, Link nextIn) {
    this.data = dataIn;
    this.next = nextIn;
  }

  public Link(Link nextIn) {
    this.data = null;
    this.next = nextIn;
  }

  Object getData() { // Return the data field
    return data;
  }

  void setData(Object newData) { // Set the data field
    data = newData;
  }

  Link getNext() { // Return the next field
    return next;
  }

  void setNext(Link newNext) { // Set the next field
    next = newNext;
  }
}
/* *** ODSAendTag: Link *** */
