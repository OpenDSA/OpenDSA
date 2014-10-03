import java.io.File;
import java.util.Scanner;


public class Main {

   /**
    * @param args
    */
   public static void main(String[] args) {     
      String filename = args[0];//Pass the function a full filepath
      beginParsing(filename);//call the parsing function
   }
   
   public static void beginParsing(String filename){
      try {
         Scanner sc = new Scanner(new File(filename));//Create our new scanner
         while(sc.hasNext()){//While the scanner has information to read
            String cmd = sc.next();//Read the next term
            double x; double y; double radius;
            switch(cmd){
               case "debug" :
                  System.out.println("debug cmd activated");
               break;
               case "add" ://Found an add command
                  x = sc.nextDouble();
                  y = sc.nextDouble();
                  String name = sc.next();
                  System.out.println("Insert node at "+x+" "+y+" with name "+name);
               break;
               case "delete" ://Found a delete command
                  x = sc.nextDouble();
                  y = sc.nextDouble();
                  System.out.println("Remove node at "+x+" "+y);
               break;
               case "search" ://Found a search command
                  x = sc.nextDouble();
                  y = sc.nextDouble();
                  radius = sc.nextDouble();
                  System.out.println("Search for node near "+x+" "+y+" within radius of "+radius);
               break;
               default ://Found an unrecognized command
                  System.out.println("Unrecognized input "+cmd);
               break;
            }
         }
      } catch (Exception e) {
         e.printStackTrace();
      }
   }

}
