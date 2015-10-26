/* *** ODSATag: PolymorphismException *** */
try( InputStream inputstream = new FileInputStream("file.txt") ) {

  int data = inputstream.read();
  while(data != -1){
    System.out.print((char) data);
    data = inputstream.read();
  }
} (catch IOException e) {
  e.PrintStackTrace();
}
} (catch FileNotFoundException f) {
  f.PrintStackTrace();
}
/* *** ODSAendTag: PolymorphismException *** */
