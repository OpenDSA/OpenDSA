public interface List {
  public void clear();
  public void insert(Object it, ListIndex where);
  public void append(Object it);
  public Object remove(ListIndex where);
  public ListIndex getStart();
  public ListIndex getEnd();
  public ListIndex pointToPos(int where);
  public int length();
  public Object getValue(ListIndex where);
}
