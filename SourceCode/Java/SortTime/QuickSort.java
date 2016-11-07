static void QuickSortDouble(double[] B,int startpos,int length){


int low = startpos;
int high = startpos+length - 1;
quickSortDouble(B, low, high);

}


static void QuickSortInteger(Integer[] B,int startpos,int length){



int low = startpos;
int high = startpos+length - 1;
quickSortInteger(B, low, high);

}

public static void quickSortInteger(Integer[] arr, int low, int high) {

if (arr == null || arr.length == 0)
return;

if (low >= high)
return;

//pick the pivot
int middle = low + (high - low) / 2;
Integer pivot = arr[middle];

//make left < pivot and right > pivot
int i = low, j = high;
while (i <= j) {
while (pivot.compareTo(arr[i]) > 0) {
i++;
}

while (arr[j].compareTo(pivot) > 0) {
j--;
}

if (i <= j) {
Integer temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
i++;
j--;
}
}

//recursively sort two sub parts
if (low < j)
quickSortInteger(arr, low, j);

if (high > i)
quickSortInteger(arr, i, high);
}


static void QuickSort(int[] B,int startpos,int length){

  	int low = startpos;
	int high = startpos+length - 1;
    quickSort(B, low, high);
}


public static void quickSortDouble(double[] arr, int low, int high) {

if (arr == null || arr.length == 0)
return;

if (low >= high)
return;

//pick the pivot
int middle = low + (high - low) / 2;
double pivot = arr[low];

//make left < pivot and right > pivot
int i = low, j = high;
while (i <= j) {
while (arr[i] < pivot) {
i++;
}

while (arr[j] > pivot) {
j--;
}

if (i <= j) {
double temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
i++;
j--;
}
}

//recursively sort two sub parts
if (low < j)
quickSortDouble(arr, low, j);

if (high > i)
quickSortDouble(arr, i, high);
}


	public static void quickSort(int[] arr, int low, int high) {

		if (arr == null || arr.length == 0)
			return;

		if (low >= high)
			return;

		//pick the pivot
		int middle = low + (high - low) / 2;
		int pivot = arr[low];

		//make left < pivot and right > pivot
		int i = low, j = high;
		while (i <= j) {
			while (arr[i] < pivot) {
				i++;
			}

			while (arr[j] > pivot) {
				j--;
			}

			if (i <= j) {
				int temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
				i++;
				j--;
			}
		}

		//recursively sort two sub parts
		if (low < j)
			quickSort(arr, low, j);

		if (high > i)
			quickSort(arr, i, high);
	}



// -------------- Driver function. Invoke all of the sorts to be tested -----------------

static void sorttime(String arraySize,String dataType) {
Integer temporaryValue = Integer.parseInt(arraySize);
int testsize = temporaryValue.intValue(); // Put this here so that we can easily control the size for debugging



//Quick sort
System.out.println("Quick Sort");
System.out.println("Method Name,  Array Type, Array Size,Data Distribution,Time");

if(dataType.equals("int"))
{
testsortallint("QuickSort", testsize);

}
else if(dataType.equals("Integer"))
{
testsortallInteger("QuickSortInteger",testsize);

}
else if(dataType.equals("double"))
{
testsortallDouble("QuickSortDouble",testsize);

}





}