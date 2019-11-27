#include <iostream>
#include <fstream>
#include <string>

using namespace std;

// This class deals with actions regarding errors (creating an error log,
// printing out error messages, counting the number of errors, and judging
// success or fail). Based on the Java version.
class ErrorRec {
  // Hold the number of errors
  int numErr = 0;
  // Print error messages in a text file
  ofstream errorFile;
  // Added at the beginning of error messages
  const string DEFAULT_MSG_START = "* ***OpenDSA Error Start*** *\n";
  // Added at the end of error messages
  const string DEFAULT_MSG_END = "\n* ***OpenDSA Error End*** *\n";
  // Added at the end of the name of error log file
  const string FILE_NAME = "_error.log";

  /*
	 * useFile: true if you want to create a text file to record errors (true by default)
	 * className: name of class used to create a file name
	*/
public:
  ErrorRec(string className, bool useFile = true)
  {
    if (useFile) {
      // file name to use
      string filenameUse = className + FILE_NAME;
      // Overwrite if exists since only want current messages
      errorFile.open(filenameUse, ios::trunc);
      if (!errorFile.is_open())
      {
        // File not ready for appending.
        cerr << " file " << filenameUse << " could not be appended so no error file" << endl;
      } else {
        cout << "Any error message will be in file " + filenameUse << endl;
      }
    }
  }

  ~ErrorRec() {
    if (errorFile.is_open()) {
      errorFile.close();
    }
  }

  /*
	 * Prints out an error message in an error log or a console and increases
	 * the number of errors by 1.
	 * 
	 * message: an error message
	 */
  void printError(string message) {
    if (errorFile.is_open()) {
      errorFile << DEFAULT_MSG_START + message + DEFAULT_MSG_END << endl;
    }
    else {
      cerr << DEFAULT_MSG_START + message + DEFAULT_MSG_END << endl;
    }
    numErr++;
  }

  /* Tells if there exist errors and, if any, prints out the number of errors. */
  void feedback() {
    // If there is no error, create a success file and print out success. If
    // not, report the number of errors
    if (numErr == 0) {
      // Want new file so wipe out if exists.
      ofstream output("success", ios::out);
      if (!output.is_open()) {
        cerr << "Testing had no errors but could not write success file" << endl;
      }
      else {
        output << "Success" << endl;
        output.close();
      }
      cout << "Success!" << endl;
    }
    else {
      cout << endl << "***Testing failed. There is(are) " << numErr << " error(s) in your codes." << endl << endl;
    }
    if (errorFile.is_open()) {
      errorFile.close();
    }
  }
};
