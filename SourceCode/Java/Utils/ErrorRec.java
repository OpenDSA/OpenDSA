import java.io.*;

/**
 * This class deals with actions regarding errors (creating an error log,
 * printing out error messages, counting the number of errors, and judging
 * success of fail).
 * 
 * @author Yuya Asano
 *
 */
public class ErrorRec {
	// Hold the number of errors
	int numErr = 0;
	// Print error messages in a text file
	PrintWriter error = null;
	// Added at the beginning of error messages
	static final String DEFAULT_MSG = "* ***OpenDSA Error*** *\n";
	// Added at the beginning of the name of error log file
	static final String FILE_NAME = "error log.";

	/**
	 * @param useFile
	 *            true if you want to create a text file to record errors
	 * @param className
	 *            name of class used to create a file name
	 * @throws FileNotFoundException
	 *             thrown if some errors happen while opening or creating a new
	 *             text file
	 */
	public ErrorRec(boolean useFile, String className) throws FileNotFoundException {
		if (useFile) {
			error = new PrintWriter(FILE_NAME + className);
		}
	}

	/**
	 * @param className
	 *            name of class used to create a file name
	 * @throws FileNotFoundException
	 *             thrown if some errors happen while opening or creating a new
	 *             text file
	 */
	public ErrorRec(String className) throws FileNotFoundException {
		this(true, className);
	}

	/**
	 * Prints out an error message in an error log or a console and increases
	 * the number of errors by 1.
	 * 
	 * @param message
	 *            an error message
	 */
	public void printError(String message) {
		if (error != null) {
			error.println(DEFAULT_MSG + message);
		} else {
			System.err.println(DEFAULT_MSG + message);
		}
		numErr++;
	}

	/**
	 * Tells if there exist errors and, if any, prints out the number of errors.
	 * 
	 * @throws FileNotFoundException
	 *             thrown if some errors happen while opening or creating a new
	 *             text file
	 */
	public void feedback() throws FileNotFoundException {
		// If there is no error, create a success file and print out success. If
		// not, report the number of errors
		if (numErr == 0) {
			PrintWriter output = new PrintWriter("success");
			output.println("Success");
			output.flush();
			output.close();
			System.out.println("Success!");
		} else {
			System.out.println("Testing failed. There are(is) " + numErr + " error(s) in your codes.");
		}
		if (error != null) {
			error.flush();
			error.close();
		}
	}

}
