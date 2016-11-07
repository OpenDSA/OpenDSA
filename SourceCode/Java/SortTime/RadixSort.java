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

public static void callRadixMethodInt(int[] array,int startpos,int length){
radixInt(array,startpos,length);

}

public static void funcRadixSortInteger(Integer[] array,int startpos,int length){


for(int z=0;z<10;z++){
    bucket.add(new LinkedList<Integer>());
}


    for(int z=startpos; z<startpos+length;z++)
        arrayList.add(array[z]);
    radixSortInteger(arrayList,startpos,length);
       arrayList.clear();

bucket.clear();


System.out.println();





}

// -------------- Driver function. Invoke all of the sorts to be tested -----------------

static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging

//bubble sort
System.out.println("Radix Sort");
System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

if(dataType.equals("int"))
{
testsortallint("callRadixMethodInt", testsize);

}
else if(dataType.equals("Integer"))
{
testsortallInteger("funcRadixSortInteger",testsize);
testsortallInteger("radix",testsize);


}


}
