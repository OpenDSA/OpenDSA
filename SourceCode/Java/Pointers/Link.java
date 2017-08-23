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

    Object getData() {
        return data;
    }                  // Return the value

    Object setData(Object newData) {
        return data = newData;
    } // Set element value

    Link getNext() {
        return next;
    }                       // Return next link

    Link setNext(Link newNext) {
        return next = newNext;
    }      // Set next link
}
    
/* *** ODSAendTag: Link *** */
