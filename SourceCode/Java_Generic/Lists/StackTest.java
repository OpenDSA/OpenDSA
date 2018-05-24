import java.io.*;

public class StackTest {

static boolean SUCCESS = true;

static void test(Stack<Integer> S, Stack<Integer> S1) {
    String temp;
    S.push(10);
    S.push(20);
    S.push(15);
    temp = S.toString();
    if (!temp.equals("15 20 10 "))
      SUCCESS = false;
    while(S.length() > 0)
      S1.push(S.pop());
    temp = S1.toString();
    if (!temp.equals("10 20 15 "))
      SUCCESS = false;
    temp = S.toString();
    if (!temp.equals(""))
      SUCCESS = false;
}

public static void main(String args[]) throws IOException {
  AStack<Integer> AS = new AStack<Integer>();
  AStack<Integer> AS1 = new AStack<Integer>();
  LStack<Integer> LS = new LStack<Integer>();
  LStack<Integer> LS1 = new LStack<Integer>();

  test(AS, AS1);
  test(LS, LS1);
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
