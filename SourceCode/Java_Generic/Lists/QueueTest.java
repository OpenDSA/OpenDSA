import java.io.*;

public class QueueTest {

static boolean SUCCESS = true;

static void test(Queue<Integer> Q, Queue<Integer> Q1) {
  String temp;
  Q.enqueue(10);
  Q.enqueue(20);
  Q.enqueue(15);
  temp = Q.toString();
  if (!temp.equals("10 20 15 "))
    SUCCESS = false;
  while(Q.length() > 0)
    Q1.enqueue(Q.dequeue());
  temp = Q1.toString();
  if (!temp.equals("10 20 15 "))
    SUCCESS = false;
  temp = Q.toString();
  if (!temp.equals(""))
    SUCCESS = false;
}

public static void main(String args[]) throws IOException {
  AQueue<Integer> AQ = new AQueue<Integer>();
  AQueue<Integer> AQ1 = new AQueue<Integer>();
  LQueue<Integer> LQ = new LQueue<Integer>();
  LQueue<Integer> LQ1 = new LQueue<Integer>();

  test(AQ, AQ1);
  test(LQ, LQ1);
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
