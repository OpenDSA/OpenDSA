void BadPointer() {
  Empolyee empPtr;
  // allocate the pointer, but not the pointee
  Employee empPtr2 = empPtr;
  // this dereference is a serious runtime error of type NullPointerException
 }