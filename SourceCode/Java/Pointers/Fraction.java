/**
 * Fraction class
 */
class Fraction
{
    int numerator, denominator;

    /**
     * Fraction constructor
     * @param num numerator value
     * @param den denominator value
     */
    public Fraction(int num, int den)
    {
        numerator = num;
        denominator = den;
    }
}

/**
 * tester class
 */
class TestHeapArray {
    static void main() {
        Fraction[] fracts;
        int i;
        // allocate the array
        fracts = new Fraction[100];
        // use it like an array -- in this case set them all to 22/7
        for (i = 0; i < 99; i++) {
            fracts[i] = new Fraction(22, 7);
        }
        // Deallocate the whole array
        fracts = null;
    }
}