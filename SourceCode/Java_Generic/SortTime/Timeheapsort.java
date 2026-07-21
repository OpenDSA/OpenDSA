package build.heapsort;

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

public class Timeheapsort {

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
    public KVPair[] benchmarkheapsort() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        //        if (!testtype.equals("up") && checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY SHOULD NOT START SORTED!!");
        //        }
        heapsort(arrayToSort);
        //        if (!checkorder(arrayToSort)) {
        //            throw new RuntimeException("ARRAY DID NOT SORT PROPERLY!!");
        //        }
        return arrayToSort;
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    class MaxHeap {
        private KVPair[] heap; // Pointer to the heap array
        private int maxSize; // Maximum size of the heap
        private int n; // Number of things now in heap

        // Constructor supporting preloading of heap contents
        MaxHeap(KVPair[] h, int inSize, int max) {
            heap = h;
            n = inSize;
            maxSize = max;
            buildHeap();
        }

        // Return current size of the heap
        public int heapSize() { return n; }

        // Return true if pos a leaf position, false otherwise
        public boolean isLeaf(int pos) 
        { return (n / 2 <= pos ) && (pos < n); }

        // Return position for left child of pos
        public int leftChild(int pos) 
        { return 2 * pos + 1; }

        // Return position for right child of pos
        public int rightChild(int pos) 
        { return 2 * pos + 2; }

        // Return position for parent
        public int parent(int pos) 
        { return (pos - 1) / 2; }

        // Insert val into heap
        public void insert(KVPair key) {
            assert n < maxSize : "Heap is full; cannot insert";
            heap[n] = key;
            n++;
            siftUp(n - 1);
        }

        // Heapify contents of Heap
        private void buildHeap() {
            for (int i = parent(n - 1); i >= 0; i--) {
                siftDown(i);
            }
        }

        // Moves an element down to its correct place
        private void siftDown(int pos) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            while (!isLeaf(pos)) {
                int child = leftChild(pos);
                if ((child + 1 < n) && (heap[child+1].compareTo(heap[child]) > 0)) {
                    child++; // child is now index of child with greater value
                }
                if (heap[child].compareTo(heap[pos]) <= 0) {
                    return; // stop early
                }
                swap(heap, pos, child);
                pos = child; // keep sifting down
            }
        }

        // Moves an element up to its correct place
        private void siftUp(int pos) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            while (pos > 0) {
                int parent = parent(pos);
                if (heap[parent].compareTo(heap[pos]) > 0) {
                    return; // stop early
                }
                swap(heap, pos, parent);
                pos = parent; // keep sifting up
            }
        }

        // Remove and return maximum value
        public KVPair removeMax() {
            assert n > 0 : "Heap is empty; cannot remove";
            n--;
            if (n != 0) {
                swap(heap, 0, n);  // Swap maximum with last value
                siftDown(0); // Put new heap root val in correct place
            }
            return heap[n];
        }

        // Remove and return element at specified position
        public KVPair remove(int pos) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            n--;
            if (n != 0) {
                swap(heap, pos, n); // Swap with last value
                update(pos);  // Move other value to correct position
            }
            return heap[n];
        }

        // Modify the value at the given position
        public void modify(int pos, KVPair newVal) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            heap[pos] = newVal;
            update(pos);
        }

        // The value at pos has been changed, restore the heap property
        private void update(int pos) {
            siftUp(pos);   // priority goes up
            siftDown(pos); // unimportant goes down
        }
    }


    // Swap for KVPair arrays
    static void swap(KVPair[] A, int i, int j) {
        KVPair temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    void heapsort(KVPair[] A) {
        // The heap constructor invokes the buildheap method
        MaxHeap H = new MaxHeap(A, A.length, A.length);
        for (int i=0; i<A.length; i++) {  // Now sort
            H.removeMax(); // Removemax places max at end of heap
        }
    }
    // =============== END THE BENCHMARKED CODE =======================

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeheapsort.class.getSimpleName())
            .build();

        new Runner(opt).run();
    }
}
