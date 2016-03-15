import java.io.*;
import java.util.*;

// generate possible combinators

class RP19part1 {

    //static ArrayList<String> dict = new ArrayList<String>();
    // potential combinators
    static ArrayList<String> comb = new ArrayList<String>();

    static int numberDistinctLetters(String word) {
	word = word.toLowerCase();
	int result = 0;
	for(int i=0; i<word.length(); i++) {
	    char c = word.charAt(i);
	    if (word.indexOf(c) >= i) {
		result++;
	    }
	}
	//System.out.println(word + "\t" + result);
	return result;
    }// numberDistinctLetters method

    public static boolean lastLetterNotRepeated(String word) {
	word = word.toLowerCase();
	return word.indexOf(word.charAt(word.length()-1)) == word.length()-1;
    }// lastLetterNotRepeated method

    public static void main(String[] args) {
	BufferedReader br;

	try {
	    br =  new BufferedReader(new FileReader(args[0]));
	    String line;
	    while ((line = br.readLine()) != null) {
		if (// could be less than or equal to 
		    (numberDistinctLetters(line) == line.length()-1) &&
		     lastLetterNotRepeated(line) &&
		     (line.endsWith("r"))) {
		    //comb.add(line);
		    System.out.println(line);
		}
	    }
	    //System.out.println(comb.size());
	} catch (Exception e) {
	    System.out.println(e);
	}
    }// main method
}// RP19 part 1 class
