
static void sorttime(){

// inssort
setupint();


QuickSort(int10,10);
System.out.println("QuickSort Time for lists of size 10: "+ totaltime);

QuickSort(int10Asc,10);
System.out.println("QuickSort Time for lists of size 10 in ascending order: "+ totaltime);

QuickSort(int10Des,10);
System.out.println("QuickSort Time for lists of size 10 in descending order: "+ totaltime);

QuickSort(int10Ide,10);
System.out.println("QuickSort Time for lists of size 10 idendical keys: "+ totaltime);

QuickSort(int10FewDup,10);
System.out.println("QuickSort Time for lists of size 10 Few Duplicates: "+ totaltime);

QuickSort(int10SomeDup,10);
System.out.println("QuickSort Time for lists of size 10 Some Duplicates: "+ totaltime);

QuickSort(int10ManyDup,10);
System.out.println("QuickSort Time for lists of size 10 Many Duplicates: "+ totaltime);

QuickSort(int10SlightlyDis,10);
System.out.println("QuickSort Time for lists of size 10 Slightly Distributed: "+ totaltime);

System.out.println();

QuickSort(int100,100);
System.out.println("QuickSort Time for lists of size 100: "+totaltime);

QuickSort(int100Asc,100);
System.out.println("QuickSort Time for lists of size 100 in ascending order: "+ totaltime);

QuickSort(int100Des,100);
System.out.println("QuickSort Time for lists of size 100 in descending order: "+ totaltime);

QuickSort(int100Ide,100);
System.out.println("QuickSort Time for lists of size 100 idendical keys: "+ totaltime);

QuickSort(int100FewDup,100);
System.out.println("QuickSort Time for lists of size 100 Few Duplicates: "+ totaltime);

QuickSort(int100SomeDup,100);
System.out.println("QuickSort Time for lists of size 100 Some Duplicates: "+ totaltime);

QuickSort(int100ManyDup,100);
System.out.println("QuickSort Time for lists of size 100 Many Duplicates: "+ totaltime);

QuickSort(int100SlightlyDis,100);
System.out.println("QuickSort Time for lists of size 100 Slightly Distributed: "+ totaltime);

System.out.println();

QuickSort(int1000,1000);
System.out.println("QuickSort Time for lists of size 1000: "+totaltime);

QuickSort(int1000Asc,1000);
System.out.println("QuickSort Time for lists of size 1000 in ascending order: "+ totaltime);

QuickSort(int1000Des,1000);
System.out.println("QuickSort Time for lists of size 1000 in descending order: "+ totaltime);

QuickSort(int1000Ide,1000);
System.out.println("QuickSort Time for lists of size 1000 idendical keys: "+ totaltime);

QuickSort(int1000FewDup,1000);
System.out.println("QuickSort Time for lists of size 1000 Few Duplicates: "+ totaltime);

QuickSort(int1000SomeDup,1000);
System.out.println("QuickSort Time for lists of size 1000 Some Duplicates: "+ totaltime);

QuickSort(int1000SlightlyDis,1000);
System.out.println("QuickSort Time for lists of size 1000 Slightly Distributed: "+ totaltime);

QuickSort(int1000ManyDup,1000);
System.out.println("QuickSort Time for lists of size 1000 Many Duplicates: "+ totaltime);

System.out.println();

QuickSort(int10000,10000);
System.out.println("QuickSort Time for lists of size 10000: "+totaltime);

QuickSort(int10000Asc,10000);
System.out.println("QuickSort Time for lists of size 10000 in ascending order: "+ totaltime);

QuickSort(int10000Des,10000);
System.out.println("QuickSort Time for lists of size 10000 in descending order: "+ totaltime);

QuickSort(int10000Ide,10000);
System.out.println("QuickSort Time for lists of size 10000 idendical keys: "+ totaltime);

QuickSort(int10000FewDup,10000);
System.out.println("QuickSort Time for lists of size 10000 Few Duplicates: "+ totaltime);

QuickSort(int10000SomeDup,10000);
System.out.println("QuickSort Time for lists of size 10000 Some Duplicates: "+ totaltime);

QuickSort(int10000SlightlyDis,10000);
System.out.println("QuickSort Time for lists of size 10000 Slightly Distributed: "+ totaltime);

QuickSort(int10000ManyDup,10000);
System.out.println("QuickSort Time for lists of size 10000 Many Duplicates: "+ totaltime);

System.out.println();



}


static void QuickSort(int[] B,int length){

// INPUT

int[] A = new int[length];
int numruns = 20;
int runs;

//System.out.println("Quick");
for (runs=0; runs<numruns; runs++) {
for (int i=0; i<length; i++) A[i] = B[i];
  	int low = 0;
	int high = length - 1;
 long startTime=System.nanoTime();

quickSort(A, low, high);
 long endTime   = System.nanoTime();
  totaltime += (endTime - startTime);

}
totaltime = totaltime/numruns;

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