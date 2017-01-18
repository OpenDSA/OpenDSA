public class Main {

    public static void main(String[] args) {
        // allocate three integers and two pointers
        Employee employee1 = new Employee("John");
        Employee employee2 = new Employee("Alex");
        Employee empPtr1 = null;
        Employee empPtr2;
        // Here is the state of memory at this point.
        // T1 -- Notice that the pointers start out bad.
        empPtr1 = employee1;
        // set empPtr to refer to employee1
        empPtr2 = employee2;
        // set empPtr2 to refer to employee2
        // T2 -- The pointers now have pointees
        // Now we mix things up a bit
        employee2 = empPtr2;
        // retrieve empPtr2's pointee value and put it in employee2
        empPtr2 = empPtr1;
        // change empPtr2 to share with empPtr1 (empPtr2's pointee is now employee1)
        empPtr2.setName("Sam");
        // dereference empPtr2 to set its pointee (employee1's name) to Sam (empPtr1's name is now Sam)
        // T3 -- Dereferences and assignments mix things up

    }
}
