static void sorttime(){

System.out.println();

setupInteger();
System.out.println();

System.out.println("10 size Integer array, random distribution ");
funcRadixSortInteger(size10,10);
System.out.println("100 size Integer array, random distribution ");
funcRadixSortInteger(size100,100);
System.out.println("1000 size Integer array, random distribution ");
funcRadixSortInteger(size1000,1000);
System.out.println("10000 size Integer array, random distribution ");
funcRadixSortInteger(size10000,10000);
System.out.println();
System.out.println("10 size Integer array in ascending order ");
funcRadixSortInteger(size10Asc,10);
System.out.println("100 size Integer array in ascending order ");
funcRadixSortInteger(size100Asc,100);
System.out.println("1000 size Integer array in ascending order ");
funcRadixSortInteger(size1000Asc,1000);
System.out.println("10000 size Integer array in ascending order ");
funcRadixSortInteger(size10000Asc,10000);
System.out.println();
System.out.println("10 size Integer array in descending order ");
funcRadixSortInteger(size10Des,10);
System.out.println("100 size Integer array in descending order ");
funcRadixSortInteger(size100Des,100);
System.out.println("1000 size Integer array in descending order ");
funcRadixSortInteger(size1000Des,1000);
System.out.println("10000 size Integer array in descending order ");
funcRadixSortInteger(size10000Des,10000);
System.out.println();
System.out.println("10 size Integer array, idendical keys ");
funcRadixSortInteger(size10Ide,10);
System.out.println("100 size Integer array, idendical keys ");
funcRadixSortInteger(size100Ide,100);
System.out.println("1000 size Integer array, idendical keys ");
funcRadixSortInteger(size1000Ide,1000);
System.out.println("10000 size Integer array, idendical keys ");
funcRadixSortInteger(size10000Ide,10000);
System.out.println();
System.out.println("10 size Integer array, few duplicates ");
funcRadixSortInteger(size10FewDup,10);
System.out.println("100 size Integer array, few duplicates ");
funcRadixSortInteger(size100FewDup,100);
System.out.println("1000 size Integer array, few duplicates ");
funcRadixSortInteger(size1000FewDup,1000);
System.out.println("10000 size Integer array, few duplicates ");
funcRadixSortInteger(size10000FewDup,10000);
System.out.println();
System.out.println("10 size Integer array, some duplicates ");
funcRadixSortInteger(size10SomeDup,10);
System.out.println("100 size Integer array, some duplicates ");
funcRadixSortInteger(size100SomeDup,100);
System.out.println("1000 size Integer array, some duplicates ");
funcRadixSortInteger(size1000SomeDup,1000);

System.out.println("10000 size Integer array, some duplicates ");
funcRadixSortInteger(size10000SomeDup,10000);
System.out.println();
System.out.println("10 size Integer array, many duplicates ");
funcRadixSortInteger(size10ManyDup,10);
System.out.println("100 size Integer array, many duplicates ");
funcRadixSortInteger(size100ManyDup,100);
System.out.println("1000 size Integer array, many duplicates ");
funcRadixSortInteger(size1000ManyDup,1000);
System.out.println("10000 size Integer array, many duplicates ");
funcRadixSortInteger(size10000ManyDup,10000);
System.out.println();
System.out.println("10 size Integer array, slightly disordered ");
funcRadixSortInteger(size10SlightlyDis,10);
System.out.println("100 size Integer array, slightly disordered ");
funcRadixSortInteger(size100SlightlyDis,100);
System.out.println("1000 size Integer array, slightly disordered ");
funcRadixSortInteger(size1000SlightlyDis,1000);
System.out.println("10000 size Integer array, slightly disordered ");
funcRadixSortInteger(size10000SlightlyDis,10000);


}


/* *** ODSATag: Radixsort *** */
    static void radix(Integer[] A,int length) {

        int k = (int) Math.log10(length) + 1;
        int r = length;
        Integer[] B = new Integer[A.length];
        int[] count = new int[length];
        int i, j, rtok;
        for (i=0, rtok=1; i<k; i++, rtok*=r) {
            for (j=0; j<r; j++)
                count[j] = 0;
            for (j=0; j<A.length; j++)
                count[(A[j]/rtok)%r]++;
                count[0] = count[0] - 1;
            for (j=1; j<r; j++)
                count[j] = count[j-1] + count[j];
            for (j=A.length-1; j>=0; j--) {
                B[count[(A[j]/rtok)%r]] = A[j];
                count[(A[j]/rtok)%r]--;
            }
        for (j=0; j<A.length; j++) A[j] = B[j];
        }
    }
/* *** ODSAendTag: Radixsort *** */


static void radixSortInteger(LinkedList<Integer> array,int length)
{

int size = array.size();
int power = 1;
int value;

int digitNumber = (int) Math.log10(length) + 1;
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

public static void funcRadixSortInteger(Integer[] array,int length){


Integer[] arrayTemp = new Integer[length];


for(int z=0;z<10;z++){

bucket.add(new LinkedList<Integer>());

}

totaltime = 0;
for (int runs=0; runs<20; runs++) {
    for(int z=0; z<length;z++)
        arrayList.add(array[z]);
    time1 = millis();
    radixSortInteger(arrayList,length);
    time2 = millis();
    totaltime += (time2-time1);
    arrayList.clear();
}
totaltime = totaltime/20;

bucket.clear();

System.out.println("Total execution time for radix sort Linked List based : " + totaltime);

totaltime = 0;
for (int runs=0; runs<20; runs++) {
    for(int z=0; z<length;z++)
    arrayTemp[z] = array[z];
    time1 = millis();
    radix(arrayTemp,length);
    time2 = millis();
    totaltime += (time2-time1);
}
totaltime = totaltime/20;

System.out.println("Total execution time for radix sort Array based : " + totaltime);

System.out.println();





}

