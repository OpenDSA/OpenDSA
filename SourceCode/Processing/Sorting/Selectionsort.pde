void sorttime(Comparable[] B) {
  int i;
  Comparable[] A = new Comparable[B.length];
  int totaltime, runs;
  int numruns = 20;

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  selsort(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Standard Selection Sort for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = millis();
  selsortcheck(A);
  time2 = millis();
  checkorder(A);
totaltime += (time2-time1);
}
  println("Standard Selection Sort with swap check for " + numruns + " runs: Size " + testsize + ", Time: " + totaltime);
}

// Same as selsort, but check if the swap is necessary
void selsortcheck(Comparable[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j].compareTo(A[bigindex]) > 0) // Found something bigger  
        bigindex = j;                // Remember bigger index
    if (bigindex != A.length-i-1)
      swap(A, bigindex, A.length-i-1); // Put it into place
  }
}

void sorttest(Comparable[] A) {
  selsort(A);
}

/* *** ODSATag: Selectionsort *** */
void selsort(Comparable[] A) {
  for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1; j<A.length-i; j++) // Find the max value
      if (A[j].compareTo(A[bigindex]) > 0) // Found something bigger  
        bigindex = j;                // Remember bigger index
    swap(A, bigindex, A.length-i-1); // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */
