/* *** ODSATag: Link *** */
class Link {
  private Object e;
  private Link n;

  // Constructors
  Link(Object ine, Link inn) {
    e = ine;
    n = inn;
  }

  Link(Link inn) {
    e = null;
    n = inn;
  }

  // Return the value
  Object element() {
    return e;
  }

  // Return next link
  Link next() {
    return n;
  }

  // Set next link
  void setnext(Link inn) {
    n = inn;
  }
}
/* *** ODSAendTag: Link *** */
