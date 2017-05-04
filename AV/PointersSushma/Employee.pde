/* *** ODSATag: Employee *** */

/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
 /**
  * Employee is a class used in this tutorial to explain various references concepts
  */
/* *** ODSATag: EmployeeVars *** */"
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
     void test(Employee 1) // T1
     {
       Employee first = new Employee("Alex", 1500); //T2
       if (e1.getSalary() > firstEmp.getSalary())
       {
         Employee second = new Employee("John", 2000); //T3
         first = null; //T4
         Employee third = new Employee("Sam", 3000); //T5
         second = Third; //T6
       } //T7
       Employee last = new Employee("Fox", 1000); //T8
     } //T9
/* *** ODSAendTag: test *** */
 }
 /* *** ODSAendTag: Employee *** */
