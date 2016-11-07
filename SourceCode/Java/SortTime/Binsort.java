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

System.out.println("Bin Sort");

System.out.println("Method Name, Array Size, Array Type, Data Distribution");
setupInteger();


simplebinsort2(size10,10);
System.out.println("simplebinsort2 ,10, Integer, random distribution: "+ totaltime);



simplebinsort2(size10Asc,10);
System.out.println("simplebinsort2 , 10 ,Integer , ascending order: "+ totaltime);

simplebinsort2(size10Des,10);
System.out.println("simplebinsort2 ,10 ,Integer , decreasing order: "+ totaltime);

simplebinsort2(size10Ide,10);
System.out.println("simplebinsort2, 10, Integer ,idendical keys: "+ totaltime);

simplebinsort2(size10FewDup,10);
System.out.println("simplebinsort2 ,10, Integer, Few Duplicates: "+ totaltime);

simplebinsort2(size10SomeDup,10);
System.out.println("simplebinsort2 ,10 ,Integer ,Some Duplicates: "+ totaltime);

simplebinsort2(size10ManyDup,10);
System.out.println("simplebinsort2 , 10, Integer ,Many Duplicates: "+ totaltime);

simplebinsort2(size10SlightlyDis,10);
System.out.println("simplebinsort2 , 10, Integer ,Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2(size100,100);
System.out.println("simplebinsort2 , 100 ,Integer, random distribution: "+ totaltime);

simplebinsort2(size100Asc,100);
System.out.println("simplebinsort2 , 100, Integer , ascending order: "+ totaltime);

simplebinsort2(size100Des,100);
System.out.println("simplebinsort2 , 100 ,Integer , decreasing order: "+ totaltime);

simplebinsort2(size100Ide,100);
System.out.println("simplebinsort2 , 100 ,Integer, idendical keys: "+ totaltime);

simplebinsort2(size100FewDup,100);
System.out.println("simplebinsort2 , 100 ,Integer, Few Duplicates: "+ totaltime);

simplebinsort2(size100SomeDup,100);
System.out.println("simplebinsort2 , 100, Integer, Some Duplicates: "+ totaltime);

simplebinsort2(size100ManyDup,100);
System.out.println("simplebinsort2 , 100 ,Integer,Many Duplicates: "+ totaltime);

simplebinsort2(size100SlightlyDis,100);
System.out.println("simplebinsort2, 100, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2(size1000,1000);
System.out.println("simplebinsort2 , 1000 ,Integer, random distribution: "+ totaltime);

simplebinsort2(size100Asc,1000);
System.out.println("simplebinsort2 , 1000 ,Integer , ascending order: "+ totaltime);

simplebinsort2(size1000Des,1000);
System.out.println("simplebinsort2 , 1000, Integer , decreasing order: "+ totaltime);

simplebinsort2(size1000Ide,1000);
System.out.println("simplebinsort2 , 1000, Integer ,idendical keys: "+ totaltime);

simplebinsort2(size1000FewDup,1000);
System.out.println("simplebinsort2 , 1000 ,Integer, Few Duplicates "+ totaltime);

simplebinsort2(size1000SomeDup,1000);
System.out.println("simplebinsort2 , 1000 ,Integer, Some Duplicates "+ totaltime);

simplebinsort2(size1000ManyDup,1000);
System.out.println("simplebinsort2 ,1000, Integer, Many Duplicates "+ totaltime);

simplebinsort2(size1000SlightlyDis,1000);
System.out.println("simplebinsort2 ,1000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2(size10000,10000);
System.out.println("simplebinsort2 , 10000 ,Integer, random distribution: "+ totaltime);



simplebinsort2(size10000Asc,10000);
System.out.println("simplebinsort2 ,10000,Integer , ascending order: "+ totaltime);

simplebinsort2(size10000Des,10000);
System.out.println("simplebinsort2 , 10000, Integer , decreasing order: "+ totaltime);

simplebinsort2(size10000Ide,10000);
System.out.println("simplebinsort2 , 10000, Integer ,idendical keys: "+ totaltime);

simplebinsort2(size10000FewDup,10000);
System.out.println("simplebinsort2 Time for lists of size 10000 Integer Few Duplicates: "+ totaltime);

simplebinsort2(size10000SomeDup,10000);
System.out.println("simplebinsort2, 10000 ,Integer ,Some Duplicates: "+ totaltime);

simplebinsort2(size10000ManyDup,10000);
System.out.println("simplebinsort2 ,10000 ,Integer, Many Duplicates: "+ totaltime);

simplebinsort2(size10000SlightlyDis,10000);
System.out.println("simplebinsort2 , 10000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

setupint();


simplebinsort2Int(int10,10);
System.out.println("simplebinsort2Int , 10,int,random distribution: "+ totaltime);

simplebinsort2Int(int10Asc,10);
System.out.println("simplebinsort2Int ,10 ,int,ascending order: "+ totaltime);

simplebinsort2Int(int10Des,10);
System.out.println("simplebinsort2Int ,10, int, descending order: "+ totaltime);

simplebinsort2Int(int10Ide,10);
System.out.println("simplebinsort2Int , 10,int, idendical keys: "+ totaltime);

simplebinsort2Int(int10FewDup,10);
System.out.println("simplebinsort2Int , 10,int,  Few Duplicates: "+ totaltime);

simplebinsort2Int(int10SomeDup,10);
System.out.println("simplebinsort2Int , 10,int,  Some Duplicates: "+ totaltime);

simplebinsort2Int(int10ManyDup,10);
System.out.println("simplebinsort2Int , 10,int,  Many Duplicates: "+ totaltime);

simplebinsort2Int(int10SlightlyDis,10);
System.out.println("simplebinsort2Int , 10,int,  Slightly Distributed: "+ totaltime);

System.out.println();

simplebinsort2Int(int100,100);
System.out.println("simplebinsort2Int , 100,int,random distribution : "+totaltime);

for(int i=0;i<100;i++)
System.out.println(size100[i]);

simplebinsort2Int(int100Asc,100);
System.out.println("simplebinsort2Int , 100,int,ascending order: "+ totaltime);

simplebinsort2Int(int100Des,100);
System.out.println("simplebinsort2Int , 100,int, descending order: "+ totaltime);

simplebinsort2Int(int100Ide,100);
System.out.println("simplebinsort2Int, 100,int,idendical keys: "+ totaltime);

simplebinsort2Int(int100FewDup,100);
System.out.println("simplebinsort2Int , 100,int, Few Duplicates: "+ totaltime);

simplebinsort2Int(int100SomeDup,100);
System.out.println("simplebinsort2Int , 100,int, Some Duplicates: "+ totaltime);

simplebinsort2Int(int100ManyDup,100);
System.out.println("simplebinsort2Int , 100,int,Many Duplicates: "+ totaltime);

simplebinsort2Int(int100SlightlyDis,100);
System.out.println("simplebinsort2Int , 100,int, Slightly Distributed: "+ totaltime);

System.out.println();

simplebinsort2Int(int1000,1000);
System.out.println("simplebinsort2Int , 1000,int,random distribution: "+totaltime);

simplebinsort2Int(int1000Asc,1000);
System.out.println("simplebinsort2Int   , 1000,int, ascending order: "+ totaltime);

simplebinsort2Int(int1000Des,1000);
System.out.println("simplebinsort2Int   , 1000,int,descending order: "+ totaltime);

simplebinsort2Int(int1000Ide,1000);
System.out.println("simplebinsort2Int   , 1000,int, idendical keys: "+ totaltime);

simplebinsort2Int(int1000FewDup,1000);
System.out.println("simplebinsort2Int   , 1000,int, Few Duplicates: "+ totaltime);

simplebinsort2Int(int1000SomeDup,1000);
System.out.println("simplebinsort2Int   , 1000,int, Some Duplicates: "+ totaltime);

simplebinsort2Int(int1000SlightlyDis,1000);
System.out.println("simplebinsort2Int  , 1000,int,Slightly Distributed: "+ totaltime);

simplebinsort2Int(int1000ManyDup,1000);
System.out.println("simplebinsort2Int  , 1000,int, Many Duplicates: "+ totaltime);

System.out.println();

simplebinsort2Int(int10000,10000);
System.out.println("simplebinsort2Int , 10000,int,random distribution: "+totaltime);

simplebinsort2Int(int10000Asc,10000);
System.out.println("simplebinsort2Int , 10000,int, ascending order: "+ totaltime);

simplebinsort2Int(int10000Des,10000);
System.out.println("simplebinsort2Int , 10000,int,descending order: "+ totaltime);

simplebinsort2Int(int10000Ide,10000);
System.out.println("simplebinsort2Int , 10000,int, idendical keys: "+ totaltime);

simplebinsort2Int(int10000FewDup,10000);
System.out.println("simplebinsort2Int , 10000,int, Few Duplicates: "+ totaltime);

simplebinsort2Int(int10000SomeDup,10000);
System.out.println("simplebinsort2Int , 10000,int, Some Duplicates: "+ totaltime);

simplebinsort2Int(int10000SlightlyDis,10000);
System.out.println("simplebinsort2Int , 10000,int, Slightly Distributed: "+ totaltime);

simplebinsort2Int(int10000ManyDup,10000);
System.out.println("simplebinsort2Int , 10000,int, Many Duplicates: "+ totaltime);

System.out.println();
System.out.println();
/*
setupDouble();

simplebinsort2Double(dsize10Asc,10);
System.out.println("simplebinsort2Double Time for lists of size 10 double in ascending order: "+ totaltime);

simplebinsort2Double(dsize10Des,10);
System.out.println("simplebinsort2Double Time for lists of double 10 in decreasing order: "+ totaltime);

simplebinsort2Double(dsize10Ide,10);
System.out.println("simplebinsort2Double Time for lists of size 10 double idendical keys: "+ totaltime);

simplebinsort2Double(dsize10FewDup,10);
System.out.println("simplebinsort2Double Time for lists of size 10 double Few Duplicates: "+ totaltime);

simplebinsort2Double(dsize10SomeDup,10);
System.out.println("simplebinsort2Double Time for lists of size 10 double Some Duplicates: "+ totaltime);

simplebinsort2Double(dsize10ManyDup,10);
System.out.println("simplebinsort2Double Time for lists of size 10 double Many Duplicates: "+ totaltime);

simplebinsort2Double(dsize10SlightlyDis,10);
System.out.println("simplebinsort2Double Time for lists of size 10 double Slightly Disordered: "+ totaltime);


System.out.println();

simplebinsort2Double(dsize100Asc,100);
System.out.println("simplebinsort2Double Time for lists of size 100 double in ascending order: "+ totaltime);

simplebinsort2Double(dsize100Des,100);
System.out.println("simplebinsort2Double Time for lists of double 100 in decreasing order: "+ totaltime);

simplebinsort2Double(dsize100Ide,100);
System.out.println("simplebinsort2Double Time for lists of size 100 double idendical keys: "+ totaltime);

simplebinsort2Double(dsize100FewDup,100);
System.out.println("simplebinsort2Double Time for lists of size 100 double Few Duplicates: "+ totaltime);

simplebinsort2Double(dsize100SomeDup,100);
System.out.println("simplebinsort2Double Time for lists of size 100 double Some Duplicates: "+ totaltime);

simplebinsort2Double(dsize100ManyDup,100);
System.out.println("simplebinsort2Double Time for lists of size 100 double Many Duplicates: "+ totaltime);

simplebinsort2Double(dsize100SlightlyDis,100);
System.out.println("simplebinsort2Double Time for lists of size 100 double Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2Double(dsize1000Asc,1000);
System.out.println("simplebinsort2Double Time for lists of size 1000 double in ascending order: "+ totaltime);

simplebinsort2Double(dsize1000Des,1000);
System.out.println("simplebinsort2Double Time for lists of double 1000 in decreasing order: "+ totaltime);

simplebinsort2Double(dsize1000Ide,1000);
System.out.println("simplebinsort2Double Time for lists of size 1000 double idendical keys: "+ totaltime);

simplebinsort2Double(dsize1000FewDup,1000);
System.out.println("simplebinsort2Double Time for lists of size 1000 double Few Duplicates: "+ totaltime);

simplebinsort2Double(dsize1000SomeDup,1000);
System.out.println("simplebinsort2Double Time for lists of size 1000 double Some Duplicates: "+ totaltime);

simplebinsort2Double(dsize1000ManyDup,1000);
System.out.println("simplebinsort2Double Time for lists of size 1000 double Many Duplicates: "+ totaltime);

simplebinsort2Double(dsize1000SlightlyDis,1000);
System.out.println("simplebinsort2Double Time for lists of size 1000 double Slightly Disordered: "+ totaltime);

System.out.println();

simplebinsort2Double(dsize10000Asc,10000);
System.out.println("simplebinsort2Double Time for lists of size 10000 double in ascending order: "+ totaltime);

simplebinsort2Double(dsize10000Des,10000);
System.out.println("simplebinsort2Double Time for lists of double 10000 in decreasing order: "+ totaltime);

simplebinsort2Double(dsize10000Ide,10000);
System.out.println("simplebinsort2Double Time for lists of size 10000 double idendical keys: "+ totaltime);

simplebinsort2Double(dsize10000FewDup,10000);
System.out.println("simplebinsort2Double Time for lists of size 10000 double Few Duplicates: "+ totaltime);

simplebinsort2Double(dsize10000SomeDup,10000);
System.out.println("simplebinsort2Double Time for lists of size 10000 double Some Duplicates: "+ totaltime);

simplebinsort2Double(dsize10000ManyDup,10000);
System.out.println("simplebinsort2Double Time for lists of size 10000 double Many Duplicates: "+ totaltime);

simplebinsort2Double(dsize10000SlightlyDis,10000);
System.out.println("simplebinsort2Double Time for lists of size 10000 double Slightly Disordered: "+ totaltime);

System.out.println();*/

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


int i;
totaltime = 0;
int runs;
for (runs=0; runs<TESTSIZE; runs+=length)
{
time1 = millis();
/* *** ODSATag: simplebinsort2 *** */
for (i=runs; i<runs+length; i++)
  while (A[i] != i) // Swap element A[i] with A[A[i]]
    swap(A, i, A[i]);
/* *** ODSAendTag: simplebinsort2 *** */

time2 = millis();
totaltime += (time2-time1);
}
totaltime = totaltime/(TESTSIZE/length);


}
/*
static void simplebinsort2Double(double[] A,int length) {

double [] array = new double[length];
int numruns = 20;
int i;
totaltime = 0;
for (i=0; i<numruns; i++)
{
for(int z=0; z<length;z++)
array[z] = A[z];
time1 = millis();

for (i=0; i<A.length; i++)
while (A[i] != i) // Swap element A[i] with A[A[i]]
swap(A, i, A[i]);


time2 = millis();
totaltime += (time2-time1);
}
totaltime = totaltime/numruns;


}*/

static void simplebinsort2Int(int[] A,int length) {

int i;
totaltime = 0;
int runs;
for (runs=0; runs<TESTSIZE; runs+=length)
{
time1 = millis();
/* *** ODSATag: simplebinsort2 *** */
for (i=runs; i<runs+length; i++)
while (A[i] != i) // Swap element A[i] with A[A[i]]
swap(A, i, A[i]);
/* *** ODSAendTag: simplebinsort2 *** */

time2 = millis();
totaltime += (time2-time1);
}
totaltime = totaltime/(TESTSIZE/length);


}


