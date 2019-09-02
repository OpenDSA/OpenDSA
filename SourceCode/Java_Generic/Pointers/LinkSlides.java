/* *** ODSATag: Slide1 *** */
Link p = head;
Link q = head.next;
Link r = q.next;
Integer myVal = q.data;
/* *** ODSAendTag: Slide1 *** */

/* *** ODSATag: Slide2 *** */
Link head = new Link(null);
head.data = new Integer(20); 
head.next = new Link(new Integer(30), null); 
head.next.next = new Link(new Integer(10), null);
Link temp = head.next.next; 
temp.next = new Link(new Integer(5), null);
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
