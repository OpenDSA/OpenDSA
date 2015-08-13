
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

  @Override public boolean equals (Object o) {
    if (o == this) 
      return true;
    if (!(o instanceof Complex)) 
      return false;
    Complex c = (Complex) o;

    return Double.compare(re, c.re) == 0 &&
           Double.compare(im, c.im) == 0;
  }

  @Override public String toString() {
    String sign = im<0?" - ":" + ";
    return "(" + re + sign + im + "i)";
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
    System.out.println ("'a' = " + a);
    System.out.println ("'b' = " + b);
}

