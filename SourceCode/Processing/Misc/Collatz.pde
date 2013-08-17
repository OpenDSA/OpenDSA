/* *** ODSATag: Collatz *** */
while (n > 1)
  if (ODD(n))
    n = 3 * n + 1;
   else
     n = n / 2;
/* *** ODSAendTag: Collatz *** */
