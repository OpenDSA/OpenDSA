// Same as selsort, but check if the swap is necessary
static void selsortcheck(int[] A,int startpos,int length) {

     for (int i=startpos; i<startpos+length-1; i++) { // Select i'th biggest record
    int bigindex = 0;                // Current biggest index
    for (int j=1+startpos; j<startpos+length-i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger
        bigindex = j;                // Remember bigger index
    if (bigindex != startpos+length-i-1)
      swap(A, bigindex, startpos+length-i-1); // Put it into place
  }
  }

    // Same as selsort, but check if the swap is necessary
    static void selsortcheckInteger(Integer[] A,int startpos,int length) {
                      for (int i=startpos; i<startpos+length-1; i++) { // Select i'th biggest record
                    int bigindex = 0;                // Current biggest index
                    for (int j=1+startpos; j<startpos+length-i; j++) // Find the max value
                        if (A[j].compareTo(A[bigindex]) > 0)        // Found something bigger
                            bigindex = j;                // Remember bigger index
                    if (bigindex != startpos+length-i-1)
                        swapInteger(A, bigindex, startpos+length-i-1); // Put it into place
                }

    }

    // Same as selsort, but check if the swap is necessary
    static void selsortcheckDouble(double[] A,int startpos,int length) {
             for (int i=startpos; i<startpos+length-1; i++) { // Select i'th biggest record
            int bigindex = 0;                // Current biggest index
            for (int j=1+startpos; j<startpos+length-i; j++) // Find the max value
                if (A[j] > A[bigindex])        // Found something bigger
                    bigindex = j;                // Remember bigger index
                if (bigindex != startpos+length-i-1)
                    swapDouble(A, bigindex, startpos+length-i-1); // Put it into place
            }

    }

/*
@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B,int length) {
  int i;
  Integer[] A = new Integer[length];
  for (i=0; i<length; i++)
    A[i] = new Integer(B[i]);
  selsort(A,length);
  if (!checkorder(A)) return false;

  //  KVPair[] AKV = (KVPair[])new Object[B.length];
  //  for (i=0; i<B.length; i++)
  //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
  //  inssort(A);
  //  if (!checkorder(A)) return false;
  return true;
}
*/
/* *** ODSATag: Selectionsort *** */
static void selsort(Integer[] A,int startpos,int length) {


  for (int i=startpos; i<startpos+length-1; i++) {       // Select i'th biggest record
    int bigindex = 0;                      // Current biggest index
    for (int j=1+startpos; j<startpos+length-i; j++)       // Find the max value
      if (A[j].compareTo(A[bigindex]) > 0) // Found something bigger
        bigindex = j;                      // Remember bigger index
    swapInteger(A, bigindex,startpos+length-i-1);       // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */


/* *** ODSATag: Selectionsort *** */
static void selsortInt(int[] A,int startpos,int length) {

for (int i=startpos; i<startpos+length-1; i++) {       // Select i'th biggest record
int bigindex = 0;                      // Current biggest index
for (int j=1+startpos; j<startpos+length-i; j++)       // Find the max value
if (A[j] > A[bigindex]) // Found something bigger
bigindex = j;                      // Remember bigger index
swap(A, bigindex,startpos+length-i-1);       // Put it into place
}
}
/* *** ODSAendTag: Selectionsort *** */


/* *** ODSATag: Selectionsort *** */
static void selsortDouble(double[] A,int startpos,int length) {



for (int i=startpos; i<startpos+length-1; i++) {       // Select i'th biggest record
int bigindex = 0;                      // Current biggest index
for (int j=startpos+1; j<startpos+length-i; j++)       // Find the max value
if (A[j] > A[bigindex]) // Found something bigger
bigindex = j;                      // Remember bigger index
swapDouble(A, bigindex,startpos+length-i-1);       // Put it into place
}
}
/* *** ODSAendTag: Selectionsort *** */

/* *** ODSATag: Selectionsort ***
static void selsortString(String[] A,int length) {


String[] B = new String[length];
int runs;
int numruns = 20;
totaltime = 0;
for (runs=0; runs<numruns; runs++) {
for (int i=0; i<length; i++)
B[i] = new String(A[i]);
time1 = millis();

for (int i=0; i<length-1; i++) {       // Select i'th biggest record
int bigindex = 0;                      // Current biggest index
for (int j=1; j<length-i; j++)       // Find the max value
if (B[j].compareTo(B[bigindex]) > 0) // Found something bigger
bigindex = j;                      // Remember bigger index
swapString(B, bigindex,length-i-1);       // Put it into place
}
time2 = millis();
totaltime += time2-time1;
}
totaltime = totaltime/numruns;
}*/
/* *** ODSAendTag: Selectionsort *** */

// -------------- Driver function. Invoke all of the sorts to be tested -----------------


static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging


//selection sort
System.out.println("Selection Sort");
System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

if(dataType.equals("int"))
{
testsortallint("selsortcheck", testsize);
testsortallint("selsortInt", testsize);
}
else if(dataType.equals("Integer"))
{
testsortallInteger("selsortcheckInteger",testsize);
testsortallInteger("selsort",testsize);
}
else if(dataType.equals("double"))
{
testsortallDouble("selsortcheckDouble",testsize);
testsortallDouble("selsortDouble",testsize);
}

}
