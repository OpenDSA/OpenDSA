public static void mergeSortInteger(Integer a[ ],int startpos,int length)
{

Integer [] tmp = new Integer[TESTSIZE];


MergeSortInteger(a, tmp,  startpos,  startpos+length - 1);

}

private static void MergeSortInteger(Integer a[ ], Integer tmp[ ], int left, int right)
{
if( left < right )
{
int center = (left + right) / 2;
MergeSortInteger(a, tmp, left, center);
MergeSortInteger(a, tmp, center + 1, right);
Merge(a, tmp, left, center + 1, right);
}
}

private static void Merge(Integer a[ ],Integer tmp[ ], int left, int right, int rightEnd )
{
int leftEnd = right - 1;
int k = left;
int num = rightEnd - left + 1;

while(left <= leftEnd && right <= rightEnd)
if(a[left] <= a[right])
tmp[k++] = a[left++];
else
tmp[k++] = a[right++];

while(left <= leftEnd)    // Copy rest of first half
tmp[k++] = a[left++];

while(right <= rightEnd)  // Copy rest of right half
tmp[k++] = a[right++];

// Copy tmp back
for(int i = 0; i < num; i++, rightEnd--)
a[rightEnd] = tmp[rightEnd];
}


	public static void mergeSort(int a[ ],int startpos,int length)
	{

		int [] tmp = new int[TESTSIZE];

		MergeSort(a, tmp,  startpos,  startpos+length - 1);

	}

	private static void MergeSort(int a[ ], int tmp[ ], int left, int right)
	{
		if( left < right )
		{
			int center = (left + right) / 2;
			MergeSort(a, tmp, left, center);
			MergeSort(a, tmp, center + 1, right);
			merge(a, tmp, left, center + 1, right);
		}
	}


    private static void merge(int a[ ],int tmp[ ], int left, int right, int rightEnd )
    {
        int leftEnd = right - 1;
        int k = left;
        int num = rightEnd - left + 1;

        while(left <= leftEnd && right <= rightEnd)
            if(a[left] <= a[right])
                tmp[k++] = a[left++];
            else
                tmp[k++] = a[right++];

        while(left <= leftEnd)    // Copy rest of first half
            tmp[k++] = a[left++];

        while(right <= rightEnd)  // Copy rest of right half
            tmp[k++] = a[right++];

        // Copy tmp back
        for(int i = 0; i < num; i++, rightEnd--)
            a[rightEnd] = tmp[rightEnd];
    }


public static void mergeSortDouble(double a[ ],int startpos,int length)
{

double [] tmp = new double[TESTSIZE];


MergeSortDouble(a, tmp,  startpos, startpos + length - 1);

}

private static void MergeSortDouble(double a[ ], double tmp[ ], int left, int right)
{
if( left < right )
{
int center = (left + right) / 2;
MergeSortDouble(a, tmp, left, center);
MergeSortDouble(a, tmp, center + 1, right);
MergeDouble(a, tmp, left, center + 1, right);
}
}

private static void MergeDouble(double a[ ],double tmp[ ], int left, int right, int rightEnd )
{
int leftEnd = right - 1;
int k = left;
int num = rightEnd - left + 1;

while(left <= leftEnd && right <= rightEnd)
if(a[left] <= a[right])
tmp[k++] = a[left++];
else
tmp[k++] = a[right++];

while(left <= leftEnd)    // Copy rest of first half
tmp[k++] = a[left++];

while(right <= rightEnd)  // Copy rest of right half
tmp[k++] = a[right++];

// Copy tmp back
for(int i = 0; i < num; i++, rightEnd--)
a[rightEnd] = tmp[rightEnd];
}


// -------------- Driver function. Invoke all of the sorts to be tested -----------------


static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging



//merge sort
System.out.println("Merge Sort");
System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

if(dataType.equals("int"))
{
testsortallint("mergeSort", testsize);
}
else if(dataType.equals("Integer"))
{
testsortallInteger("mergeSortInteger",testsize);

}
else if(dataType.equals("double"))
{
testsortallDouble("mergeSortDouble",testsize);

}


}