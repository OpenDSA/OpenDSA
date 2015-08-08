/* *** ODSATag: Encapsulation *** */
/** A class with encapsulation */
class Shipping {
  private int weight;

  public int getWeight () {
    return weight;
  } 

  public int setWeight (int value) {
    weight = value;
  } 

}

class ExploitShipping {
  public static void main (String[] args) {
    Shipping s = new Shipping();
    s.setWeight(-3);   // Still not the behavior we are looking for
  }
}
/* *** ODSAendTag: Encapsulation *** */
