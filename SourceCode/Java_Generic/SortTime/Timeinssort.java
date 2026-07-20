package build.inssort;

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
@Measurement(iterations = 3, time = 1, timeUnit = TimeUnit.SECONDS)

public class Timeinssort {

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

    @Param({"100", "1000", "5000"})
    private int testsize;

    private int maxval = 1000000;

    private KVPair[] originalArray;
    private KVPair[] arrayToSort;

    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new KVPair[testsize];
        Random random = new Random(42);
        for (int i = 0; i < testsize; i++) {
            int temp = random.nextInt(maxval);
            originalArray[i] = new KVPair(temp, temp + 10);
        }
    }

    @Setup(Level.Invocation)
    public void copyArray() {
        // Creates a fresh copy of the Integer object array before each run
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public KVPair[] benchmarkinssort() {
        /* ========== CALL THE SORT ============== */
        inssort(arrayToSort);
        return arrayToSort;
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for KVPair arrays
    static void swap(KVPair[] A, int i, int j) {
        KVPair temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    void inssort(KVPair[] A) {
        for (int i=1; i<A.length; i++) // Insert i'th record
            for (int j=i; (j>0) && (A[j].compareTo(A[j-1]) < 0); j--)
                swap(A, j, j-1);
    }
    // =============== END THE BENCHMARKED CODE =======================

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeinssort.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
