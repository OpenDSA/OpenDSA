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
