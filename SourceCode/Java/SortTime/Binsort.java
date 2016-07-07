final int numtests = 5;
final int testsize = 100;
boolean SUCCESS = true;
final int MaxKeyValue = 200;

// The following are dummy declarations to keep the compiler happy.
// Need to implement this for real when there is a list class
// available.

/*
interface List {
  void append(Object it);

  void next();

  void moveToStart();

  Object getValue();
}

class LinkedList implements List {
  LinkedList() {}

  void append(Object it) {}

  void next() {}

  void moveToStart() {}

  Object getValue() { return null; }
}

void output(Object x) {} */

static void sorttime(){
System.out.println();

setupInteger();


simplebinsort2(size10,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer random distribution: "+ totaltime);

simplebinsort2(size10Asc,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer in ascending order: "+ totaltime);

simplebinsort2(size10Des,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer in decreasing order: "+ totaltime);

simplebinsort2(size10Ide,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer idendical keys: "+ totaltime);

simplebinsort2(size10FewDup,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer Few Duplicates: "+ totaltime);

simplebinsort2(size10SomeDup,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer Some Duplicates: "+ totaltime);

simplebinsort2(size10ManyDup,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer Many Duplicates: "+ totaltime);

simplebinsort2(size10SlightlyDis,10);
System.out.println("simplebinsort2 Time for lists of size 10 Integer Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2(size100,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer random distribution: "+ totaltime);

simplebinsort2(size100Asc,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer in ascending order: "+ totaltime);

simplebinsort2(size100Des,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer in decreasing order: "+ totaltime);

simplebinsort2(size100Ide,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer idendical keys: "+ totaltime);

simplebinsort2(size100FewDup,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer Few Duplicates: "+ totaltime);

simplebinsort2(size100SomeDup,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer Some Duplicates: "+ totaltime);

simplebinsort2(size100ManyDup,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer Many Duplicates: "+ totaltime);

simplebinsort2(size100SlightlyDis,100);
System.out.println("simplebinsort2 Time for lists of size 100 Integer Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2(size1000,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer random distribution: "+ totaltime);

simplebinsort2(size100Asc,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer in ascending order: "+ totaltime);

simplebinsort2(size1000Des,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer in decreasing order: "+ totaltime);

simplebinsort2(size1000Ide,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer idendical keys: "+ totaltime);

simplebinsort2(size1000FewDup,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer Few Duplicates "+ totaltime);

simplebinsort2(size1000SomeDup,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer Some Duplicates "+ totaltime);

simplebinsort2(size1000ManyDup,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer Many Duplicates "+ totaltime);

simplebinsort2(size1000SlightlyDis,1000);
System.out.println("simplebinsort2 Time for lists of size 1000 Integer Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2(size10000,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer random distribution: "+ totaltime);

simplebinsort2(size10000Asc,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer in ascending order: "+ totaltime);

simplebinsort2(size10000Des,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer in decreasing order: "+ totaltime);

simplebinsort2(size10000Ide,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer idendical keys: "+ totaltime);

simplebinsort2(size10000FewDup,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer Few Duplicates: "+ totaltime);

simplebinsort2(size10000SomeDup,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer Some Duplicates: "+ totaltime);

simplebinsort2(size10000ManyDup,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer Many Duplicates: "+ totaltime);

simplebinsort2(size10000SlightlyDis,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer Slightly Disordered: "+ totaltime);

System.out.println();




}

/*
void binsort(Integer[] A) {
  List[] B = new LinkedList[MaxKeyValue+1];
  Object item;
  for (int i=0; i<=MaxKeyValue; i++)
    B[i] = new LinkedList();
  for (int i=0; i<A.length; i++) B[A[i]].append(new Integer(A[i]));
  int pos = 0;
  for (int i=0; i<=MaxKeyValue; i++)
    for (B[i].moveToStart(); (item = B[i].getValue()) != null; B[i].next())
      A[pos++] = (Integer)item;
}
*/
void simplebinsort(Integer[] A, Integer[] B) {


  int i;
/* *** ODSATag: simplebinsort *** */
  for (i=0; i<A.length; i++)
    B[A[i]] = A[i];
/* *** ODSAendTag: simplebinsort *** */



}


static void simplebinsort2(Integer[] A,int length) {

Integer [] array = new Integer[length];
int numruns = 20;
int i;
totaltime = 0;
for (i=0; i<numruns; i++)
{
for(int z=0; z<length;z++)
array[z] = A[z];
time1 = millis();
/* *** ODSATag: simplebinsort2 *** */
for (i=0; i<A.length; i++)
  while (A[i] != i) // Swap element A[i] with A[A[i]]
    swap(A, i, A[i]);
/* *** ODSAendTag: simplebinsort2 *** */

time2 = millis();
totaltime += (time2-time1);
}
totaltime = totaltime/numruns;


}

