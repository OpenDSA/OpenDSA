/**
 * Class to test passing by value
 */
public class JavaPassByValue {
    static void main() {

        int[] array = new int[]{1, 2, 3, 4, 5};
        callee(array);
        System.out.println(array[1]);//this will print 100.
        System.out.println(array.length); // the array still 5 elements

    }

    static void callee(int[] array) //function that will modify the array reference
    {
        array[1] = 100; //this will modify the value of index 1 in the original array.
        array = new int[]{1, 2}; // But this will not affect
        // the original reference in the caller function.
    }
}
