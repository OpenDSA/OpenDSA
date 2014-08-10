public static int binarySearch(int[] table, int x) {
  int low = 0;
  int high = table.length - 1;
  int mid;
  while( low <= high ) {
    // Division truncates
    mid = (low + high) / 2;
    if( table[mid] < x) low = mid + 1;
    else if(table[mid] > x) high = mid - 1;
    else return mid;
  }
  return -1;              // Not found
}
