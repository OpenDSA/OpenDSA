final int testsize = 10000;
long time1, time2;         // These get set by sorttime()

// Determine if an array is sorted
void checkorder(Comparable[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i].compareTo(A[i-1]) < 0) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}

void setup() {
  Integer[] A = new Integer[testsize];

   for (int i=0; i<A.length; i++)
     A[i] = int(random(1000))+1;
//  for (int i=0; i<A.length; i++)
//    A[i] = i+1;
//  for (int i=0; i<A.length; i++)
//    A[i] = 200000 - i;

  sorttime(A);
  exit();
}
