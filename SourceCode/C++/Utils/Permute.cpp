#include <iostream>
#include <cstdlib>
#include <time.h>
#include "utils.h"

inline void Randomize()
{ srand(time(0)); }

inline int Random(int n)
{ return rand() % (n); }

/* *** ODSATag: Permute *** */
//Randomly permute the values in array A
void permute(int A[], int n) {
  Randomize();
  for (int i = n; i > 0; i--) // for each i
    swap(A, i-1, int(Random(i)));    //   swap A[i-1] with a random
                                     //   position in the range 0 to i-1.
}
/* *** ODSAendTag: Permute *** */

int main(void) {
  const int n = 10;
  int* array;
  
  array = new int[n];
  
  for (int i = 0; i < n; i++) {
    array[i] = i;
  }
  permute(array, n);

  /* 
  for(int i = 0; i < n; i++)
  std::cout << array[i] << std::endl;
  */
  delete[] array;
  return 0;
}
