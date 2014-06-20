// First, include all the standard headers that we need
#include <iostream>
#include <fstream>
#include <cstdlib>
#include <time.h>  // Used by timing functions

// Now all the standard names that we use
using std::cout;
using std::endl;
using std::string;
using std::ostream;

using std::fstream;
using std::ios;

// Random number generator functions
inline void Randomize() // Seed the generator
{ srand(1); }

// Return a random value in range 0 to n-1
inline int Random(int n)
{ return rand() % (n); }


// Swap two integers
inline void swap(int A[], int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

// Your basic int type as an object.
class Int {
 private:
  int val;
 public:
  Int(int input=0) { val = input; }
  // The following is for those times when we actually
  //   need to get a value, rather than compare objects.
  int key() const { return val; }
  // Overload = to support Int foo = 5 syntax
  Int operator= (int input) { val = input; return val; }
};
