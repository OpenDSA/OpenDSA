interface List {
  void clear();
  void insert(Object it, ListIndex where);
  void append(Object it);
  Object remove(ListIndex where);
  ListIndex getStart();
  ListIndex getEnd();
  ListIndex pointToPos(int where);
  int length();
  Object getValue(ListIndex where);
}
