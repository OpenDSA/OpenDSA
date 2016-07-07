
public static void sorttime(){


// inssort
setupint();


quickSortMedianOfThree(int10,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10: "+ totaltime);

quickSortMedianOfThree(int10Asc,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 in ascending order: "+ totaltime);

quickSortMedianOfThree(int10Des,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 in descending order: "+ totaltime);

quickSortMedianOfThree(int10Ide,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 idendical keys: "+ totaltime);

quickSortMedianOfThree(int10FewDup,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 Few Duplicates: "+ totaltime);

quickSortMedianOfThree(int10SomeDup,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 Some Duplicates: "+ totaltime);

quickSortMedianOfThree(int10ManyDup,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 Many Duplicates: "+ totaltime);

quickSortMedianOfThree(int10SlightlyDis,10);
System.out.println("quickSortMedianOfThree Time for lists of size 10 Slightly Distributed: "+ totaltime);

System.out.println();

quickSortMedianOfThree(int100,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100: "+totaltime);

quickSortMedianOfThree(int100Asc,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 in ascending order: "+ totaltime);

quickSortMedianOfThree(int100Des,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 in descending order: "+ totaltime);

quickSortMedianOfThree(int100Ide,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 idendical keys: "+ totaltime);

quickSortMedianOfThree(int100FewDup,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 Few Duplicates: "+ totaltime);

quickSortMedianOfThree(int100SomeDup,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 Some Duplicates: "+ totaltime);

quickSortMedianOfThree(int100ManyDup,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 Many Duplicates: "+ totaltime);

quickSortMedianOfThree(int100SlightlyDis,100);
System.out.println("quickSortMedianOfThree Time for lists of size 100 Slightly Distributed: "+ totaltime);

System.out.println();

quickSortMedianOfThree(int1000,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000: "+totaltime);

quickSortMedianOfThree(int1000Asc,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 in ascending order: "+ totaltime);

quickSortMedianOfThree(int1000Des,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 in descending order: "+ totaltime);

quickSortMedianOfThree(int1000Ide,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 idendical keys: "+ totaltime);

quickSortMedianOfThree(int1000FewDup,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 Few Duplicates: "+ totaltime);

quickSortMedianOfThree(int1000SomeDup,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 Some Duplicates: "+ totaltime);

quickSortMedianOfThree(int1000SlightlyDis,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 Slightly Distributed: "+ totaltime);

quickSortMedianOfThree(int1000ManyDup,1000);
System.out.println("quickSortMedianOfThree Time for lists of size 1000 Many Duplicates: "+ totaltime);

System.out.println();

quickSortMedianOfThree(int10000,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000: "+totaltime);

quickSortMedianOfThree(int10000Asc,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 in ascending order: "+ totaltime);

quickSortMedianOfThree(int10000Des,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 in descending order: "+ totaltime);

quickSortMedianOfThree(int10000Ide,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 idendical keys: "+ totaltime);

quickSortMedianOfThree(int10000FewDup,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 Few Duplicates: "+ totaltime);

quickSortMedianOfThree(int10000SomeDup,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 Some Duplicates: "+ totaltime);

quickSortMedianOfThree(int10000SlightlyDis,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 Slightly Distributed: "+ totaltime);

quickSortMedianOfThree(int10000ManyDup,10000);
System.out.println("quickSortMedianOfThree Time for lists of size 10000 Many Duplicates: "+ totaltime);

System.out.println();


}



   public static void quickSortMedianOfThree(int[] intArray,int length) {

    long startTime,endTime;

    // INPUT

    int[] A = new int[length];
    int numruns = 20;
    int runs;

    System.out.println("Quick - Median of Three");
    for (runs=0; runs<numruns; runs++) {
    for (i=0; i<length; i++) A[i] = intArray[i];
        startTime=System.nanoTime();
        recQuickSort(A, 0, length - 1);
        endTime   = System.nanoTime();
        totalTime =+ (endTime - startTime);
    }
    totaltime = totaltime/numruns;
    System.out.print(totalTime);
}

  public static void recQuickSort(int[] intArray, int left, int right) {
    int size = right - left + 1;
    if (size <= 3)
      manualSort(intArray, left, right);
    else {
      double median = medianOf3(intArray, left, right);
      int partition = partitionIt(intArray, left, right, median);
      recQuickSort(intArray, left, partition - 1);
      recQuickSort(intArray, partition + 1, right);
    }
  }
  public static int medianOf3(int[] intArray, int left, int right) {
    int center = (left + right) / 2;

    if (intArray[left] > intArray[center])
      swap(intArray, left, center);

    if (intArray[left] > intArray[right])
      swap(intArray, left, right);

    if (intArray[center] > intArray[right])
      swap(intArray, center, right);

    swap(intArray, center, right - 1);
    return intArray[right - 1];
  }

  public static void swap(int[] intArray, int dex1, int dex2) {
    int temp = intArray[dex1];
    intArray[dex1] = intArray[dex2];
    intArray[dex2] = temp;
  }

  public static int partitionIt(int[] intArray, int left, int right, double pivot) {
    int leftPtr = left;
    int rightPtr = right - 1;

    while (true) {
      while (intArray[++leftPtr] < pivot)
        ;
      while (intArray[--rightPtr] > pivot)
        ;
      if (leftPtr >= rightPtr)
        break;
      else
        swap(intArray, leftPtr, rightPtr);
    }
    swap(intArray, leftPtr, right - 1);
    return leftPtr;
  }

  public static void manualSort(int[] intArray, int left, int right) {
    int size = right - left + 1;
    if (size <= 1)
      return;
    if (size == 2) {
      if (intArray[left] > intArray[right])
        swap(intArray, left, right);
      return;
    } else {
      if (intArray[left] > intArray[right - 1])
        swap(intArray, left, right - 1);
      if (intArray[left] > intArray[right])
        swap(intArray, left, right);
      if (intArray[right - 1] > intArray[right])
        swap(intArray, right - 1, right);
    }
  }






