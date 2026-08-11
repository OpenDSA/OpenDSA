package build.selsortcheck;

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
public class Timeselsortcheck {

    // JMH will run the benchmark for arrays of size 10, 100, and 1000
    @Param({"10000"})
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
    public int[] benchmarkselsortcheck() {
        /* ========== CALL THE SORT ============== */
        selsortcheck(arrayToSort);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Same as selsort, but check if the swap is necessary
    void selsortcheck(int[] A) {
        for (int i=0; i<A.length-1; i++) { // Select i'th biggest record
            int bigindex = 0;                // Current biggest index
            for (int j=1; j<A.length-i; j++) { // Find the max value
                if (A[j] > A[bigindex])        // Found something bigger  
                    bigindex = j;                // Remember bigger index
            }
            if (bigindex != A.length-i-1)
                swap(A, bigindex, A.length-i-1); // Put it into place
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeselsortcheck.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
