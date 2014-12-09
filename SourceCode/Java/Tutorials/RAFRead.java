import java.io.RandomAccessFile;
import java.util.Random;

public class Main {

   public static void main(String[] args) {
      try {
         RandomAccessFile raf = new RandomAccessFile(args[0], "rw");//Open our file with read/write access
         Random rdn = new Random();
         int min = 0; int max = (int)raf.length();
         int pos = rdn.nextInt(max - min + 1) + min;        
         byte[] file = new byte[(int)raf.length()];//create an array to hold our file
         raf.readFully(file);//Read from our RAF up to the length of our array
         String str = new String(file);//Convert the bytes representing our file to text
         System.out.println(str);//Print out our file size
         raf.seek(pos);//Set our position randomly in the file
         byte b = raf.readByte();//Read the byte at our current spot
         System.out.printf("Set pos to %d, value %d, character %c\n", pos, (int)b, (char)b);
         file = new byte[(int)raf.length()];//Create a new array the size of the file
         pos = (int)raf.getFilePointer();//Get the current position in the file
         int read = raf.read(file, 0, file.length);//Use the read function. The read function requires you
         //provide a byte array, the offset from the current position you want to start and the amount of
         //bytes you would like. This is largely based off a c function as traditionally when you pass an
         //array you have no idea what the size of the array is. In most cases you will simply want to 
         //provide the length of the array you are passing in. Note that this function returns an int.
         //This int represents the bytes read from the file.
         System.out.printf("Tried reading at position %d, read %d bytes, array was size %d\n", pos, read, 
               file.length);
         raf.close();//Close our filestream.
      } catch (Exception e) {       
         e.printStackTrace();
      } 
   }

}
