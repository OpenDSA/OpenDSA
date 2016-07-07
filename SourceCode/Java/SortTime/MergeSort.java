
static void sorttime(){
// inssort
setupint();


mergeSort(int10,10);
System.out.println("mergeSort Time for lists of size 10: "+ totaltime);

mergeSort(int10Asc,10);
System.out.println("mergeSort Time for lists of size 10 in ascending order: "+ totaltime);

mergeSort(int10Des,10);
System.out.println("mergeSort Time for lists of size 10 in descending order: "+ totaltime);

mergeSort(int10Ide,10);
System.out.println("mergeSort Time for lists of size 10 idendical keys: "+ totaltime);

mergeSort(int10FewDup,10);
System.out.println("mergeSort Time for lists of size 10 Few Duplicates: "+ totaltime);

mergeSort(int10SomeDup,10);
System.out.println("mergeSort Time for lists of size 10 Some Duplicates: "+ totaltime);

mergeSort(int10ManyDup,10);
System.out.println("mergeSort Time for lists of size 10 Many Duplicates: "+ totaltime);

mergeSort(int10SlightlyDis,10);
System.out.println("mergeSort Time for lists of size 10 Slightly Distributed: "+ totaltime);

System.out.println();

mergeSort(int100,100);
System.out.println("mergeSort Time for lists of size 100: "+totaltime);

mergeSort(int100Asc,100);
System.out.println("mergeSort Time for lists of size 100 in ascending order: "+ totaltime);

mergeSort(int100Des,100);
System.out.println("mergeSort Time for lists of size 100 in descending order: "+ totaltime);

mergeSort(int100Ide,100);
System.out.println("mergeSort Time for lists of size 100 idendical keys: "+ totaltime);

mergeSort(int100FewDup,100);
System.out.println("mergeSort Time for lists of size 100 Few Duplicates: "+ totaltime);

mergeSort(int100SomeDup,100);
System.out.println("mergeSort Time for lists of size 100 Some Duplicates: "+ totaltime);

mergeSort(int100ManyDup,100);
System.out.println("mergeSort Time for lists of size 100 Many Duplicates: "+ totaltime);

mergeSort(int100SlightlyDis,100);
System.out.println("mergeSort Time for lists of size 100 Slightly Distributed: "+ totaltime);

System.out.println();

mergeSort(int1000,1000);
System.out.println("mergeSort Time for lists of size 1000: "+totaltime);

mergeSort(int1000Asc,1000);
System.out.println("mergeSort Time for lists of size 1000 in ascending order: "+ totaltime);

mergeSort(int1000Des,1000);
System.out.println("mergeSort Time for lists of size 1000 in descending order: "+ totaltime);

mergeSort(int1000Ide,1000);
System.out.println("mergeSort Time for lists of size 1000 idendical keys: "+ totaltime);

mergeSort(int1000FewDup,1000);
System.out.println("mergeSort Time for lists of size 1000 Few Duplicates: "+ totaltime);

mergeSort(int1000SomeDup,1000);
System.out.println("mergeSort Time for lists of size 1000 Some Duplicates: "+ totaltime);

mergeSort(int1000SlightlyDis,1000);
System.out.println("mergeSort Time for lists of size 1000 Slightly Distributed: "+ totaltime);

mergeSort(int1000ManyDup,1000);
System.out.println("mergeSort Time for lists of size 1000 Many Duplicates: "+ totaltime);

System.out.println();

mergeSort(int10000,10000);
System.out.println("mergeSort Time for lists of size 10000: "+totaltime);

mergeSort(int10000Asc,10000);
System.out.println("mergeSort Time for lists of size 10000 in ascending order: "+ totaltime);

mergeSort(int10000Des,10000);
System.out.println("mergeSort Time for lists of size 10000 in descending order: "+ totaltime);

mergeSort(int10000Ide,10000);
System.out.println("mergeSort Time for lists of size 10000 idendical keys: "+ totaltime);

mergeSort(int10000FewDup,10000);
System.out.println("mergeSort Time for lists of size 10000 Few Duplicates: "+ totaltime);

mergeSort(int10000SomeDup,10000);
System.out.println("mergeSort Time for lists of size 10000 Some Duplicates: "+ totaltime);

mergeSort(int10000SlightlyDis,10000);
System.out.println("mergeSort Time for lists of size 10000 Slightly Distributed: "+ totaltime);

mergeSort(int10000ManyDup,10000);
System.out.println("mergeSort Time for lists of size 10000 Many Duplicates: "+ totaltime);

System.out.println();



}
	public static void mergeSort(int a[ ],int length)
	{

		int [] tmp = new int[length];

        int[] b = new int[length];
        int numruns = 20;
        int runs;
        for (runs=0; runs<numruns; runs++) {
            for (int i=0; i<length; i++) b[i] = a[i];
        long startTime=System.nanoTime();
		mergeSort(b, tmp,  0,  length - 1);
        long endTime   = System.nanoTime();
         totaltime += (endTime - startTime);
        }
            totaltime = totaltime/numruns;
	}

	private static void mergeSort(int a[ ], int tmp[ ], int left, int right)
	{
		if( left < right )
		{
			int center = (left + right) / 2;
			mergeSort(a, tmp, left, center);
			mergeSort(a, tmp, center + 1, right);
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
  