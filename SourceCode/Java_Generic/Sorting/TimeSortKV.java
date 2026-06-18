import java.lang.reflect.Array;
import java.io.*;
import java.math.*;
import java.util.*;

public class TimeSort {
    int numtests = 5;

    @SuppressWarnings("unchecked")
    public static void main(String args[]) throws IOException {
        if (args.length != 1) {
            System.out.println("Usage: TimeSort <size>");
            System.exit(0);
        }
        int testsize = Integer.parseInt(args[0]);
        SortTime<KVPair<Integer,Integer>> myTest =
            new SortTime<>(KVPair.class, testsize);
        KVPair<Integer, Integer>[] B =
            (KVPair[]) Array.newInstance(KVPair.class, testsize);
        Random value = new Random();
        value.setSeed(0xCAFEBEEF);

        // Perform numtests trials to test this
        for (int i=0; i<testsize; i++) {
            int temp = (Math.abs(value.nextInt()) % 1000) + 1;
            B[i] = new KVPair<Integer,Integer>(temp, temp + 1);
        }
        
        myTest.sorttime(B);
    }
}
