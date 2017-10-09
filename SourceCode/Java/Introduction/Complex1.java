
public class Complex {
  private final double re;
  private final double im;

  public Complex(double re, double im) {
    this.re = re;
    this.im = im;
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
