boolean SUCCESS = true;
final int OFFSET = 10000000;
final int testsize = 100;

void setup() {
  Integer[] A = new Integer[testsize];
  int i;
  Dictionary b = new BSTDict();

  // Initialize to simply be the values from 0 to testsize-1
  // Ultimately, these are going to be our random keys
  for (i=0; i<A.length; i++)
    A[i] = i;
  // Now, generate a permuation on the numbers
  permute(A);

  // Now, build the dictionary
  // Each record will have a random key value from the permuation.
  // Since we actually store KVPairs, we will give it a "data" value
  // That is simply the count + OFFSET (so we can distinguish "data" from keys)
  for (i=0; i<A.length; i++)
    b.insert(A[i], i + OFFSET);

  if (b.size() != testsize) {
    println("Oops! Tree size is " + b.size() + ", it should be " + testsize);
    SUCCESS = false;
  }
  // Now, let's test removeAny
  while (b.size() != 0) {
    Object k = b.removeAny();
  }

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
