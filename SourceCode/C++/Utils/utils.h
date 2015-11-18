// First, include all the standard headers that we need
#include <iostream>
#include <fstream>
#include <cstdlib>
#include <time.h>  // Used by timing functions
#include <algorithm>

// Now all the standard names that we use
using std::cout;
using std::endl;
using std::string;
using std::ostream;

using std::fstream;
using std::ios;

using std::sort;

fstream successfile;

// Random number generator functions
inline void Randomize() // Seed the generator
{ srand(time(0)); }

// Return a random value in range 0 to n-1
inline int Random(int n)
{ return rand() % (n); }


// Swap two integers
inline void swap(int A[], int i, int j) {
  int temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

// Create a "success" file
void success(bool succ) {
  if (succ) {
    successfile.open("success", ios::out);
    if (!successfile) {
      cout << "Unable to open SUCCESS file :";
      exit(-1);
    }
    successfile << "Success";
  }
}

