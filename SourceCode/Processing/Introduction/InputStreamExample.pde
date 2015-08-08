/* *** ODSATag: InputStream *** */
try( InputStream inputstream = new FileInputStream("file.txt") ) {

  int data = inputstream.read();
  while(data != -1){
    System.out.print((char) data);
    data = inputstream.read();
  }
}
/* *** ODSAendTag: InputStream *** */
