
public class Complex {
  private final double real;  // real number
  private final double imag;  // imaginary number's coefficient

  public Complex(double real, double imag) {
    this.real = real;
    this.imag = imag;
  }

  @Override public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof Complex))
      return false;
    Complex c = (Complex) o;

    return Double.compare(real, c.real) == 0 &&
           Double.compare(imag, c.imag) == 0;
  }

  @Override public String toString() {
    String sign = imag < 0 ? " - " : " + ";
    return "(" + real + sign + Math.abs(imag) + "i)";
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
