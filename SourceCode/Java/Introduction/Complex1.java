
public class Complex {
  private final double real;  // real number
  private final double imag;  // imaginary number's coefficient

  public Complex(double real, double imag) {
    this.real = real;
    this.imag = imag;
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
    System.out.println("'a' is " + a.toString());
    System.out.println("'b' is " + b.toString());
  }
}
