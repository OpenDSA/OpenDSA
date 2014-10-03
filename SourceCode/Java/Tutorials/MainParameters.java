
public class Main {

   /**
    * @param args
    */
   public static void main(String[] args) {
      int count = 0;//Set our counter
      if(args.length < 1){
         //No parameters is this a problem?
      }
      while(count < args.length){//While we have not reached the end of our arguments keep going.
         switch(args[count]){
            case "-h"://Display help info
               System.out.println("This is the help message. Proper command syntax:");
               System.out.println("cmdline -v: Displays version information");
               System.out.println("cmdline -h: Displays this help message");
               System.out.println("cmdline -f [file]: Sets file to file provided");
               count++;
            break;            
            case "-v"://Display version information
               System.out.println("Cmdline parse sample version 1.0.0");
               count++;
            break;
            case "-f"://This is an example to show you how to handle when you have a parameter that takes info
               String fileName = args[count+1];//We are getting the filename so set it to the string after -f
               System.out.println("Input file is "+fileName);//Print out info
               count = count+2;//Increment counter to next item (skipping filename).
               //Note this provides no bounds checking so if you pass the parameter without file info it may bomb if at the end
               //You may also surround it in a try/catch for safety.
            break;
            default://If none of your cases match then this is an unrecognized parameter and we will exit.
               System.out.println("Unrecognized parameter "+args[count]+"\nExiting.");
               System.exit(-1);              
            break;
         }
      }
   }

}
