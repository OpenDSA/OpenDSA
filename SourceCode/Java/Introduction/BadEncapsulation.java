/* *** ODSATag: BadEncapsulation *** */
/** A class with no encapsulation */
class BadBoyShipping {
  public int weight;
  public String address;

  /* remaining code ommitted ... */
}

class ExploitShipping {
  public static void main (String[] args) {
    BadBoyShipping bad = new BadBoyShipping();
    bad.weight = -3;  // Nothing prevents me from doing this
  }
}
/* *** ODSAendTag: BadEncapsulation *** */
