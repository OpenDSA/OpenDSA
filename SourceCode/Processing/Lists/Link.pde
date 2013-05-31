/* *** ODSATag: Link *** */
class Link {
  private Object e;
  private Link n;

  // Constructors
  Link(Object ine, Link inn) { e = ine; n = inn; }
  Link(Link inn) { e = null; n = inn; }

  Object element() { return e; }           // Return the value
  void setelement(Object ine) { e = ine; } // Set element value
  Link next() { return n; }                // Return next link
  void setnext(Link inn) { n = inn; }      // Set next link
}
/* *** ODSAendTag: Link *** */
