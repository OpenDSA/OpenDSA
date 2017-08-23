/* *** ODSATag: Slide1 *** */
Link p = head;
Link q = head.next;
Link r = q.next;
Integer myVal = q.element;
/* *** ODSAendTag: Slide1 *** */

/* *** ODSATag: Slide2 *** */
Link head = new Link(null, null);
// We can set the value of an element field
head.element = new Integer(20); 
// We can set the element value directly in the constructor.
// But we have to store an object, not a primitive.
head.next = new Link(new Integer(30), null); 
head.next.next = new link(new Integer(10), null);
// It can get tiresome to chain all the "next" fields from the head
Link temp = head.next.next; 
temp.next = new link(new Integer(5), null);
/* *** ODSAendTag: Slide2 *** */

/* *** ODSATag: Slide3 *** */
Link curr = head;
while (curr.next != null)
  curr = curr.next;
/* *** ODSAendTag: Slide3 *** */

/* *** ODSATag: Slide4 *** */
Link q = head.next;
head.next = q.next;
q = head.next;
/* *** ODSAendTag: Slide4 *** */

/* *** ODSATag: Slide5 *** */
Link newLink = new Link(8, null);
newLink.next = head;
head = newLink;
/* *** ODSAendTag: Slide5 *** */
