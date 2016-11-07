// Various Insertionsort algorithms, followed by driver function named "sorttime"

// Standard insertion sort (on int's)
static void inssort(int[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      swap(A, j, j-1);
    }
}

// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2(int[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}

// Standard insertion sort for Integer class
static void inssortInteger(Integer[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j].compareTo(A[j-1]) < 0); j--) {
      swapInteger(A, j, j-1);
    }
}

// Standard insertion sort for double type array
static void inssortDouble(double[] A,int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      swapDouble(A, j, j-1);
    }
}

// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2Integer(Integer[] A, int startpos, int length) {
  Integer temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j].compareTo(A[j-1]) < 0); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}


// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2Double(double[] A, int startpos, int length) {
  double temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}


// -------------- Driver function. Invoke all of the sorts to be tested -----------------

static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging


  System.out.println("Insertion Sort");
  System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

  // inssort
if(dataType.equals("int"))
{
  testsortallint("inssort", testsize);
  testsortallint("inssort2", testsize);
}
else if(dataType.equals("Integer"))
{
  testsortallInteger("inssortInteger",testsize);
  testsortallInteger("inssort2Integer",testsize);
}
else if(dataType.equals("double"))
{
  testsortallDouble("inssortDouble",testsize);
  testsortallDouble("inssort2Double",testsize);
}
}
