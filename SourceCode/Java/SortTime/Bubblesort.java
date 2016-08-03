// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheck(int[] A,int startpos,int length) {

for (int i=startpos; i<startpos+length-1; i++) {// Insert i'th record
    boolean swaps = false;
    for (int j=startpos+1; j<startpos+length-i; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        swaps = true;
      }
  }
}


// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheckDouble(double[] A,int startpos,int length) {

    for (int i=startpos; i<startpos+length-1; i++) {// Insert i'th record
        boolean swaps = false;
        for (int j=startpos+1; j<startpos+length-i; j++)
            if (A[j-1] > A[j]) {
                swapDouble(A, j-1, j);
                swaps = true;
            }
        }

    }

// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheckInteger(Integer[] A,int startpos,int length) {

for (int i=startpos; i<startpos+length-1; i++) {// Insert i'th record
boolean swaps = false;
for (int j=1+startpos; j<startpos+length-i; j++)
if (A[j-1].compareTo(A[j]) > 0) {
swapInteger(A, j-1, j);
swaps = true;
}
}
}

// Modify the flag to check position of last swap taken
static void bubblesortcheck2(int[] A,int startpos,int length) {

  for (int i=startpos; i<startpos+length-1; i++) {// Insert i'th record
    int lastseen = 0;
    int top = length;
    for (int j=startpos+1; j<top+startpos; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        lastseen = j-1;
      }
    top = lastseen;
  }
}

// Modify the flag to check position of last swap taken
static void bubblesortcheck2Double(double[] A,int startpos,int length) {


for (int i=startpos; i<startpos+length-1; i++) {// Insert i'th record
int lastseen = 0;
int top = length;
for (int j=startpos+1; j<+startpos+top; j++)
if (A[j-1] > A[j]) {
swapDouble(A, j-1, j);
lastseen = j-1;
}
top = lastseen;
}
}


// Modify the flag to check position of last swap taken
static void bubblesortcheck2Integer(Integer[] A,int startpos,int length) {


for (int i=startpos; i<startpos+length-1; i++) {// Insert i'th record
int lastseen = 0;
int top = length;
for (int j=startpos+1; j<startpos+top; j++)
if (A[j-1].compareTo(A[j])>0) {
swapInteger(A, j-1, j);
lastseen = j-1;
}
top = lastseen;
}
}


// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswap(Integer[] A,int startpos,int length) {
  int n = startpos + length - 1;
  while (n > startpos) {
    int newn = 0;
    for (int i = startpos; i < n; i++) {
      /* if this pair is out of order */
      if (A[i].compareTo(A[i+1]) > 0) {
        swap(A, i, i+1);
        newn = i;
      }
    }
    n = newn;
  }

}

// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswapInt(int[] A,int startpos,int length) {
int n = startpos+length - 1;
while (n > startpos) {
int newn = 0;
for (int i = startpos; i < n; i++) {
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swap(A, i, i+1);
newn = i;
}
}
n = newn;
}


}


// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswapDouble(double[] A,int startpos,int length) {

int n = startpos+length - 1;
while (n > startpos) {
int newn = 0;
for (int i = startpos; i < n; i++) {
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swapDouble(A, i, i+1);
newn = i;
}
}
n = newn;
}

}

/* *** ODSAendTag: BubblesortCheck *** */

// Wikipedia article "optimization" to only swap up to the last swap seen
static void unwikipedia(int[] A,int startpos,int length) {

  int n = startpos+length-1;
  while (n>startpos) {
    for (int i=startpos; i<n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
      }
    n -= 1;
  }

}

// Wikipedia article "optimization" to only swap up to the last swap seen
static void unwikipediaDouble(double[] A,int startpos,int length) {
int n = startpos+length-1;
while (n>startpos) {
for (int i=startpos; i<n; i++)
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swapDouble(A, i, i+1);
}
n -= 1;
}
}


// Wikipedia article "optimization" to only swap up to the last swap seen
static void unwikipediaInteger(Integer[] A,int startpos,int length) {

int n = startpos+length-1;
while (n>startpos) {
for (int i=startpos; i<n; i++)
/* if this pair is out of order */
if (A[i].compareTo(A[i+1])>0) {
swapInteger(A, i, i+1);
}
n -= 1;
}
}


