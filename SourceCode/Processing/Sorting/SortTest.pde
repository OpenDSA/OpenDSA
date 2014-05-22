final int numtests = 5;
final int testsize = 100;
boolean SUCCESS = true;    // Indicates successful completion, to
		  	   // avoid recompilation
long time1, time2;         // These get set by sorttime()

void setup() {
  Integer[] A = new Integer[testsize];
  int i;

  // Perform numtests trials to test this
  for (int tests=0; tests<numtests; tests++) {
    for (i=0; i<A.length; i++)
      A[i] = int(random(1000))+1;
    sorttest(A);
    checkorder(A);
  }
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
