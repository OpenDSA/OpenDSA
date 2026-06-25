import java.io.*;
import java.math.*;
import java.util.*;

public class TimeSort {
    int numtests = 5;

    public static void main(String args[]) throws IOException {
        if (args.length != 1) {
            System.out.println("Usage: TimeSort <size>");
            System.exit(0);
        }
        int testsize = Integer.parseInt(args[0]);
        SortTime<Integer> myTest = new SortTime<>(Integer.class, testsize);
        Integer[] B = new Integer[testsize];
        Random value = new Random();
        value.setSeed(0xCAFEBEEF);        

        // Perform numtests trials to test this
        for (int i=0; i<testsize; i++) {
            B[i] = (Math.abs(value.nextInt()) % 1000) + 1;
        }
        
        myTest.sorttime(B);
    }
}
