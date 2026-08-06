package build.inssortinstrument;

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
public class Timeinssortinstrument {

    // JMH will run the benchmark for arrays of size 10, 100, and 1000
    @Param({"10", "100", "1000"})
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
    public int[] benchmarkinssortinstrument() {
        /* ========== CALL THE SORT ============== */
        inssortinstrument(arrayToSort);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    int swaps;
    int compares;

    void inssortinstrument(int[] A) {
        int j;
        swaps = 0;
        compares = 0;
        for (int i=1; i<A.length; i++) { // Insert i'th record
            for (j=i; (j>0) && (A[j] < A[j-1]); j--) {
                swaps++;
                compares++;
                swap(A, j, j-1);
            }
            if (j != 0) compares++;
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeinssortinstrument.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
