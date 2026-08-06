final int MaxKeyValue = 200;

// The following are dummy declarations to keep the compiler happy.
// Need to implement this for real when there is a list class
// available.
public interface List {
  public void append(int it);

  public void next();

  public void moveToStart();

  public int getValue();
}

public class LinkedList implements List {
  LinkedList() {}

  public void append(int it) {}

  public void next() {}

  public void moveToStart() {}

  public int getValue() { return -1; }
}

void output(Object x) {}

/* *** ODSATag: Binsort *** */
void binsort(int[] A) {
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


void simplebinsort(int[] A, int[] B) {
  int i;
  /* *** ODSATag: simplebinsort *** */
  for (i=0; i<A.length; i++)
    B[A[i]] = A[i];
  /* *** ODSAendTag: simplebinsort *** */
}


void simplebinsort2(int[] A) {
  int i;
  /* *** ODSATag: simplebinsort2 *** */
  for (i=0; i<A.length; i++)
    while (A[i] != i) // Swap element A[i] with A[A[i]]
      swap(A, i, A[i]);
  /* *** ODSAendTag: simplebinsort2 *** */
}

boolean sorttest(int[] B) {
  int[] A = new int[B.length];
  int i;

  // Perform numruns trials to test this
  for (int tests=0; tests<numruns; tests++) {
    for (i=0; i<B.length; i++) {
      B[i] = i;
    }
    Permute.permute(B);
    simplebinsort(B, A);
    if (!checkorder(A)) return false;
  }


  for (int tests=0; tests<numruns; tests++) {
    for (i=0; i<A.length; i++) {
      A[i] = i;
    }
    Permute.permute(A);
    simplebinsort2(A);
    if (!checkorder(A)) return false;
  }
  return true;
}
