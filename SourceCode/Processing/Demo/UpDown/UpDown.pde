final long runs = 100000;

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
  for (i=runs; i != 0; i--)
    for (j=count; j != 0; j--)
      { sum2++; }
  long time3 = millis();

  println("Up time is " + (time2-time1) +
          ", down time is " + (time3-time2));
  println("Sum1 is " + sum1 + ", sum2 is " + sum2);


}
