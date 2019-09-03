// Fraction class
class Fraction 
  int numerator, denominator;

  // Fraction constructor
  public Fraction(int num, int den) {
    numerator = num;
    denominator = den;
  }
}

// Test class
class TestHeapArray {
  static void main() {
    Fraction[] fracts;
    int i;
    int length = 100;
    
    // allocate the array
    fracts = new Fraction[length];
    // use it like an array -- in this case set them all to 22/7
    for (i = 0; i < length; i++) {
      fracts[i] = new Fraction(22, 7);
    }
    // Remove access to the array, making it garbage.
    // If the Fraction objects that were created are also garbage now.
    fracts = null;
  }
}
