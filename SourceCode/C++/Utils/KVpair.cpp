// Container for a key-value pair
class KVpair {
private:
  int k;
  void* e;

public:
  // Constructors
  KVpair() {}
  KVpair(int kval, void* eval)
  { k = kval; e = eval; }
  KVpair(const KVpair& o)  // Copy constructor
  { k = o.k; e = o.e; }

  void operator =(const KVpair& o) // Assignment operator
  { k = o.k; e = o.e; }

  bool operator <(KVpair* o) // < operator
  { return k < o->key(); }

  // Data member access functions
  int key() { return k; }
  void setKey(int ink) { k = ink; }
  void* value() { return e; }
};

// Overload << operator to print the KVpair key value
ostream& operator << (ostream& s, KVpair* o) {
  return s << o->key();
}

// Swap two KVPairs
inline void swap(KVpair* A[], int i, int j) {
  KVpair* temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
