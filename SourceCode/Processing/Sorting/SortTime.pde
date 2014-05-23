final int testsize = 10000;
boolean SUCCESS = true;    // Not actually used by the timer routines
long time1, time2;         // These get set by sorttime()

void setup() {
  Integer[] A = new Integer[testsize];

   for (int i=0; i<A.length; i++)
     A[i] = int(random(10000))+1;
//  for (int i=0; i<A.length; i++)
//    A[i] = i+1;
//  for (int i=0; i<A.length; i++)
//    A[i] = 200000 - i;

  sorttime(A);
  exit();
}
