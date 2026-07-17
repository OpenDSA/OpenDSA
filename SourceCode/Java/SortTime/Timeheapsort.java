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
                originalArray[i] = testsize - i;
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
    public int[] benchmarkheapsort() {
        if (!testtype.equals("regular") && (testsize != 10000)) {
            throw new RuntimeException("Up/down only 10,000");
        }
        /* ========== CALL THE SORT ============== */
        heapsort(arrayToSort);
        return arrayToSort; // Returning prevents Dead Code Elimination optimization
    }

    // =============== HERE IS THE BENCHMARKED CODE =======================
    class MaxHeap {
        private int[] heap;   // Pointer to the heap array
        private int maxSize;  // Maximum size of the heap
        private int n;        // Number of things now in heap

        // Constructor supporting preloading of heap contents
        MaxHeap(int[] h, int num, int max)
        { heap = h; n = num; maxSize = max; buildHeap(); }

        // Return current size of the heap
        public int heapSize() { return n; }

        // Return true if pos a leaf position, false otherwise
        public boolean isLeaf(int pos) 
        { return (n / 2 <= pos ) && (pos < n); }

        // Return position for left child of pos
        int leftchild(int pos) {
            if (pos >= n / 2) return -1;
            return 2 * pos + 1;
        }

        // Return position for right child of pos
        int rightchild(int pos) {
            if (pos >= (n - 1) / 2) return -1;
            return 2 * pos + 2;
        }

        // Return position for parent
        public int parent(int pos) 
        { return (pos - 1) / 2; }

        // Insert val into heap
        public void insert(int key) {
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
                int child = leftchild(pos);
                if ((child + 1 < n) && (heap[child + 1] > heap[child])) {
                    child = child + 1; // child is now index with the greater value
                }
                if (heap[child] <= heap[pos]) {
                    return; // stop early
                }
                swap(pos, child);
                pos = child; // keep sifting down
            }
        }

        // Moves an element up to its correct place
        private void siftUp(int pos) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            while (pos > 0) {
                int parent = parent(pos);
                if (heap[parent] > heap[pos]) {
                    return; // stop early
                }
                swap(pos, parent);
                pos = parent; // keep sifting up
            }
        }

        // Remove and return maximum value
        public int removeMax() {
            assert n > 0 : "Heap is empty; cannot remove";
            n--;
            if (n != 0) {
                swap(0, n);  // Swap maximum with last value
                siftDown(0); // Put new heap root val in correct place
            }
            return heap[n];
        }

        // Remove and return element at specified position
        public int remove(int pos) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            n--;
            swap(pos, n); // Swap with last value
            update(pos);  // Move other value to correct position
            return heap[n];
        }

        // Modify the value at the given position
        public void modify(int pos, int newVal) {
            assert (0 <= pos && pos < n) : "Invalid heap position";
            heap[pos] = newVal;
            update(pos);
        }

        // The value at pos has been changed, restore the heap property
        private void update(int pos) {
            siftUp(pos);   // priority goes up
            siftDown(pos); // unimportant goes down
        }

        // swaps the elements at two positions
        private void swap(int pos1, int pos2) {
            int temp = heap[pos1];
            heap[pos1] = heap[pos2];
            heap[pos2] = temp;
        }
    }


    int heapsort(int[] A) {
        // The heap constructor invokes the buildheap method
        MaxHeap H = new MaxHeap(A, A.length, A.length);
        for (int i = 0; i < A.length; i++) {  // Now sort
            H.removeMax(); // Removemax places max at end of heap
        }
        return A[0];
    }
    // =============== END THE BENCHMARKED CODE =======================

    // Built-in main method so you can kick it off easily from your command line execution
    public void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(Timeheapsort.class.getSimpleName())
            .jvmArgs("-Xint") // Force interpreted mode (no JIT)
            .forks(1)
            .shouldDoGC(true)
            .build();

        new Runner(opt).run();
    }
}
