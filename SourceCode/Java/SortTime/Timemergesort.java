package build.mergesort;

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
public class Timemergesort {

    // JMH will run the benchmark for arrays of size 10 to 1,000,000
    @Param({"10", "100", "1000", "10000", "100000", "1000000"})
    private int testsize;

    @Param({"regular", "up", "down"})
    private String testtype;
    
    private int maxval = 1000000;

    private int[] originalArray;
    private int[] arrayToSort;
    private int[] temp;

    // Generated once per benchmark trial run
    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new int[testsize];
        temp =  new int[testsize];
        Random random = new Random(42); // Fixed seed makes tests reproducible
        if (testtype.equals("regular")) {
            for (int i = 0; i < testsize; i++) {
                originalArray[i] = random.nextInt(maxval);
            }
        }
        else if (testtype.equals("up")) {
            for (int i = 0; i < testsize; i++) {
                originalArray[i] = i + 1;
            }
        }
        else if (testtype.equals("down")) {
            for (int i = 0; i < testsize; i++) {
                originalArray[i] = maxval - i;
            }
        }
        else System.out.println("++++++++++++++++ ERROR!! BAD TEST TYPE!!");
    }

    // Generated right before every single iteration execution
    @Setup(Level.Invocation)
    public void copyArray() {
        // Crucial for sorting algorithms so we never benchmark an already-sorted array
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public int[] benchmarkmergesort() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        mergesort(arrayToSort, temp, 0, arrayToSort.length-1);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    void mergesort(int[] A, int[] temp, int left, int right) {
        if (left == right) { return; }       // List has one record
        int mid = (left+right)/2;          // Select midpoint
        mergesort(A, temp, left, mid);     // Mergesort first half
        mergesort(A, temp, mid+1, right);  // Mergesort second half
        for (int i=left; i<=right; i++) {    // Copy subarray to temp
            temp[i] = A[i];
        }
        // Do the merge operation back to A
        int i1 = left;
        int i2 = mid + 1;
        for (int curr = left; curr <= right; curr++) {
            if (i1 == mid+1) {                 // Left sublist exhausted
                A[curr] = temp[i2++];
            }
            else if (i2 > right) {             // Right sublist exhausted
                A[curr] = temp[i1++];
            }
            else if (temp[i1] < temp[i2]) {  // Get smaller value
                A[curr] = temp[i1++];
            }
            else {
                A[curr] = temp[i2++];
            }
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timemergesort.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
