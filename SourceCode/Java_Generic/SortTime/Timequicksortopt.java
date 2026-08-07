package build.quicksortopt;

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

public class Timequicksortopt {

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
    // @Param({"10", "100", "1000", "10000", "100000", "1000000"})
    @Param({"1000000"})
    private int testsize;

    @Param({"regular", "up", "down"})
    private String testtype;
    
    private int maxval = 1000000;

    private KVPair[] originalArray;
    private KVPair[] arrayToSort;
    int THRESHOLD = 13;

    @Setup(Level.Trial)
    public void setupData() {
        System.out.println("================= THRESHOLD: " + THRESHOLD + " ===============");
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
    public KVPair[] benchmarkquicksortopt() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (!testtype.equals("up") && checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        quicksortopt(arrayToSort, 0, arrayToSort.length-1);
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
    // Insertion sort used by optimized quicksort
    // Integer-only version
    // Instead of swapping, "shift" the values down the array
    void inssortshiftint(KVPair[] A) {
        for (int i=1; i<A.length; i++) { // Insert i'th record
            int j;
            KVPair temp = A[i];
            for (j=i; (j>0) && (temp.compareTo(A[j-1]) < 0); j--)
                A[j] = A[j-1];
            A[j] = temp;
        }
    }


    int MAXSTACKSIZE = 50;

    // Optimized Quicksort: Not recursive, and uses Inssort for small lists
    // This version uses KVPair values for the records
    void quicksortopt(KVPair[] A, int oi, int oj) { // Quicksort
        int[] Stack = new int[MAXSTACKSIZE]; // Stack for array bounds
        int top = -1;
        KVPair pivot;
        Integer pivotkey;
        int pivotindex, l, r;

        Stack[++top] = oi;  // Initialize stack
        Stack[++top] = oj;
        int i;
        int j;

        while (top > 0) {   // While there are unprocessed subarrays
            // Pop Stack
            j = Stack[top--];
            i = Stack[top--];

            // Findpivot
            pivotindex = (i+j)/2;
            pivot = A[pivotindex];
            pivotkey = pivot.key();
            swap(A, pivotindex, j); // Stick pivot at end

            // Partition
            l = i-1;
            r = j;
            while (true) {
                while (A[++l].compareTo(pivotkey) < 0);
                while ((r!=0) && (A[--r].compareTo(pivotkey) > 0));
                if (l >= r) break;
                swap (A, l, r);
            }
            swap(A, l, j);  // Put pivot value in place

            // Put new subarrays onto Stack if they are not small
            if ((l-i) > THRESHOLD) {   // Left partition
                Stack[++top] = i;
                Stack[++top] = l-1;
            }
            if ((j-l) > THRESHOLD) {   // Right partition
                Stack[++top] = l+1;
                Stack[++top] = j;
            }
        }
        inssortshiftint(A);             // Final Insertion Sort
    }
    // =============== END THE BENCHMARKED CODE =======================

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timequicksortopt.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
