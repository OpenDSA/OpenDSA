
public class Complex {
  private final double first;
  private final double second;

  public Complex(double first, double second) {
    this.first = first;
    this.second = second;
  }

  @Override public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof Complex))
      return false;
    Complex c = (Complex) o;

    return Double.compare(first, c.first) == 0 &&
           Double.compare(second, c.second) == 0;
  }

  @Override public String toString() {
    String sign = second < 0 ? " - " : " + ";
    return "(" + first + sign + Math.abs(second) + "i)";
  }

  public static void main(String[] args)
  {
    Complex a = Complex(1, 0);
    Complex b = Complex(1, 0);

    if (a.equals(b)) {
      System.out.println ("'a' equals 'b'.");
    } else {
      System.out.println ("'a' and 'b' are not equal.");
    }
    System.out.println ("'a' = " + a);
    System.out.println ("'b' = " + b);
  }
}
