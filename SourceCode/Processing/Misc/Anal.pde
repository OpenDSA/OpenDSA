boolean SUCCESS = true;

/* *** ODSATag: Largest *** */
/** Return position of largest value in array A */
int largest(int[] A) {
  int currlarge = 0; // Holds largest element position
  for (int i=1; i<A.length; i++) // For each element
    if (A[currlarge] < A[i])     // if A[i] is larger
       currlarge = i;            //   remember its position
  return currlarge;              // Return largest position
}
/* *** ODSAendTag: Largest *** */

/* *** ODSATag: bsearch *** */
// Return the position of an element in sorted array A
// with value k.  If k is not in A, return A.length.
int binary(int[] A, int k) {
  int l = -1;
  int r = A.length;   // l and r are beyond array bounds
  while (l+1 != r) {  // Stop when l and r meet
    int i = (l+r)/2;  // Check middle of remaining subarray
    if (k < A[i]) r = i;     // In left half
    if (k == A[i]) return i; // Found it
    if (k > A[i]) l = i;     // In right half
  }
  return A.length;    // Search value not in A
}
/* *** ODSAendTag: bsearch *** */

int value(int i) {
  return i;
}

void dum() {
  int a, b = 10, sum, sum1, sum2;
  int C = 10;
  int P = 20;
  int count[] = new int[C];
  int i, j, k;
  int n = 10;
  int A[] = new int[n];

/* *** ODSATag: Analp1 *** */
sum = 0;
for (i=1; i<=n; i++)
  for (j=1; j<=n; j++)
    sum++;
/* *** ODSAendTag: Analp1 *** */

/* *** ODSATag: c3p2 *** */
a = b;
/* *** ODSAendTag: c3p2 *** */

/* *** ODSATag: c3p3 *** */
sum = 0;
for (i=1; i<=n; i++)
   sum += n;
/* *** ODSAendTag: c3p3 *** */

/* *** ODSATag: c3p4 *** */
sum = 0;
for (j=1; j<=n; j++)     // First for loop
   for (i=1; i<=j; i++)  //   is a double loop
      sum++;
for (k=0; k<n; k++)      // Second for loop
   A[k] = k;
/* *** ODSAendTag: c3p4 *** */

/* *** ODSATag: c3p5 *** */
sum1 = 0;
for (i=1; i<=n; i++)     // First double loop
   for (j=1; j<=n; j++)  //   do n times
      sum1++;

sum2 = 0;
for (i=1; i<=n; i++)     // Second double loop
   for (j=1; j<=i; j++)  //   do i times
      sum2++;
/* *** ODSAendTag: c3p5 *** */

/* *** ODSATag: c3p6 *** */
sum1 = 0;
for (k=1; k<=n; k*=2)    // Do log n times
   for (j=1; j<=n; j++)  // Do n times
      sum1++;

sum2 = 0;
for (k=1; k<=n; k*=2)    // Do log n times
   for (j=1; j<=k; j++)  // Do k times
      sum2++;
/* *** ODSAendTag: c3p6 *** */

/* *** ODSATag: c3p16 *** */
  for (i=0; i<C; i++)   // Initialize count
     count[i] = 0;
  for (i=0; i<P; i++)   // Look at all of the pixels
     count[value(i)]++; // Increment a pixel value count
  sort(count);          // Sort pixel value counts
/* *** ODSAendTag: c3p16 *** */
}

// return TRUE iff the value n is odd
boolean ODD(int n) {
  return (n % 2) == 1;
}

void collatz(int n) {
/* *** ODSATag: Collatz *** */
while (n > 1)
  if (ODD(n))
    n = 3 * n + 1;
   else
     n = n / 2;
/* *** ODSAendTag: Collatz *** */
}

void setup() {
  int myarray[] = {5, 20, 3, 11};

  int temp = largest(myarray);
  if (temp != 1) SUCCESS = false;
  temp = binary(myarray, 20);
  if (temp != 1) SUCCESS = false;

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  } else {
    println("Testing failed");
  }

  collatz(5);
  collatz(15);

  exit();
}
