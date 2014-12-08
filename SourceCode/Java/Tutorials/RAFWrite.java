import java.io.RandomAccessFile;
import java.util.Random;

public class Main {

   public static void main(String[] args) {
      try {
         RandomAccessFile raf = new RandomAccessFile(args[0], "rw");//Open our file with read/write access
         Random rdn = new Random();//Get a new random generator
         int min = 0; int max = 999;//Our file will have a maximum size of 999 bytes
         int amin = 0; int amax = 25;//The alphabet has 26 letters thus we want to generate a random offset
         //to "pick" those letters
         int length = rdn.nextInt(max - min + 1) + min;//Get the length of our file
         raf.setLength((long)length);//Set the length or size of the file, note that the we do not have to
         //set length of the file as the write method will "grow" the file with each sequential write
         for(int i=0; i < length; i++){//Run until our file is full
            int chr = rdn.nextInt(amax - amin + 1) + amin;//Randomly get our offset
            chr += 65;//ASCII capital letters range from 65-90, so add 65 to whatever we got
            raf.write(chr);//Write the int to the file
            System.out.printf("Writing %c at %d\n", chr, raf.getFilePointer());//Ouput our char and where
            //we wrote it.
         }
         raf.close();//Close our filestream.
      } catch (Exception e) {       
         e.printStackTrace();
      } 
   }

}
