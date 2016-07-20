static void sorttime(){

System.out.println();



setupInteger();
System.out.println();



System.out.println("Radix Sort");
System.out.println("Method Name, Array Size,  Array Type,Data Distribution");

System.out.println("radixSortInteger,10, Linked List Integer array, random distribution, "+ totaltime);
funcRadixSortInteger(size10,10);
System.out.println("radixSortInteger,100 , Linked List Integer array, random distribution ,"+ totaltime);
funcRadixSortInteger(size100,100);
System.out.println("radixSortInteger,1000 ,Linked List Integer array, random distribution ,"+ totaltime);
funcRadixSortInteger(size1000,1000);
System.out.println("radixSortInteger,10000 , Linked List Integer array, random distribution ,"+ totaltime);
funcRadixSortInteger(size10000,10000);
System.out.println();
System.out.println("radixSortInteger,10 ,Linked List  Integer array , ascending order ,"+ totaltime);
funcRadixSortInteger(size10Asc,10);
System.out.println("radixSortInteger,100 ,Linked List  Integer array , ascending order, "+ totaltime);
funcRadixSortInteger(size100Asc,100);
System.out.println("radixSortInteger,1000 ,Linked List  Integer array , ascending order ,"+ totaltime);
funcRadixSortInteger(size1000Asc,1000);
System.out.println("radixSortInteger,10000 ,Linked List  Integer array , ascending order ,"+ totaltime);
funcRadixSortInteger(size10000Asc,10000);
System.out.println();
System.out.println("radixSortInteger,10 ,Linked List  Integer array ,descending order ,"+ totaltime);
funcRadixSortInteger(size10Des,10);
System.out.println("radixSortInteger,100 ,Linked List  Integer array , descending order, "+ totaltime);
funcRadixSortInteger(size100Des,100);


System.out.println("radixSortInteger,1000 ,Linked List  Integer array , descending order, "+ totaltime);
funcRadixSortInteger(size1000Des,1000);

System.out.println("radixSortInteger,10000 ,Linked List  Integer array , descending order ,"+ totaltime);
funcRadixSortInteger(size10000Des,10000);

System.out.println();
System.out.println("radixSortInteger,10 , Linked List Integer array, idendical keys ,"+ totaltime);
funcRadixSortInteger(size10Ide,10);
System.out.println("radixSortInteger,100 ,Linked List Integer array, idendical keys ,"+ totaltime);
funcRadixSortInteger(size100Ide,100);
System.out.println("radixSortInteger,1000 ,Linked List Integer array, idendical keys, "+ totaltime);
funcRadixSortInteger(size1000Ide,1000);
System.out.println("radixSortInteger,10000 ,Linked List Integer array, idendical keys, "+ totaltime);
funcRadixSortInteger(size10000Ide,10000);
System.out.println();
System.out.println("radixSortInteger,10 ,Linked List Integer array, few duplicates ,"+ totaltime);
funcRadixSortInteger(size10FewDup,10);
System.out.println("radixSortInteger,100 , Linked List Integer array, few duplicates, "+ totaltime);
funcRadixSortInteger(size100FewDup,100);
System.out.println("radixSortInteger,1000 , Linked List Integer array, few duplicates ,"+ totaltime);
funcRadixSortInteger(size1000FewDup,1000);
System.out.println("radixSortInteger,10000 , Linked List Integer array, few duplicates, "+ totaltime);
funcRadixSortInteger(size10000FewDup,10000);
System.out.println();
System.out.println("radixSortInteger,10 , Linked List Integer array, some duplicates ,"+ totaltime);
funcRadixSortInteger(size10SomeDup,10);
System.out.println("radixSortInteger,100 , Linked List Integer array, some duplicates ,"+ totaltime);
funcRadixSortInteger(size100SomeDup,100);
System.out.println("radixSortInteger,1000 , Linked List Integer array, some duplicates ,"+ totaltime);
funcRadixSortInteger(size1000SomeDup,1000);

System.out.println("radixSortInteger,10000 , Linked List Integer array, some duplicates ,"+ totaltime);
funcRadixSortInteger(size10000SomeDup,10000);
System.out.println();
System.out.println("radixSortInteger,10 , Linked List Integer array, many duplicates ,"+ totaltime);
funcRadixSortInteger(size10ManyDup,10);
System.out.println("radixSortInteger,100 , Linked List Integer array, many duplicates ,"+ totaltime);
funcRadixSortInteger(size100ManyDup,100);
System.out.println("radixSortInteger,1000 , Linked List Integer array, many duplicates ,"+ totaltime);
funcRadixSortInteger(size1000ManyDup,1000);
System.out.println("radixSortInteger,10000 , Linked List Integer array, many duplicates ,"+ totaltime);
funcRadixSortInteger(size10000ManyDup,10000);
System.out.println();
System.out.println("radixSortInteger,10 , Linked List Integer array, slightly disordered ,"+ totaltime);
funcRadixSortInteger(size10SlightlyDis,10);
System.out.println("radixSortInteger,100 , Linked List Integer array, slightly disordered ,"+ totaltime);

funcRadixSortInteger(size100SlightlyDis,100);
System.out.println("radixSortInteger,1000 , Linked List Integer array, slightly disordered ,"+ totaltime);
funcRadixSortInteger(size1000SlightlyDis,1000);
System.out.println("radixSortInteger,10000 , Linked List Integer array, slightly disordered ,"+ totaltime);
funcRadixSortInteger(size10000SlightlyDis,10000);

// inssort
setupint();


callRadixMethodInt(int10,10);
System.out.println("radixInt, 10, int array,random distribution, " + totaltime);

callRadixMethodInt(int10Asc,10);
System.out.println("radixInt, 10, int array, ascending order, "+ totaltime);

callRadixMethodInt(int10Des,10);
System.out.println("radixInt, 10, int array, descending order, "+ totaltime);

callRadixMethodInt(int10Ide,10);
System.out.println("radixInt, 10, int array, idendical keys, "+ totaltime);

callRadixMethodInt(int10FewDup,10);
System.out.println("radixInt, 10, int array, Few Duplicates, "+ totaltime);

callRadixMethodInt(int10SomeDup,10);
System.out.println("radixInt, 10, int array, Some Duplicates, "+ totaltime);

callRadixMethodInt(int10ManyDup,10);
System.out.println("radixInt, 10, int array, Many Duplicates, "+ totaltime);

callRadixMethodInt(int10SlightlyDis,10);
System.out.println("radixInt, 10, int array, Slightly Distributed, "+ totaltime);

System.out.println();

callRadixMethodInt(int100,100);
System.out.println("radixInt, 100, int array, random distribution,  "+totaltime);

callRadixMethodInt(int100Asc,100);
System.out.println("radixInt, 100, int array, ascending order, "+ totaltime);

callRadixMethodInt(int100Des,100);
System.out.println("radixInt, 100, int array, descending order, "+ totaltime);

callRadixMethodInt(int100Ide,100);
System.out.println("radixInt, 100, int array, idendical keys, "+ totaltime);

callRadixMethodInt(int100FewDup,100);
System.out.println("radixInt, 100, int array, Few Duplicates, "+ totaltime);

callRadixMethodInt(int100SomeDup,100);
System.out.println("radixInt, 100, int array, Some Duplicates, "+ totaltime);

callRadixMethodInt(int100ManyDup,100);
System.out.println("radixInt, 100, int array, Many Duplicates, "+ totaltime);

callRadixMethodInt(int100SlightlyDis,100);
System.out.println("radixInt, 100, int array, Slightly Distributed, "+ totaltime);

System.out.println();

callRadixMethodInt(int1000,1000);
System.out.println("radixInt, 1000, int array, random distribution,  "+totaltime);

callRadixMethodInt(int1000Asc,1000);
System.out.println("radixInt, 1000, int array, ascending order, "+ totaltime);

callRadixMethodInt(int1000Des,1000);
System.out.println("radixInt, 1000, int array, descending order, "+ totaltime);

callRadixMethodInt(int1000Ide,1000);
System.out.println("radixInt, 1000, int array, idendical keys, "+ totaltime);

callRadixMethodInt(int1000FewDup,1000);
System.out.println("radixInt, 1000, int array, Few Duplicates, "+ totaltime);

callRadixMethodInt(int1000SomeDup,1000);
System.out.println("radixInt, 1000, int array, Some Duplicates, "+ totaltime);

callRadixMethodInt(int1000SlightlyDis,1000);
System.out.println("radixInt, 1000, int array, Many Duplicates, "+ totaltime);

callRadixMethodInt(int1000ManyDup,1000);
System.out.println("radixInt, 1000, int array, Slightly Distributed, "+ totaltime);

System.out.println();

callRadixMethodInt(int10000,10000);
System.out.println("radixInt, 10000, int array, random distribution,  "+totaltime);

callRadixMethodInt(int10000Asc,10000);
System.out.println("radixInt, 10000, int array, ascending order, "+ totaltime);

callRadixMethodInt(int10000Des,10000);
System.out.println("radixInt, 10000, int array, descending order, "+ totaltime);

callRadixMethodInt(int10000Ide,10000);
System.out.println("radixInt, 10000, int array, idendical keys, "+ totaltime);

callRadixMethodInt(int10000FewDup,10000);
System.out.println("radixInt, 10000, int array, few duplicates, "+ totaltime);

callRadixMethodInt(int10000SomeDup,10000);
System.out.println("radixInt, 10000, int array, some duplicates, "+ totaltime);

callRadixMethodInt(int10000SlightlyDis,10000);
System.out.println("radixInt, 1000, int array, Slightly Distributed, "+ totaltime);

callRadixMethodInt(int10000ManyDup,10000);
System.out.println("radixInt, 10000, int array, Many Duplicates, "+ totaltime);

System.out.println();

System.out.println();

}


