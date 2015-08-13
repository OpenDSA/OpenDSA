/* *** ODSATag: Encapsulation *** */
/** A class with encapsulation */
class Shipping {
  // minimum shipping weight in oz.
  private static final int MIN_WEIGHT = 1;  
  private int weight;

  public int getWeight () {
    return weight;
  } 

  public int setWeight (int value) {
    weight = Math.max(MIN_WEIGHT, value);
  } 

}

class ExploitShipping {
  public static void main (String[] args) {
    Shipping s = new Shipping();
    s.setWeight(-3);   // weight is set to MIN_WEIGHT
  }
}
/* *** ODSAendTag: Encapsulation *** */
