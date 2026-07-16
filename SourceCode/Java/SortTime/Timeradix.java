package build.radix;

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
@Warmup(iterations = 3, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
public class Timeradix {

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
    public int[] benchmarkradix() {
        /* ========== CALL THE SORT ============== */
        radix(arrayToSort, 4, 256);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    static void radix(int[] A, int k, int r) {
        int[] B = new int[A.length];
        int[] count = new int[r];     // Count[i] stores number of records with digit value i
        int i, j, rtok;

        for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
            for (j=0; j<r; j++) { count[j] = 0; }    // Initialize count

            // Count the number of records for each bin on this pass
            for (j=0; j<A.length; j++) { count[(A[j]/rtok)%r]++; }

            // After processing, count[j] will be index in B for first slot of bin j.
            int total = A.length;
            for (j=r-1; j>=0; j--) { total -= count[j]; count[j] = total; }

            // Put records into bins, working from left to right
            for (j=0; j<A.length; j++) {
                B[count[(A[j]/rtok)%r]] = A[j];
                count[(A[j]/rtok)%r] = count[(A[j]/rtok)%r] + 1;
            }
            for (j=0; j<A.length; j++) { A[j] = B[j]; } // Copy B back
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeradix.class.getSimpleName())
            .jvmArgs("-Xint") // Force interpreted mode (no JIT)
            .forks(1)
            .shouldDoGC(true)
            .build();

        new Runner(opt).run();
    }
}
