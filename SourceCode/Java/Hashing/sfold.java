// This revised sfold implementation was contributed by
//   Torben Haagh <tbhaagh@gmail.com>.
  
/* *** ODSATag: sfold *** */
// Use folding on a string, summed 4 bytes at a time
int sfold(String s, int M) {
  long sum = 0, mul = 1;
  for (int i = 0; i < s.length(); i++) {
    mul = (i % 4 == 0) ? 1 : mul * 256;
    sum += s.charAt(i) * mul;
  }
  return (int)(Math.abs(sum) % M);
}
/* *** ODSAendTag: sfold *** */