/* *** ODSATag: Radixsort *** */
    static void radix(Integer[] A,int startpos, int length) {
        int k = (int) Math.log10(startpos+length-1) + 1; //digit number
        int r = 10;
        Integer[] B = new Integer[length];
        int[] count = new int[10];
        int i, j,l, rtok;
        for (i=0, rtok=1; i<k; i++, rtok*=r) {
            for (j=0; j<10; j++)
                count[j] = 0;
            for (j=startpos; j<startpos+length; j++)
                count[(A[j]/rtok)%r]++;
                count[0] = count[0] - 1;
            for (j=1; j<10; j++)
                count[j] = count[j-1] + count[j];
            for (j=startpos+length-1; j>=startpos; j--) {
                B[count[(A[j]/rtok)%r]] = A[j];
                count[(A[j]/rtok)%r]--;
            }
            for (j=startpos,l=0; j<startpos+length; j++,l++) A[j] = B[l];
        }
    }
/* *** ODSAendTag: Radixsort *** */


/* *** ODSATag: Radixsort *** */
    static void radixInt(int[] A,int startpos,int length) {

        int k = (int) Math.log10(startpos+length-1) + 1; //digit number
        int r = 10;
        int[] B = new int[length];
        int[] count = new int[10];
        int i, j,l, rtok;
        for (i=0, rtok=1; i<k; i++, rtok*=r) {
            for (j=0; j<10; j++)
                count[j] = 0;
            for (j=startpos; j<startpos+length; j++)
                count[(A[j]/rtok)%r]++;
                count[0] = count[0] - 1;
            for (j=1; j<10; j++)
                count[j] = count[j-1] + count[j];
            for (j=startpos+length-1; j>=startpos; j--) {
                B[count[(A[j]/rtok)%r]] = A[j];
                count[(A[j]/rtok)%r]--;
            }
            for (j=startpos,l=0; j<startpos+length; j++,l++) A[j] = B[l];
        }
    }

