import java.io.*;

// Tester for Knapsackcode
public class Knapsack{

static boolean SUCCESS = true;
static int Values[];
  if (i==0)
         if (s≥k0)
            return k0;
         else
            return 0;
      else
          if (s<ki)
            return P(i-1,s);
         else
            return max (P(i-1,s), P(i-1,s-ki)+ki);

/* *** ODSATag: FibR *** */
static long knap(int n) {
  if (i==0)
         if (s>=k0)
            return k0;
         else
            return 0;
      else
          if (s<ki)
            return P(i-1,s);
         else
            return max (P(i-1,s), P(i-1,s-ki)+ki);

}
/* *** ODSAendTag: FibR *** */


public static void main(String args[]) throws IOException {
  long temp1, temp2, temp3;

  Values = new int[92];

  for (int i=0; i<=91; i++) Values[i] = 0;
  temp1 = fibr(30);
  temp2 = fibrt(30);
  temp3 = fibi(30);
  System.out.println("Got " + temp1);
  if ((temp1 != temp2) || (temp1 != temp3))
    SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Testing failed");
  }
}

}
