
   public static void quickSortMedianOfThree(int[] intArray,int startpos,int length) {


        recQuickSort(intArray, startpos, startpos+length - 1);

}



    public static void quickSortMedianOfThreeInteger(Integer[] intArray,int startpos,int length) {


        recQuickSortInteger(intArray, startpos, startpos+length - 1);

    }


    public static void quickSortMedianOfThreeDouble(double[] intArray,int startpos,int length) {

        recQuickSortDouble(intArray, startpos, startpos+length - 1);

    }

    public static void recQuickSortInteger(Integer[] intArray, int left, int right) {
        int size = right - left + 1;
        if (size <= 3)
            manualSortInteger(intArray, left, right);
        else {
            double median = medianOf3Integer(intArray, left, right);
            int partition = partitionItInteger(intArray, left, right, median);
            recQuickSortInteger(intArray, left, partition - 1);
            recQuickSortInteger(intArray, partition + 1, right);
        }
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

    public static void recQuickSortDouble(double[] intArray, int left, int right) {
        int size = right - left + 1;
        if (size <= 3)
            manualSortDouble(intArray, left, right);
        else {
            double median = medianOf3Double(intArray, left, right);
            int partition = partitionItDouble(intArray, left, right, median);
            recQuickSortDouble(intArray, left, partition - 1);
            recQuickSortDouble(intArray, partition + 1, right);
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

    public static Integer medianOf3Integer(Integer[] intArray, int left, int right) {
        int center = (left + right) / 2;

        if (intArray[left].compareTo(intArray[center])>0)
            swapInteger(intArray, left, center);

        if (intArray[left].compareTo(intArray[right])>0)
            swap(intArray, left, right);

        if (intArray[center].compareTo(intArray[right])>0)
            swap(intArray, center, right);

        swapInteger(intArray, center, right - 1);
        return intArray[right - 1];
}

    public static double medianOf3Double(double[] intArray, int left, int right) {
        int center = (left + right) / 2;

        if (intArray[left] > intArray[center])
            swapDouble(intArray, left, center);

        if (intArray[left] > intArray[right])
            swapDouble(intArray, left, right);

        if (intArray[center] > intArray[right])
            swapDouble(intArray, center, right);

        swapDouble(intArray, center, right - 1);
        return intArray[right - 1];
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

    public static int partitionItDouble(double[] intArray, int left, int right, double pivot) {
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
                swapDouble(intArray, leftPtr, rightPtr);
            }
            swapDouble(intArray, leftPtr, right - 1);
            return leftPtr;
    }


    public static int partitionItInteger(Integer[] intArray, int left, int right, double pivot) {
        int leftPtr = left;
        int rightPtr = right - 1;

        while (true) {
            while (pivot > intArray[++leftPtr])
                ;
            while (intArray[--rightPtr] > pivot)
                ;
            if (leftPtr >= rightPtr)
                break;
            else
                swapInteger(intArray, leftPtr, rightPtr);
        }
        swapInteger(intArray, leftPtr, right - 1);
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



    public static void manualSortInteger(Integer[] intArray, int left, int right) {
        int size = right - left + 1;
        if (size <= 1)
            return;
        if (size == 2) {
            if (intArray[left].compareTo(intArray[right]) > 0)
            swapInteger(intArray, left, right);
            return;
        } else {
            if (intArray[left].compareTo(intArray[right-1]) > 0)
                swapInteger(intArray, left, right - 1);
            if (intArray[left].compareTo(intArray[right]) > 0)
                swapInteger(intArray, left, right);
            if (intArray[right-1].compareTo(intArray[right]) > 0)
                swapInteger(intArray, right - 1, right);
            }
        }



    public static void manualSortDouble(double[] intArray, int left, int right) {
        int size = right - left + 1;
        if (size <= 1)
            return;
        if (size == 2) {
            if (intArray[left] > intArray[right])
                swapDouble(intArray, left, right);
            return;
        } else {
            if (intArray[left] > intArray[right - 1])
                swapDouble(intArray, left, right - 1);
            if (intArray[left] > intArray[right])
                swapDouble(intArray, left, right);
            if (intArray[right - 1] > intArray[right])
                swapDouble(intArray, right - 1, right);
        }
    }

// -------------- Driver function. Invoke all of the sorts to be tested -----------------

static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging

//Quick sort median of three
System.out.println("Quick Sort Median of Three");
System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

if(dataType.equals("int"))
{
testsortallint("quickSortMedianOfThree", testsize);

}
else if(dataType.equals("Integer"))
{
testsortallInteger("quickSortMedianOfThreeInteger",testsize);

}
else if(dataType.equals("double"))
{
testsortallDouble("quickSortMedianOfThreeDouble",testsize);

}




}


