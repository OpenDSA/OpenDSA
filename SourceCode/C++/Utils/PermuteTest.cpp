#include <iostream>
#include <cstdlib>
#include <time.h>
#include "utils.h"
#include "Permute.h"

int main(void) {
  const int n = 10;
  int* array;
  Randomize();
  
  array = new int[n];
  
  for (int i = 0; i < n; i++) {
    array[i] = i;
  }
  permute(array, n);

  //  for(int i = 0; i < n; i++)
  //  std::cout << array[i] << std::endl;

  delete[] array;
  success(true);
  return 0;
}