// Wikipedia article "optimization" rewritten with a for loop
static void wikipedia2(int[] A,int startpos,int length) {
  int newn;
  int loopcnt = 0;
  for(int n=startpos+length-1; n>startpos; n=newn) {
    loopcnt++;
    newn = 0;
    for (int i=startpos; i<n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
        newn = i;
      }
  }
}


// Wikipedia article "optimization" rewritten with a for loop
static void wikipedia2Integer(Integer[] A,int startpos,int length) {
int newn;
int loopcnt = 0;
for(int n=startpos+length-1; n>startpos; n=newn) {
loopcnt++;
newn = 0;
for (int i=startpos; i<n; i++)
/* if this pair is out of order */
if (A[i].compareTo(A[i+1])>0) {
swapInteger(A, i, i+1);
newn = i;
}
}

}


// Wikipedia article "optimization" rewritten with a for loop
static void wikipedia2Double(double[] A,int startpos,int length) {

int newn;
int loopcnt = 0;
for(int n=startpos+length-1; n>startpos; n=newn) {
loopcnt++;
newn = 0;
for (int i=startpos; i<n; i++)
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swapDouble(A, i, i+1);
newn = i;
}
}
}
/*
@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B,int length) {


  int i;
  Integer[] A = new Integer[B.length];
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  bubblesort(A,length);
  if (!checkorder(A)) return false;

  //  KVPair[] AKV = (KVPair[])new Object[B.length];
  //  for (i=0; i<B.length; i++)
  //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
  //  inssort(A);
  //  if (!checkorder(A)) return false;
  return true;



}*/

/* *** ODSATag: Bubblesort *** */
static void bubblesort(Integer[] A,int startpos,int length) {


  for (int i=startpos; i<startpos+length-1; i++) // Insert i'th record
    for (int j=startpos+1; j<startpos+length-i; j++)
      if (A[j-1].compareTo(A[j]) > 0)
        swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */


/* *** ODSATag: Bubblesort *** */
static void bubblesortInt(int[] A,int startpos,int length) {

for (int i=startpos; i<startpos+length-1; i++) // Insert i'th record
for (int j=startpos+1; j<startpos+length-i; j++)
if (A[j-1] > A[j])
swap(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */


/* *** ODSATag: Bubblesort *** */
static void bubblesortDouble(double[] A,int startpos,int length) {
for (int i=startpos; i<startpos+length-1; i++) // Insert i'th record
for (int j=startpos+1; j<startpos+length-i; j++)
if (A[j-1] > A[j])
swapDouble(A, j-1, j);
}
/* *** ODSAendTag: Bubblesort *** */

// -------------- Driver function. Invoke all of the sorts to be tested -----------------

static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging

//bubble sort
System.out.println("Bubble Sort");
System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

if(dataType.equals("int"))
{
    testsortallint("bubblesortcheck", testsize);
    testsortallint("bubblesortcheck2", testsize);
    testsortallint("bubblecheckswapInt", testsize);
    testsortallint("unwikipedia", testsize);
    testsortallint("wikipedia2", testsize);
    testsortallint("bubblesortInt", testsize);
}

else if(dataType.equals("Integer"))
{
    testsortallInteger("bubblesortcheckInteger",testsize);
    testsortallInteger("bubblesortcheck2Integer",testsize);
    testsortallInteger("bubblecheckswap",testsize);
    testsortallInteger("unwikipediaInteger",testsize);
    testsortallInteger("wikipedia2Integer",testsize);
    testsortallInteger("bubblesort",testsize);
}

else if(dataType.equals("double"))
{
    testsortallDouble("bubblesortcheckDouble",testsize);
    testsortallDouble("bubblesortcheck2Double",testsize);
    testsortallDouble("bubblecheckswapDouble",testsize);
    testsortallDouble("unwikipediaDouble",testsize);
    testsortallDouble("wikipedia2Double",testsize);
    testsortallDouble("bubblesortDouble",testsize);
}

}


