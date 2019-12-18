import java.io.*;

/**
 * This class deals with actions regarding errors (creating an error log,
 * printing out error messages, counting the number of errors, and judging
 * success of fail).
 */
public class ErrorRec {
  // Hold the number of errors
  int numErr = 0;
  // Print error messages in a text file
  PrintWriter errorFile = null;
  // Added at the beginning of error messages
  static final String DEFAULT_MSG_START = "* ***OpenDSA Error Start*** *\n";
   // Added at the end of error messages
   static final String DEFAULT_MSG_END = "\n* ***OpenDSA Error End*** *\n";
  // Added at the end of the name of error log file
  static final String FILE_NAME = "_error.log";

  /**
   * @param useFile
   *            true if you want to create a text file to record errors
   * @param className
   *            name of class used to create a file name
   */
  public ErrorRec(String className, boolean useFile) {
    if (useFile) {
        // file name to use
      String filenameUse = className + FILE_NAME;
      try {
        errorFile = new PrintWriter(filenameUse);
        System.out.println("Any error message will be in file " + filenameUse);
      } catch (FileNotFoundException ex) {
        // File not ready for writing.
        System.err.println(" file " + filenameUse + " could not be appended so no error file");
      }
    }
  }

  /**
   * @param className
   *            name of class used to create a file name
   */
  public ErrorRec(String className) {
    this(className, true);
  }

  /**
   * Prints out an error message in an error log or a console and increases
   * the number of errors by 1.
   * 
   * @param message
   *            an error message
   */
  public void printError(String message) {
    if (errorFile != null) {
      errorFile.println(DEFAULT_MSG_START + message + DEFAULT_MSG_END);
    } else {
      System.err.println(DEFAULT_MSG_START + message + DEFAULT_MSG_END);
    }
    numErr++;
  }

  /**
   * Tells if there exist errors and, if any, prints out the number of errors.
   */
  public void feedback() {
    // If there is no error, create a success file and print out success. If
    // not, report the number of errors
    if (numErr == 0) {
      try {
        PrintWriter output = new PrintWriter("success");
        output.println("Success");
        output.flush();
        output.close();
      } catch (FileNotFoundException ex) {
        System.err.println("Testing had no errors but could not write success file");
      }
      System.out.println("Success!");
    } else {
      System.out.println("\n***Testing failed. There are(is) " + numErr + " error(s) in your codes.\n");
    }
    if (errorFile != null) {
      errorFile.flush();
      errorFile.close();
    }
  }

}
