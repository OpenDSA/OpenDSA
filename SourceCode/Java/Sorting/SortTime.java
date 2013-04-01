final int testsize = 10000;
long time1, time2;         // These get set by sorttime()

void checkorder(int[] A) {
  for (int i=1; i<A.length; i++)
    if (A[i] < A[i-1]) {
      println("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
    }
}

void makenew(int[] A) {
  for (int i=0; i<A.length; i++)
    A[i] = int(random(1000))+1;
}

void setup() {
  int[] A = new int[testsize];
  int i;

  sorttime(A);
  exit();
}
