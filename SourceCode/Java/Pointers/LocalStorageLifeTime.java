void Foo(int a) {
      float scores;
      a = a + 1;
      for (int i=0; i<a; i++) {
        Bar(i + a); 
      }
      scores++;  
}