static void radixSortInteger(LinkedList<Integer> array,int startpos,int length)
{

int size = length;
int power = 1;
int value;

int digitNumber = (int) Math.log10(startpos+length-1) + 1;

for(int j=0; j<digitNumber;j++)
{

for(int k=0;k<length;k++)
{
bucket.get((array.get(k)/power)%10).add(array.get(k));
}
array.clear();

for(int l=0;l<10;l++)
{

for(int k=0;k<bucket.get(l).size();k++)
{
value = bucket.get(l).get(k);
array.add(value);
}

bucket.get(l).clear();

}
power = power*10;
}
}

public static void callRadixMethodInt(int[] array,int length){
totaltime = 0;
for (int runs=0; runs<TESTSIZE; runs+=length) {
time1 = millis();
radixInt(array,runs,length);
time2 = millis();
totaltime += (time2-time1);
}
totaltime = totaltime/(TESTSIZE/length);


}

public static void funcRadixSortInteger(Integer[] array,int length){


for(int z=0;z<10;z++){
    bucket.add(new LinkedList<Integer>());
}

totaltime = 0;
for (int runs=0; runs<TESTSIZE; runs+=length) {
    for(int z=runs; z<runs+length;z++)
        arrayList.add(array[z]);
    time1 = millis();
    radixSortInteger(arrayList,runs,length);
    time2 = millis();
    totaltime += (time2-time1);
    arrayList.clear();
}
totaltime = totaltime/(TESTSIZE/length);

bucket.clear();

//System.out.println("Total execution time for radix sort Linked List based : " + totaltime);

totaltime = 0;
for (int runs=0; runs<TESTSIZE; runs+=length) {
    time1 = millis();
    radix(array,runs,length);
    time2 = millis();
    totaltime += (time2-time1);
}
totaltime = totaltime/(TESTSIZE/length);

//System.out.println("Total execution time for radix sort Array based : " + totaltime);

System.out.println();





}

