boolean SUCCESS = true;

void doSomething(Object it) { };

void setup() {

/* *** ODSATag: PayrollTest *** */
// IDdict organizes Payroll records by ID
Dictionary IDdict = new UALdictionary();

// namedict organizes Payroll records by name
Dictionary namedict = new UALdictionary();

Payroll foo1 = new Payroll(5, "Joe", "Anytown");
Payroll foo2 = new Payroll(10, "John", "Mytown");

IDdict.insert(foo1.getID(), foo1);
IDdict.insert(foo2.getID(), foo2);
namedict.insert(foo1.getname(), foo1);
namedict.insert(foo2.getname(), foo2);

Payroll findfoo1 = (Payroll)IDdict.find(5);
Payroll findfoo2 = (Payroll)namedict.find("John");
/* *** ODSAendTag: PayrollTest *** */

  Dictionary dict = new UALdictionary();

/* *** ODSATag: Dictp4 *** */
while (dict.size() > 0) {
  Object it = dict.removeAny();
  doSomething(it);
}
/* *** ODSAendTag: Dictp4 *** */
  if (SUCCESS) {
    PrintWriter output = createWriter("success");
    output.println("Success");
    output.flush();
    output.close();
    println("Success!");
  }
  exit();
}
