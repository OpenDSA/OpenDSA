package build.radixlinkopt;

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
public class Timeradixlinkopt {

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
    public int[] benchmarkradixlinkopt() {
        /* ========== CALL THE SORT ============== */
        radixlinkopt(arrayToSort, 4, 256);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Optimized radixsort using linked lists
    static void radixlinkopt(int[] A, int k, int r) {
        int[] B = new int[A.length];
        int[] bins = new int[r];         // List headers
        int[] tails = new int[r];        // List tails for appending
        int[] links = new int[A.length]; // The list links
        int i, j, rshift, shiftstep;

        // Compute the number of bits to shift on each step, from the input radix
        for(shiftstep=0; (r>>shiftstep)>1; shiftstep++);
        for (i=0, rshift=0; i<k; i++, rshift+=shiftstep) { // For k digits
            for (j=0; j<r; j++) bins[j] = -1;    // Initialize linked lists to empty
            for (j=0; j<r; j++) tails[j] = -1;    // Initialize tails
            for (j=0; j<A.length; j++) links[j] = -1; // Initialize links

            // Throw everyone onto a bin
            for (j=0; j<A.length; j++) {
                int digit = (A[j]>>rshift)%r;
                if (bins[digit] == -1) {
                    bins[digit] = j;
                    tails[digit] = j;
                }
                else {
                    tails[digit] = links[tails[digit]] = j;
                }
            }
            // Take them out of the bins and put back into an array
            int Bcurr = 0;
            for (j=0; j<r; j++) {
                for (int curr = bins[j]; curr != -1; curr = links[curr]) {
                    B[Bcurr++] = A[curr];
                }
            }
            // Copy the array back to prepare for the next step
            for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeradixlinkopt.class.getSimpleName())
            .jvmArgs("-Xint") // Force interpreted mode (no JIT)
            .forks(1)
            .shouldDoGC(true)
            .build();

        new Runner(opt).run();
    }
}
