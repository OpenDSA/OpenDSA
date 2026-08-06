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
@Warmup(iterations = 2, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)

public class Timeradixlinkopt {

    Boolean checkorder(KVPair[] A) {
        for (int i=1; i<A.length; i++)
            if (A[i].compareTo(A[i-1]) < 0) {
                return false;
            }
        return true;
    }

    // KVPair class definition
    private class KVPair implements Comparable<KVPair> {
        Integer theKey;
        Integer theVal;

        KVPair(Integer k, Integer v) {
            theKey = k;
            theVal = v;
        }

        // Compare KVPairs
        public int compareTo(KVPair it) {
            return theKey.compareTo(it.key());
        }

        // Compare against a key
        public int compareTo(Integer it) {
            return theKey.compareTo(it);
        }

        public Integer key() {
            return theKey;
        }

        public Integer value() {
            return theVal;
        }
    }

    // JMH will run the benchmark for arrays of size 10 to 1,000,000
    @Param({"10", "100", "1000", "10000", "100000", "1000000"})
    private int testsize;

    @Param({"regular", "up", "down"})
    private String testtype;
    
    private int maxval = 1000000;

    private KVPair[] originalArray;
    private KVPair[] arrayToSort;

    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new KVPair[testsize];
        arrayToSort = new KVPair[testsize];
        Random random = new Random(42);
        int temp;
        if (testtype.equals("regular")) {
            for (int i = 0; i < testsize; i++) {
                temp = random.nextInt(maxval);
                originalArray[i] = new KVPair(temp, temp + 10);
            }
        }
        else if (testtype.equals("up")) {
            for (int i = 0; i < testsize; i++) {
                originalArray[i] = new KVPair(i + 1, i + 11);
            }
        }
        else if (testtype.equals("down")) {
            for (int i = 0; i < testsize; i++) {
                originalArray[i] = new KVPair(maxval - i, maxval - i + 10);
            }
        }
        else System.out.println("++++++++++++++++ ERROR!! BAD TEST TYPE!!");
    }

    @Setup(Level.Invocation)
    public void copyArray() {
        // Creates a fresh copy of the array to sort before each run
        for (int i = 0; i < testsize; i++) {
            arrayToSort[i] = originalArray[i];
        }
    }

    @Benchmark
    public KVPair[] benchmarkradixlinkopt() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (!testtype.equals("up") && checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        radixlinkopt(arrayToSort, 4, 256);
        //        if (!checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY DID NOT SORT PROPERLY!!");
        //        }
        return arrayToSort;
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Optimized radixsort using linked lists
    static void radixlinkopt(KVPair[] A, int k, int r) {
        KVPair[] B = new KVPair[A.length];
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
                int digit = ((A[j].key())>>rshift)%r;
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

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeradixlinkopt.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
