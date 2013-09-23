boolean SUCCESS = true;
final long runs = 1000;

void setup() {
  long i, j;
  long count = 100000; // Integer.parseInt(args[0]);
  println("Doing " + count + " times");

  long time1 = millis();
  long sum1 = 0;
  for (i=0; i<runs; i++)
    for (j=0; j<count; j++)
      { sum1++; }
  long time2 = millis();

  long sum2 = 0;
  for (i=runs; i > 0; i--)
    for (j=count; j > 0; j--)
      { sum2++; }
  long time3 = millis();

  long sum3 = 0;
  for (i=runs; i != 0; i--)
    for (j=count; j != 0; j--)
      { sum3++; }
  long time4 = millis();

  long sum4 = 0; i = 0;
  while (i != runs) {
    j = 0;
    while (j != count)
      { sum4++; j++; }
    i++;
  }
  long time5 = millis();

  long sum5 = 0; i = 0;
  while (i < runs) {
    j = 0;
    while (j < count)
      { sum5++; j++; }
    i++;
  }
  long time6 = millis();

  println("Up time is " + (time2-time1) +
          ", down time is " + (time3-time2));
  println("Check vs. zero time is " + (time4-time3));
  println("While loop time is " + (time5-time4));
  println("While loop 2 time is " + (time6-time5));
  println("Sum1 is " + sum1 + ", sum2 is " + sum2 + ", sum 3 is " + sum3);
  println("Sum4 is " + sum4);
  println("Sum5 is " + sum5);

  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}

