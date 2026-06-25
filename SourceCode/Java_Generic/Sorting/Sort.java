import java.lang.reflect.Array;
import java.io.*;
import java.math.*;
import java.util.*;

public class Sort {

    static int testsize = 1000;
    static int numtests = 5;

    @SuppressWarnings("unchecked")
    public static void main(String args[]) throws IOException {
        boolean SUCCESS = true;
        SortTest<KVPair<Integer,Integer>> myTest =
            new SortTest<>(KVPair.class, testsize);
        KVPair<Integer, Integer>[] B =
            (KVPair[]) Array.newInstance(KVPair.class, testsize);
        Random value = new Random();

        // Perform numtests trials to test this
        for (int i=0; i<testsize; i++) {
            int temp = (Math.abs(value.nextInt()) % 1000) + 1;
            B[i] = new KVPair<Integer,Integer>(temp, temp + 1);
        }
        
        SUCCESS = myTest.sorttest(B);

        if (SUCCESS) {
            PrintWriter output = new PrintWriter("success");
            output.println("Success");
            output.flush();
            output.close();
            System.out.println("Success!");
        } else {
            System.out.println("Testing failed");
        }
    }
}
