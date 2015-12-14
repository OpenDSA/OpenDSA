#include "utils.h"
#include "Largest.cpp"
#include "bsearch.cpp"
#include "Sequential.cpp"


bool SUCCESS = true;

int value(int i) {
  return i;
}

void dum() {
  int a, b = 10, sum, sum1, sum2;
  int C = 10;
  int P = 20;
  int count[C];
  int i, j, k;
  int n = 10;
  int A[n];

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
  sort(count, C);       // Sort pixel value counts
/* *** ODSAendTag: c3p16 *** */
}

// return TRUE iff the value n is odd
bool ODD(int n) {
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

int main(int argc, char** argv) {
  fstream successfile;

  int myarray[] = {5, 20, 3, 11};

  int temp = largest(myarray, 4);
  if (temp != 1) SUCCESS = false;
  temp = binarySearch(myarray, 4, 20);
  if (temp != 1) SUCCESS = false;
  temp = sequential(myarray, 4, 3);
  if (temp != 2) SUCCESS = false;

  if (SUCCESS) {
    successfile.open("success", ios::out);
    if (!successfile) {
      cout << "Unable to open SUCCESS file :";
      exit(-1);
    }
    successfile << "Success";
  }

  collatz(5);
  collatz(15);

  return 0;
}
