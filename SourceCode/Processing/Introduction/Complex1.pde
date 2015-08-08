
public final class Complex {
  private final double re;
  private final double im;

  // use static factories instead of public contructor
  private Complex (double re, double im) {
    this.re = re;
    this.im = im;
  }

  public static Complex of (double re, double im) {
    return new Complex(re, im);
  }

  public static void main(String[] args)
  {
    Complex a = Complex.of (1,0);
    Complex b = Complex.of (1,0);

    if (a.equals(b)) {
      System.out.println ("'a' equals 'b'.");
    } else {
      System.out.println ("'a' and 'b' are not equal.");
    }
    System.out.println ("'a' is " + a.toString());
    System.out.println ("'b' is " + b.toString());
  }
}

