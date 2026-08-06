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

    static Boolean checkorder(int[] A) {
        for (int i=1; i<A.length; i++)
            if (A[i] < A[i-1]) {
                return false;
            }
        return true;
    }

    // JMH will run the benchmark for arrays of size 10 to 1,000,000
    @Param({"10", "100", "1000", "10000"})
    private int testsize;

    @Param({"regular", "up", "down"})
    private String testtype;
    
    private int maxval = 1000000;

    private int[] originalArray;
    private int[] arrayToSort;
    private int[] temp;
    int THRESHOLD = 60;

    // Generated once per benchmark trial run
    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new int[testsize];
        temp =  new int[testsize];
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

@Setup(Level.Trial) // Runs ONCE before the entire benchmark trial starts
public void doSetup() {
    System.out.println("====== Setup: Threshold is: " + THRESHOLD + " ======");
}

    // Generated right before every single iteration execution
    @Setup(Level.Invocation)
    public void copyArray() {
        // Crucial for sorting algorithms so we never benchmark an already-sorted array
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public int[] benchmarkmergesortopt() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        mergesortopt(arrayToSort, temp, 0, arrayToSort.length-1);
        //        if (!checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY DID NOT SORT PROPERLY!!");
        //        }
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    // Swap for int arrays
    public static void swap(int[] A, int i, int j) {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    void inssort(int[] A, int left, int right) {
        for (int i=left+1; i<=right; i++) {        // Insert i'th record
            for (int j=i; (j>left) && (A[j] < A[j-1]); j--) {
                swap(A, j, j-1);
            }
        }
    }

    void mergesortopt(int[] A, int[] temp, int left, int right) {
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
            if (temp[i] < temp[j]) {
                A[k] = temp[i++];
            }
            else { 
                A[k] = temp[j--];
            }
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timemergesortopt.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
