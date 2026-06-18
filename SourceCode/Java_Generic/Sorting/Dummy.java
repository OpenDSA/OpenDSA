Boolean sorttest(T[] B) {
    int i;
    for (i=0; i<B.length; i++) {
        A[i] = B[i];
    }
    return B[0].compareTo(B[1]) < 0;
}

