
static final int testsize = 100000;
static final int OFFSET = 1000000;
static boolean SUCCESS = true;
static long time1, time2, totaltime;   // These get set by the testing routine

static void visit(BinNode rt) {
//  System.out.print(rt.element() + " ");
}

public static void main(String args[]) throws IOException {
  Integer[] A = new Integer[testsize];
  int i;
  BST b = new BST();

  // Initialize to simply be the values from 0 to testsize-1
  // Ultimately, these are going to be our random keys
  for (i=0; i<A.length; i++)
    A[i] = i;
  // Now, generate a permuation on the numbers
  permute(A);

  // Now, build the BST
  // Each record will have a random key value from the permuation.
  // Since we actually store KVPairs, we will give it a "data" value
  // that is simply the count + OFFSET (so we can distinguish "data" from keys)
  for (i=0; i<A.length; i++)
    b.insert(new KVPair(new Integer(A[i]), new Integer(i + OFFSET)));

  // Make sure that the thing is really a BST
  if (!checkBST(b.root(), new KVPair(new Integer(-1), new Integer(-1)),
                new KVPair(new Integer(testsize), new Integer(testsize)))) {
    System.out.println("Oops! It was not a BST!");
    SUCCESS = false;
  }

  // Now, let's test delete by randomly removing all the keys
  permute(A);
  for (i=0; i<A.length; i++) {
    KVPair key = new KVPair(new Integer(A[i]), null);
    KVPair k = (KVPair)b.remove(key);
    if (b.size() != (testsize - i - 1)) {
      System.out.println("Oops! Wrong size. Should be " + (testsize - i - 1) + " and it is " + b.size());
      SUCCESS = false;
    }
    if (k.key().compareTo(A[i]) != 0) {
      System.out.println("Oops! Wrong key value. Should be " + A[i] + " and it is " + k.key());
       SUCCESS = false;
    }
  }

  // Now we are going to run timing tests on our two traversals
  permute(A);
  BST btest = new BST();
  for (i=0; i<A.length; i++)
    btest.insert(new KVPair(new Integer(A[i]), new Integer(i + OFFSET)));
  time1 = System.currentTimeMillis();
  preorder(btest.root());
  time2 = System.currentTimeMillis();
  totaltime = (time2-time1);
  System.out.println("Preorder time: " + totaltime);
  time1 = System.currentTimeMillis();
  preorder2(btest.root());
  time2 = System.currentTimeMillis();
  totaltime = (time2-time1);
  System.out.println("Preorder2 time: " + totaltime);

  // Finally, let's test with simple Integer values
  Integer[] AA = new Integer[testsize];
  BST bb = new BST();

  // Initialize to simply be the values from 0 to testsize-1
  // Ultimately, these are going to be our random keys
  int newlen = testsize/10;
  for (i=0; i<AA.length; i++)
    AA[i] = random(newlen);
  // Now, generate a permuation on the numbers
  permute(AA);

  // Now, build the BST
  // Each record will have a random key value from the permuation.
  for (i=0; i<AA.length; i++)
    bb.insert(new Integer(AA[i]));

  // Make sure that the thing is really a BST
  if (!checkBST(bb.root(), new Integer(-1), new Integer(testsize))) {
    System.out.println("Oops! It was not a BST!");
    SUCCESS = false;
  }

  if (SUCCESS) {
    PrintWriter output = new PrintWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    System.out.println("Success!");
  } else {
    System.out.println("Testing failed");
  }
}

}
