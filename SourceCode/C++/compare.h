// Some definitions for Comparator classes
#include <string.h>

// Get the key from an int
class getintKey {
public:
  static int key(int x) { return x; }
};

// Get the key from an Int object
class getIntKey {
public:
  static int key(Int x) { return x.key(); }
};

// Get the key from a pointer to an Int object
class getIntsKey {
public:
  static int key(Int* x) { return x->key(); }
};

// Not used by the dictionary, but used by largest.
class IntIntCompare {
public:
  static bool lt(Int x, Int y) { return x.key() < y.key(); }
  static bool eq(Int x, Int y) { return x.key() == y.key(); }
  static bool gt(Int x, Int y) { return x.key() > y.key(); }
};

// Not used by the dictionary, but used by largest.
class IntsIntsCompare {
public:
  static bool lt(Int* x, Int* y) { return x->key() < y->key(); }
  static bool eq(Int* x, Int* y) { return x->key() == y->key(); }
  static bool gt(Int* x, Int* y) { return x->key() > y->key(); }
};

// For use with max-heap
class maxIntCompare {
public:
  static bool prior(Int x, Int y) { return x.key() > y.key(); }
};

// For use with max-heap
class maxIntsCompare {
public:
  static bool prior(Int* x, Int* y) { return x->key() > y->key(); }
};

// For use with min-heap and sorting
class minIntCompare {
public:
  static bool prior(Int x, Int y) { return x.key() < y.key(); }
};

// For use with min-heap and sorting
class minIntsCompare {
public:
  static bool prior(Int* x, Int* y) { return x->key() < y->key(); }
};

// For use with min-heap and sorting
class minintCompare {
public:
  static bool prior(int x, int y) { return x < y; }
};

// For use with max-heap and heapsorting
class maxintCompare {
public:
  static bool prior(int x, int y) { return x > y; }
};

// Compare two ints
class intintCompare { // Comparator class for integer keys
public:
  static bool lt(int x, int y) { return x < y; }
  static bool eq(int x, int y) { return x == y; }
  static bool gt(int x, int y) { return x > y; }
};

class CCCompare { // Compare two character strings
public:
  static bool lt(char* x, char* y)
    { return strcmp(x, y) < 0; }
  static bool eq(char* x, char* y)
    { return strcmp(x, y) == 0; }
  static bool gt(char* x, char* y)
    { return strcmp(x, y) > 0; }
};

// Get the key for a character string.
// The key is just the string itself.
class getCKey {
public:
  static char* key(char* x) { return x; }
};
