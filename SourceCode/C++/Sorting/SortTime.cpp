#include <iostream>
#include <cstdlib>
#include <fstream>

using std::fstream;
using std::ios;

// Sorting main function for running timings.
// To use: <sortname> [+/-] <array_size> <size_of_test> [<threshold>]
//  + means increasing values, - means decreasing value and no
//    parameter means random values;
// <array_size> sets the size of the array allocated to hold records.
// <size_of_test> controls the size of an individual test out
// of an array of size <array_size>.  For example, inssort 10 will run
// a series of sorts on lists of size 10. If <array_size> is 100, then
// this means that 10 sorts will be run. It is important to run many,
// many runs for small lists to get a measurable timing result. See notes
// below on reasonable sizes for <array_size>.
// <threshold> controls the threshold parameter for certain sorts, e.g.,
//   cutoff point for quicksort sublists.

int ELEMSIZE = 32003;
int THRESHOLD = 0;

int main(int argc, char** argv) {
  fstream successfile;
  int* array;
  int i;

// Arraysize and listsize control how many times the sort will be run.
// Specifically, arraysize controls how much space is alloated, and there
// will be arraysize/listsize executions of the sorting algorithm.
// For all sorts other than the n^2 sorts, for any list less than 100,000
// records, the array size should be 100,000,000.
// On a 3GHz computer, for the n^2 sorts,
// the array size should be 10,000,000 for up to 10,000 record lists,
// and should be 1,000,000 for lists of size 100,000 or 1,000,000.

  int arraysize;
  int listsize;
  int currarg;
  int input = 0;  // Type to sort: -1 -- descending; +1 - ascending;
                  //                0 -- random values

  Randomize();

  if ((argc < 3) || (argc > 5)) {
    cout << "Usage: <SortTime> [+/-] <array_size> <size> [<threshold>]\n";
    exit(-1);
  }
  currarg = 1;
  if (argv[currarg][0] == '-') {
    input = -1;
    currarg++;
  }
  else if (argv[currarg][0] == '+') {
    input = 1;
    currarg++;
  }
  arraysize = atoi(argv[currarg++]);
  listsize = atoi(argv[currarg++]);
  if (argc > currarg)
    THRESHOLD = atoi(argv[currarg]);
  if ((listsize > arraysize) || (listsize < 0)) {
    cout << "Selected list size is too big\n";
    exit(-1);
  }
  cout << "Input: " << input << ", array size: " << arraysize
       << ", list size: " << listsize << ", threshold: "
       << THRESHOLD << "\n";

  array = new int[arraysize];

  if (input == -1)
    for (i=0; i<arraysize; i++)
      array[i] = arraysize - i;  // Reverse sorted
  else if (input == 0)
    for (i=0; i<arraysize; i++)
      array[i] = Random(ELEMSIZE);  // Random
  else
    for (i=0; i<arraysize; i++)
      array[i] = i;              // Sorted

  sorttime(&array[i], arraysize, listsize, threshold);

  return 0;
}
