/* *** ODSATag: Adjust *** */
   E it = curr.next().element(); \ \ \ \  // Remember value
   curr.next().next().setPrev(curr);
   curr.setNext(curr.next().next());  // Remove from list
/* *** ODSAendTag: Adjust *** */

/* *** ODSATag: ch4p1 *** */
a = a + b;
b = a - b; // Now b contains original value of a
a = a - b; // Now a contains original value of b
/* *** ODSAendTag: ch4p1 *** */
