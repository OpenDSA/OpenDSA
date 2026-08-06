import java.io.*;
import java.math.*;
import java.util.*;

public class Sort {

    static int testsize = 1000;
    static int numtests = 5;

    public static void main(String args[]) throws IOException {
        boolean SUCCESS = true;
        SortTest myTest = new SortTest(testsize);
        int[] B = new int[testsize];
        Random value = new Random();

        // Perform numtests trials to test this
        for (int i=0; i<testsize; i++) {
            B[i] = (Math.abs(value.nextInt()) % 1000) + 1;
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
