void X() {
  int a = 1;
  int b = 2;
  //T1

  Y(a);
  //T3
  Y(b);

 //T5
}

void Y(int p) {
  int q;
  q = p + 2;
  //T2 (first time through), T4 (second time through)
}