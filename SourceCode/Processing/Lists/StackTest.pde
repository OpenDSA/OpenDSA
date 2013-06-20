boolean SUCCESS = true;

void test(Stack S, Stack S1) {
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

void setup() {
  AStack AS = new AStack();
  AStack AS1 = new AStack();
  LStack LS = new LStack();
  LStack LS1 = new LStack();

  test(AS, AS1);
  test(LS, LS1);
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
  } else {
    println("Testing failed");
  }
  exit();
}
