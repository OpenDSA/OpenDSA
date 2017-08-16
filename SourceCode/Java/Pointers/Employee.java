/* *** ODSATag: Employee *** */

/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
 /**
  * Employee is a class used in this tutorial to explain various references concepts
  */
/* *** ODSATag: EmployeeVars *** */
 class Employee {
     String name;
     int salary;
/* *** ODSAendTag: EmployeeVars *** */

     /**
      * class constructor to initialize name and salary fields
      * @param name: employee name
      * @param salary: employee salary
      */
     public Employee(String name, int salary)
     {
         this.name = name;
         this.salary = salary;
     }

     /**
      * getter method for the name field
      * @return the value of name field
      */
     public String getName()
     {
         return name;
     }

     /**
      * setter method for the name field
      * @param newName the value to be assigned to name field
      */
     public void setName(String newName)
     {
         name = newName;
     }
     /**
      * getter method for the salary field
      * @return the value of salary field
      */
     public int getSalary()
     {
         return salary;
     }
     /**
      * setter method for the salary field
      * @param newSalary the value to be assigned to salary field
      */
     public void setSalary(int newSalary)
     {
         salary = newSalary;
     }

/* *** ODSATag: test *** */
void test(Employee e1) 
{
  Employee first = new Employee("Alex", 1500); 
  if (e1.getSalary() > firstEmp.getSalary())
  {
    Employee second = new Employee("John", 2000); 
    first = null; 
    Employee third = new Employee("Sam", 3000); 
    second = third; 
  } 
  Employee last = new Employee("Fox", 1000); 
} 
/* *** ODSAendTag: test *** */

     /* *** ODSATag: BecomingNull *** */
     Employee first = new Employee("Alex", 1500);
     first = null;
     /* *** ODSAendTag: BecomingNull *** */

     /* *** ODSATag: AnotherReference *** */
     Employee second = new Employee("John", 2000);
     Employee second = new Employee("Sam",3000);
     second = third;
     //In this case, the Employee object ("John", 2000) has no reference.
    /* *** ODSAendTag: AnotherReference *** */

    /* *** ODSATag: anonymous *** */
    //In this case when defining an object without a reference to point at like:
    new Employee("Ali", 1000);
   /* *** ODSAendTag: anonymous *** */

/* *** ODSATag: examplePointerCode *** */
void examplePointers()
{
  Employee empPtr1;
  Employee empPtr2 = null;
  empPtr1 = new Employee("John", 1000);
  empPtr2 = new Employee("Alex", 1000);
  Employee employee1 = empPtr2;
  empPtr2 = empPtr1;
  empPtr2.setName("Sam");
}
/* *** ODSAendTag: examplePointerCode *** */

/* *** ODSATag: badPointerCode *** */
Employee badPointer = null;
System.out.println(badPoint.getName()); 

/* *** ODSAendTag: badPointerCode *** */
 }
 /* *** ODSAendTag: Employee *** */
