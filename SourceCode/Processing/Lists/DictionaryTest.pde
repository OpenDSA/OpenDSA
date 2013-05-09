/* *** ODSATag: Dictp4 *** */
while (dict.size() > 0) {
  it = dict.removeAny();
  doSomething(it);
}
/* *** ODSAendTag: Dictp4 *** */

/* *** ODSATag: PayrollTest *** */
// IDdict organizes Payroll records by ID
Dictionary<Integer, Payroll> IDdict =
      new UALdictionary<Integer, Payroll>();

// namedict organizes Payroll records by name
Dictionary<String, Payroll> namedict =
      new UALdictionary<String, Payroll>();

Payroll foo1 = new Payroll(5, "Joe", "Anytown");
Payroll foo2 = new Payroll(10, "John", "Mytown");

IDdict.insert(foo1.getID(), foo1);
IDdict.insert(foo2.getID(), foo2);
namedict.insert(foo1.getname(), foo1);
namedict.insert(foo2.getname(), foo2);

Payroll findfoo1 = IDdict.find(5);
Payroll findfoo2 = namedict.find("John");
/* *** ODSAendTag: PayrollTest *** */
