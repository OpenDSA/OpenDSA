// Determine if an array is sorted
template <typename E, typename Comp>
bool checkorder(E A[], int n) {
  for (int i=1; i<n; i++)
    if (Comp::lt(A[i], A[i-1])) {
       cout << "Error! Value " << A[i] << " at position " << i
	    << " was less than " << A[i-1] << " at position " << (i-1) << endl;
      return false;
    }
  return true;
}

// Determine if an array is sorted
bool checkorder(KVPair* A[], int n) {
  for (int i=1; i<n; i++)
    if (*A[i] < *A[i-1]) {
       cout << "Error! Value " << *A[i] << " at position " << i
	    << " was less than " << *A[i-1] << " at position " << (i-1) << endl;
      return false;
    }
  return true;
}

// Determine if an array is sorted
bool checkorder(int A[], int n) {
  for (int i=1; i<n; i++)
    if (A[i] < A[i-1]) {
       cout << "Error! Value " << A[i] << " at position " << i
	    << " was less than " << A[i-1] << " at position " << (i-1) << endl;
      return false;
    }
  return true;
}

// Determine if an array is sorted
bool checkorder(Comparable* A[], int n) {
  for (int i = 1; i < n; i++)
    if (*A[i] < *A[i-1]) {
      cout << "Error! Value " << *A[i] << " at position " << i
           << " was less than " << *A[i-1] << " at position " << (i-1) << endl;
      return false;
    }
  return true;
}
