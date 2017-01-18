void Foo(int a) {
      // (1) Locals (a, b, i, scores) allocated when Foo runs
      int i;
      float scores;
      a = a + 1;
      // (2) Local storage is used by the computation
      for (i=0; i<a; i++) {
        Bar(i + a); // (3) Locals continue to exist undisturbed,
      }  // even during calls to other functions.
} // (4) The locals are all deallocated when the function exits.