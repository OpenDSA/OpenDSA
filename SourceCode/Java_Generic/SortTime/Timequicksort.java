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
        // Creates a fresh copy of the Integer object array before each run
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public KVPair[] benchmarkquicksort() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (!testtype.equals("up") && checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        quicksort(arrayToSort, 0, arrayToSort.length-1);
        //        if (!checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY DID NOT SORT PROPERLY!!");
        //        }
        return arrayToSort;
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for KVPair arrays
    static void swap(KVPair[] A, int i, int j) {
        KVPair temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    /* Warning: Partition is sensitive. If we don't make the right
       position actually cross the left, then it seems hard to get things
       to work right when there is only one element in the partition
       (i.e., a list of 2 elements). */
    int partition(KVPair[] A, int left, int right, KVPair pivot) {
        while (left <= right) { // Move bounds inward until they meet
            while (A[left].compareTo(pivot) < 0) { left++; }
            while ((right >= left) && (A[right].compareTo(pivot) >= 0)) { right--; }
            if (right > left) { swap(A, left, right); } // Swap out-of-place values
        }
        return left;            // Return first position in right partition
    }

    // Findpivot
    int findpivot(KVPair[] A, int i, int j) { return (i+j)/2; }

    // Main routine
    void quicksort(KVPair[] A, int i, int j) { // Quicksort
        int pivotindex = findpivot(A, i, j);  // Pick a pivot
        swap(A, pivotindex, j);               // Stick pivot at end
        // k will be the first position in the right subarray
        int k = partition(A, i, j-1, A[j]);
        swap(A, k, j);                        // Put pivot in place
        if ((k-i) > 1) { quicksort(A, i, k-1); }  // Sort left partition
        if ((j-k) > 1) { quicksort(A, k+1, j); }  // Sort right partition
    }
    // =============== END THE BENCHMARKED CODE =======================

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timequicksort.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
