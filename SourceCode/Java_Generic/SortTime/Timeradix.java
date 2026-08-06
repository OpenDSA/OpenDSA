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
@Warmup(iterations = 2, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)

public class Timeradix {

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
    public KVPair[] benchmarkradix() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (!testtype.equals("up") && checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        radix(arrayToSort, 4, 256);
        //        if (!checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY DID NOT SORT PROPERLY!!");
        //        }
        return arrayToSort;
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    static void radix(KVPair[] A, int k, int r) {
        KVPair[] B = new KVPair[A.length];
        int[] count = new int[r];     // Count[i] stores number of records with digit value i
        int i, j, rtok;

        for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
            for (j=0; j<r; j++) { count[j] = 0; }    // Initialize count

            // Count the number of records for each bin on this pass
            for (j=0; j<A.length; j++) {
                count[((A[j].key())/rtok)%r]++;
            }

            // After processing, count[j] will be index in B for first slot of bin j.
            int total = A.length;
            for (j=r-1; j>=0; j--) { total -= count[j]; count[j] = total; }

            // Put records into bins, working from left to right
            for (j=0; j<A.length; j++) {
                B[count[((A[j].key())/rtok)%r]] = A[j];
                count[((A[j].key())/rtok)%r] = count[((A[j].key())/rtok)%r] + 1;
            }
            for (j=0; j<A.length; j++) { A[j] = B[j]; } // Copy B back
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeradix.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
