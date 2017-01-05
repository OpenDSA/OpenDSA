/**
 * Class to test swapping with arrays
 */
class SwapTester {
    public static void main() {
        int[] scores = new int[10]; //all values will be initialized by 0
        scores[0] = 1;
        scores[9] = 2;
        Swap(scores, 0, 9);// the first argument is the array,
        //the other parameters are the indices of the two elements to be swapped
    }

    /**
     * Swap two elements in the given array
     * @param array the array of elements
     * @param firstIndex the first element to be swapped
     * @param secondIndex the second element to be swapped
     */
    static void Swap(int[] array, int firstIndex, int secondIndex) {
        int temp = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = temp;
    }
}