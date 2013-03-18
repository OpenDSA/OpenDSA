final int numtests = 5;
final int testsize = 100;

void swap(KVPair[] A, int i, int j) {
  KVPair temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}


void setup() {
  KVPair[] A = new KVPair[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = new KVPair(int(random(1000))+1, i);
    sorttest(A);
    for (i=1; i<A.length; i++)
      if (A[i].key() < A[i-1].key()) {
        println("Error! Value " + A[i].key() + " at position " + i +
                " was less than " + A[i-1].key() + " at position " + (i-1));
        exit();
      }
  }
  PrintWriter output = createWriter("success");
  output.println("Success");
  output.flush();
  output.close();
  exit();
}
