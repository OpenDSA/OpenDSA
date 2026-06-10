import java.io.*;

// Tester for interpolation search function
public class interpolationSearch {

    static boolean SUCCESS = true;

/* *** ODSATag: Interpolation *** */
public static int interpolationSearch(int[] table, int x) {
    int low = 0;
    int high = table.length - 1;
    int mid;
    while( table[low] < x && table[high] >= x ) {
        // Division truncates
        mid = low + ((x-table[low]) * (high-low)) / (table[high] - table[low]);
        if( table[mid] < x) low = mid + 1;
        else if(table[mid] > x) high = mid - 1;
        else return mid;
    }
    if (table[low] == x) return low;
    else return -1;     // Not found
}
/* *** ODSAendTag: Interpolation *** */

    public static void main(String args[]) throws IOException {
        int[] A = {2, 3, 4, 5, 7, 10};

        int pos = interpolationSearch(A, 4);
        if (pos != 2) {
            System.out.println("Error in interpolation search! Expected 2, got " + pos);
            SUCCESS = false;
        }

        pos = interpolationSearch(A, 6);
        if (pos != -1) {
            System.out.println("Error in interpolation search! Expected 6, got " + pos);            SUCCESS = false;
        }
        if (SUCCESS) {
            PrintWriter output = new PrintWriter("success");
            output.println("Success");
            output.flush();
            output.close();
            System.out.println("Success!");
        } else {
            System.out.println("Interpolation Search Testing failed");
        }
    }
}
