#include <iostream>
#include <cstdlib>
#include <time.h>
#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

int main(void) {
  Comparable *A[5];
  Int* dum = new Int(10);
  KVPair* k = new KVPair(120, dum);
  A[0] = k;
  A[1] = A[0];
  success(true);
  return 0;
}
