import java.util.Random;
public class Main {

   /**
    * @param args
    */
   public static void main(String[] args) {     
      Random rdn = new Random();
      String alpha = "Zabcdefghijklmnopqrstuvwxyz"; 
      byte[] letters = new byte[1000];
       int min = 0; int max = 999;
       int amin = 0; int amax = 26;
       String loc = "";
      for(int i=0; i<40; i++){
         int ind = rdn.nextInt(max - min + 1) + min;
         int wind = rdn.nextInt(amax - amin + 1) + amin;
         char chr = alpha.charAt(wind);
         letters[ind] = (byte) chr;
         loc += ind+" ";
      }
      System.out.println(loc);
   }

}
