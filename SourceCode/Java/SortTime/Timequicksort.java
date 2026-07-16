package build.quicksort;

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
public class Timequicksort {

    // JMH will run the benchmark for arrays of size 10 to 1,000,000
    @Param({"10", "100", "1000", "10000", "100000", "1000000"})
    private int testsize;
    private int maxval = 1000000;

    private int[] originalArray;
    private int[] arrayToSort;

    // Generated once per benchmark trial run
    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new int[testsize];
        Random random = new Random(42); // Fixed seed makes tests reproducible
        for (int i = 0; i < testsize; i++) {
            originalArray[i] = random.nextInt(maxval);
        }
    }

    // Generated right before every single iteration execution
    @Setup(Level.Invocation)
    public void copyArray() {
        // Crucial for sorting algorithms so we never benchmark an already-sorted array
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public int[] benchmarkquicksort() {
        /* ========== CALL THE SORT ============== */
        quicksort(arrayToSort, 0, arrayToSort.length-1);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    /* Warning: Partition is sensitive. If we don't make the right
       position actually cross the left, then it seems hard to get things
       to work right when there is only one element in the partition
       (i.e., a list of 2 elements). */
    int partition(int[] A, int left, int right, int pivot) {
        while (left <= right) { // Move bounds inward until they meet
            while (A[left] < pivot) { left++; }
            while ((right >= left) && (A[right] >= pivot)) { right--; }
            if (right > left) { swap(A, left, right); } // Swap out-of-place values
        }
        return left;            // Return first position in right partition
    }

    int findpivot(int[] A, int i, int j)
    { return (i+j)/2; }

    void quicksort(int[] A, int i, int j) { // Quicksort
        int pivotindex = findpivot(A, i, j);  // Pick a pivot
        swap(A, pivotindex, j);               // Stick pivot at end
        // k will be the first position in the right subarray
        int k = partition(A, i, j-1, A[j]);
        swap(A, k, j);                        // Put pivot in place
        if ((k-i) > 1) { quicksort(A, i, k-1); }  // Sort left partition
        if ((j-k) > 1) { quicksort(A, k+1, j); }  // Sort right partition
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timequicksort.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
