
public class FFTprocedureCON {
    private double[] poly;
    private int degree;
    
    FFTprocedureCON(double[] polynomial, int n)
    {
        poly = polynomial;
        degree = n;
    }
    
    public Complex[] fft()
    {
        return fft(poly, degree);
    }
    
    public int getDegree()
    {
        return degree;
    }
    /* *** ODSATag: FFTprocedure *** */
    private Complex[] fft(double[] polynomial, int n)
    {
      double[] even = new double[n/2]; 
      double[] odd = new double[n/2];
      Complex[] list1 = new Complex[n/2]; 
      Complex[] list2 = new Complex[n/2];
      Complex[] newPoly = new Complex[n];
      if (n == 1) {
        Complex[] poly = {new Complex(polynomial[0], 0)};
        return poly;
      }        
      for (int i = 0; i <= (n / 2 -1); i++) {
        even[i] = polynomial[2 * i];
        odd[i] = polynomial[2 * i + 1];
      }       
      list1 = fft(even, n / 2);
      list2 = fft(odd, n / 2);
      for (int j = 0; j <= n - 1; j++) {
        Complex i = new Complex(0.0, 2 * Math.PI * j / n);
        Complex z = i.exp();
        int k = j % (n / 2);
        newPoly[j] = list1[k].plus(z.times(list2[k]));
      }  
      return newPoly;
    }
    /* *** ODSAendTag: FFTprocedure *** */
}
