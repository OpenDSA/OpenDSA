package com.benchmark;

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
public class TimeSort {

    @Param({"100", "1000", "5000"})
    private int testsize;

    private Integer[] originalArray;
    private Integer[] arrayToSort;

    @Setup(Level.Trial)
    public void setupData() {
        originalArray = new Integer[testsize];
        Random random = new Random(42);
        for (int i = 0; i < testsize; i++) {
            originalArray[i] = random.nextInt(10000); // Auto-boxing into Integer object
        }
    }

    @Setup(Level.Invocation)
    public void copyArray() {
        // Creates a fresh copy of the Integer object array before each run
        arrayToSort = originalArray.clone();
    }

    @Benchmark
    public Integer[] benchmarkInsertionSort() {
        insertionSort(arrayToSort);
        return arrayToSort;
    }

    // Insertion Sort modified to accept and compare Integer objects
    private void insertionSort(Integer[] array) {
        for (int i = 1; i < array.length; i++) {
            Integer key = array[i];
            int j = i - 1;
            
            // Java auto-unboxes the Integers here to compare primitives
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
                .include(TimeSort.class.getSimpleName())
                .build();

        new Runner(opt).run();
    }
}
