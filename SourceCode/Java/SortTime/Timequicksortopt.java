package build.quicksortopt;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@State(Scope.Thread)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Fork(1)
@Warmup(iterations = 2, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
public class Timequicksortopt {

    // JMH will run the benchmark for arrays of size 10 to 1,000,000
    @Param({"10", "100", "1000", "10000", "100000", "1000000"})
    private int testsize;
    private int maxval = 1000000;

    private int[] originalArray;
    private int[] arrayToSort;
    int THRESHOLD = 200;
    // Generated once per benchmark trial run
    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new int[testsize];
        Random random = new Random(42); // Fixed seed makes tests reproducible
        for (int i = 0; i < testsize; i++) {
            originalArray[i] = random.nextInt(maxval);
        }
    }

    @Setup(Level.Trial) // Runs ONCE before the entire benchmark trial starts
    public void doSetup() {
        System.out.println("====== Setup: Threshold is: " + THRESHOLD + " ======");
    }

    // Generated right before every single iteration execution
    @Setup(Level.Invocation)
    public void copyArray() {
        // Crucial for sorting algorithms so we never benchmark an already-sorted array
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public int[] benchmarkquicksortopt() {
        /* ========== CALL THE SORT ============== */
        quicksortopt(arrayToSort, 0, arrayToSort.length-1);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Insertion sort used by optimized quicksort
    // Integer-only version
    // Instead of swapping, "shift" the values down the array
    void inssortshiftint(int[] A) {
        for (int i=1; i<A.length; i++) { // Insert i'th record
            int j;
            int temp = A[i];
            for (j=i; (j>0) && (temp < A[j-1]); j--)
                A[j] = A[j-1];
            A[j] = temp;
        }
    }


    int MAXSTACKSIZE = 50;

    // Optimized Quicksort: Not recursive, and uses
    // shifting insertionsort for small lists 
    // This version uses primitive integer values for the records
    void quicksortopt(int[] A, int oi, int oj) { // Quicksort
        int[] Stack = new int[MAXSTACKSIZE]; // Stack for array bounds
        int top = -1;
        int pivot;
        int pivotindex, l, r;
        Stack[++top] = oi;  // Initialize stack
        Stack[++top] = oj;

        while (top > 0) {   // While there are unprocessed subarrays
            // Pop Stack
            int j = Stack[top--];
            int i = Stack[top--];

            // Findpivot
            pivotindex = (i+j)/2;
            pivot = A[pivotindex];
            swap(A, pivotindex, j); // Stick pivot at end

            // Partition
            l = i-1;
            r = j;
            do {
                while (A[++l] < pivot);
                while ((r!=0) && (A[--r] > pivot));
                swap(A, l, r);
            } while (l < r);
            swap(A, l, r);  // Undo final swap
            swap(A, l, j);  // Put pivot value in place

            // Put new subarrays onto Stack if they are small
            if ((l-i) > THRESHOLD) {   // Left partition
                Stack[++top] = i;
                Stack[++top] = l-1;
            }
            if ((j-l) > THRESHOLD) {   // Right partition
                Stack[++top] = l+1;
                Stack[++top] = j;
            }
        }
        inssortshiftint(A);             // Final Insertion Sort
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timequicksortopt.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
