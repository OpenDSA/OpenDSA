static final int MaxKeyValue = 200;

// The following are dummy declarations to keep the compiler happy.
// Need to implement this for real when there is a list class
// available.
public interface List {
  public void append(int it);

  public void next();

  public void moveToStart();

  public int getValue();
}

public static class LinkedList implements List {
  LinkedList() {}

  public void append(int it) {}

  public void next() {}

  public void moveToStart() {}

  public int getValue() { return -1; }
}

static void output(Object x) {}

/* *** ODSATag: Binsort *** */
static void binsort(int[] A) {
  List[] B = new LinkedList[MaxKeyValue+1];
  int item;
  for (int i=0; i<=MaxKeyValue; i++)
    B[i] = new LinkedList();
  for (int i=0; i<A.length; i++) B[A[i]].append(A[i]);
  int pos = 0;
  for (int i=0; i<=MaxKeyValue; i++)
    for (B[i].moveToStart(); (item = B[i].getValue()) != -1; B[i].next())
      A[pos++] = item;
}
/* *** ODSAendTag: Binsort *** */


static void simplebinsort(int[] A, int[] B) {
  int i;
  /* *** ODSATag: simplebinsort *** */
  for (i=0; i<A.length; i++)
    B[A[i]] = A[i];
  /* *** ODSAendTag: simplebinsort *** */
}


static void simplebinsort2(int[] A) {
  int i;
  /* *** ODSATag: simplebinsort2 *** */
  for (i=0; i<A.length; i++)
    while (A[i] != i) // Swap element A[i] with A[A[i]]
      Swap.swap(A, i, A[i]);
  /* *** ODSAendTag: simplebinsort2 *** */
}

static Boolean sorttest(int[] A) {
  int[] B = new int[A.length];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++) {
      A[i] = i;
      B[i] = 0;
    }
    Permute.permute(A);
    simplebinsort(A, B);
    for (i=1; i<A.length; i++) {
      if (B[i] < B[i-1]) {
        System.out.println("Error! Value " + B[i] + " at position " + i +
                           " was less than " + B[i-1] + " at position " + (i-1));
        SUCCESS = false;
      }
    }
  }


  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<B.length; i++) {
      B[i] = i;
    }
    Permute.permute(B);
    simplebinsort2(B);
    for (i=1; i<B.length; i++) {
      if (B[i] < B[i-1]) {
        System.out.println("Error! Value " + B[i] + " at position " + i +
                           " was less than " + B[i-1] + " at position " + (i-1));
        SUCCESS = false;
      }
    }
  }
  return SUCCESS;
}
