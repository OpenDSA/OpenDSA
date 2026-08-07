package build.mergesortopt;

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

public class Timemergesortopt {

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
    private KVPair[] temp;
    int THRESHOLD = 12;

    @Setup(Level.Trial)
    public void setupData() {
        System.out.println("================= THRESHOLD: " + THRESHOLD + " ===============");
        originalArray = new KVPair[testsize];
        arrayToSort = new KVPair[testsize];
        temp =  new KVPair[testsize];
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
    public KVPair[] benchmarkmergesortopt() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (!testtype.equals("up") && checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        mergesortopt(arrayToSort, temp, 0, arrayToSort.length-1);
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

    void inssort(KVPair[] A, int left, int right) {
        for (int i=left+1; i<=right; i++)        // Insert i'th record
            for (int j=i; (j>left) && (A[j].compareTo(A[j-1]) < 0); j--)
                swap(A, j, j-1);
    }

    // Optimized Mergesort
    void mergesortopt(KVPair[] A, KVPair[] temp, int left, int right) {
        int i, j, k, mid = (left+right)/2;  // Select the midpoint
        if (left == right) { return; }          // List has one record
        if ((mid-left) >= THRESHOLD) { mergesortopt(A, temp, left, mid); }
        else { inssort(A, left, mid); }
        if ((right-mid) > THRESHOLD) { mergesortopt(A, temp, mid+1, right); }
        else { inssort(A, mid+1, right); }
        // Do the merge operation.  First, copy 2 halves to temp.
        for (i=left; i<=mid; i++) { temp[i] = A[i]; }
        for (j=right; j>mid; j--) { temp[i++] = A[j]; }
        // Merge sublists back to array
        for (i=left,j=right,k=left; k<=right; k++) {
            if (temp[i].compareTo(temp[j]) <= 0) { A[k] = temp[i++]; }
            else { 
                A[k] = temp[j--];
            }
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timemergesortopt.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
