package build.radixopt;

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

public class Timeradixopt {

    static Boolean checkorder(int[] A) {
        for (int i=1; i<A.length; i++)
            if (A[i] < A[i-1]) {
                return false;
            }
        return true;
    }

    // JMH will run the benchmark for arrays of size 10 to 1,000,000
    @Param({"10", "100", "1000", "10000", "100000", "1000000"})
    private int testsize;

    @Param({"regular", "up", "down"})
    private String testtype;
    
    private int maxval = 1000000;

    private int[] originalArray;
    private int[] arrayToSort;

    // Generated once per benchmark trial run
    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new int[testsize];
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
    public int[] benchmarkradixopt() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        radixopt(arrayToSort, 4, 256);
        //        if (!checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY DID NOT SORT PROPERLY!!");
        //        }
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // This version of Radixsort assumes a 32 bit integer key, shifted by
    // some number of bits each pass
    static void radixopt(int[] A, int k, int r) {
        int[] B = new int[A.length];
        int[] count = new int[r];     // Count[i] stores number of records with digit value i
        int i, j, rshift, shiftstep;

        // Compute the number of bits to shift on each step, from the input radix
        for(shiftstep=0; (r>>shiftstep)>1; shiftstep++);
        for (i=0, rshift=0; i<k; i++, rshift+=shiftstep) { // For k digits
            for (j=0; j<r; j++) count[j] = 0;    // Initialize count

            // Count the number of records for each bin on this pass
            for (j=0; j<A.length; j++) count[(A[j]>>rshift)%r]++;

            // count[j] will be index in B for last slot of bin j.
            // First, reduce count[0] because indexing starts at 0, not 1
            count[0] = count[0] - 1;
            for (j=1; j<r; j++) count[j] = count[j-1] + count[j];

            // Put records into bins, working from bottom of bin
            // Since bins fill from bottom, j counts downwards
            for (j=A.length-1; j>=0; j--) {
                B[count[(A[j]>>rshift)%r]] = A[j];
                count[(A[j]>>rshift)%r] = count[(A[j]>>rshift)%r] - 1;
            }
            for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeradixopt.class.getSimpleName())
            .jvmArgs("-Xint") // Force interpreted mode (no JIT)
            .forks(1)
            .shouldDoGC(true)
            .build();

        new Runner(opt).run();
    }
}
