void test(boolean found)
{
  if(found)
  {
    Employee employee = new Employee();
    //do something with employee
  }
  //here the only reference to the created object is out of scoop so the object will
  //be eligible for garbage collection.
}