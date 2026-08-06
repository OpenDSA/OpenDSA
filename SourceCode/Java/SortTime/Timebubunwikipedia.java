package build.bubunwikipedia;

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
public class Timebubunwikipedia {

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
    public int[] benchmarkbubunwikipedia() {
        /* ========== CALL THE SORT ============== */
        bubunwikipedia(arrayToSort);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Imitate Wikipedia article "optimization" to only swap up to the last swap seen,
    // but don't actually check for this. In other words, do a standard bubblesort,
    // but make sure that we are really comparing exact apples to apples with the
    // Wikipedia version.
    void bubunwikipedia(int[] A) {
        int n = A.length-1;
        while (n>0) {
            for (int i=0; i<n; i++) {
                /* if this pair is out of order */
                if (A[i] > A[i+1]) {
                    swap(A, i, i+1);
                }
            }
            n -= 1;
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timebubunwikipedia.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
