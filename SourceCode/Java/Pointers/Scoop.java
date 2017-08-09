void test(boolean found)
{
  if (found)
  {
    // employee1 is a variable local to this if statement
    // but the Employee object is in heap memory.
    Employee employee1 = new Employee("John", 1000);
    // We can do things here with employee1, and its associated object
    Printout(employee1.name());
  }

  // At this point, the only reference to the created object is out of scope
  // since employee1 was local to the if statement block.
  // So the Employee object will be eligible for garbage collection.
}
