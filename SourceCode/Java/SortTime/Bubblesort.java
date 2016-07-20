static void sorttime() {

setupint();
System.out.println("Bubble Sort");

System.out.println("Method Name, Array Type, Array Size, Data Distribution");

bubblesortcheck(int10,10);
System.out.println("bubblesortcheck , int,  10, random distribution,"+ totaltime);

bubblesortcheck(int10Asc,10);
System.out.println("bubblesortcheck , int,  10, ascending order, "+ totaltime);

bubblesortcheck(int10Des,10);
System.out.println("bubblesortcheck , int,  10, descending order, "+ totaltime);

bubblesortcheck(int10Ide,10);
System.out.println("bubblesortcheck , int,  10, idendical keys, "+ totaltime);

bubblesortcheck(int10FewDup,10);
System.out.println("bubblesortcheck , int,  10,Few Duplicates, "+ totaltime);

bubblesortcheck(int10SomeDup,10);
System.out.println("bubblesortcheck , int,  10,Some Duplicates, "+ totaltime);

bubblesortcheck(int10ManyDup,10);
System.out.println("bubblesortcheck , int,  10, Many Duplicates, "+ totaltime);

bubblesortcheck(int10SlightlyDis,10);
System.out.println("bubblesortcheck , int,  10,Slightly Distributed, "+ totaltime);

System.out.println();

bubblesortcheck(int100,100);
System.out.println("bubblesortcheck , int,  100,random distribution, "+totaltime);

bubblesortcheck(int100Asc,100);
System.out.println("bubblesortcheck , int,  100, ascending order, "+ totaltime);

bubblesortcheck(int100Des,100);
System.out.println("bubblesortcheck , int,  100,descending order, "+ totaltime);

bubblesortcheck(int100Ide,100);
System.out.println("bubblesortcheck , int,  100, idendical keys, "+ totaltime);

bubblesortcheck(int100FewDup,100);
System.out.println("bubblesortcheck , int,  100, Few Duplicates, "+ totaltime);

bubblesortcheck(int100SomeDup,100);
System.out.println("bubblesortcheck , int,  100,Some Duplicates,"+ totaltime);

bubblesortcheck(int100ManyDup,100);
System.out.println("bubblesortcheck , int,  100,Many Duplicates,"+ totaltime);

bubblesortcheck(int100SlightlyDis,100);
System.out.println("bubblesortcheck , int,  100, Slightly Distributed, "+ totaltime);

System.out.println();

bubblesortcheck(int1000,1000);
System.out.println("bubblesortcheck , int,  1000,random distribution: "+totaltime);

bubblesortcheck(int1000Asc,1000);
System.out.println("bubblesortcheck , int,  1000, ascending order, "+ totaltime);

bubblesortcheck(int1000Des,1000);
System.out.println("bubblesortcheck , int,  1000, descending order,"+ totaltime);

bubblesortcheck(int1000Ide,1000);
System.out.println("bubblesortcheck , int,  1000, idendical keys, "+ totaltime);

bubblesortcheck(int1000FewDup,1000);
System.out.println("bubblesortcheck , int,  1000,Few Duplicates, "+ totaltime);

bubblesortcheck(int1000SomeDup,1000);
System.out.println("bubblesortcheck , int,  1000,Some Duplicates, "+ totaltime);

bubblesortcheck(int1000SlightlyDis,1000);
System.out.println("bubblesortcheck , int,  1000,Slightly Distributed, "+ totaltime);

bubblesortcheck(int1000ManyDup,1000);
System.out.println("bubblesortcheck , int,  1000, Many Duplicates, "+ totaltime);

System.out.println();

bubblesortcheck(int10000,10000);
System.out.println("bubblesortcheck , int,  10000,random distribution,"+totaltime);

bubblesortcheck(int10000Asc,10000);
System.out.println("bubblesortcheck , int,  10000,ascending order, "+ totaltime);

bubblesortcheck(int10000Des,10000);
System.out.println("bubblesortcheck , int,  10000,descending order, "+ totaltime);

bubblesortcheck(int10000Ide,10000);
System.out.println("bubblesortcheck , int,  10000,idendical keys: "+ totaltime);

bubblesortcheck(int10000FewDup,10000);
System.out.println("bubblesortcheck , int,  10000,Few Duplicates: "+ totaltime);

bubblesortcheck(int10000SomeDup,10000);
System.out.println("bubblesortcheck , int,  10000,Some Duplicates: "+ totaltime);

bubblesortcheck(int10000SlightlyDis,10000);
System.out.println("bubblesortcheck , int,  10000,Slightly Distributed: "+ totaltime);

bubblesortcheck(int10000ManyDup,10000);
System.out.println("bubblesortcheck , int,  10000,Many Duplicates: "+ totaltime);

System.out.println();



System.out.println();


setupInteger();


bubblesortcheckInteger(size10,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer, random distribution: "+ totaltime);

bubblesortcheckInteger(size10Asc,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer, ascending order: "+ totaltime);

bubblesortcheckInteger(size10Des,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer,decreasing order: "+ totaltime);

bubblesortcheckInteger(size10Ide,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer, idendical keys: "+ totaltime);

bubblesortcheckInteger(size10FewDup,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer, Few Duplicates: "+ totaltime);

bubblesortcheckInteger(size10SomeDup,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer, Some Duplicates: "+ totaltime);

bubblesortcheckInteger(size10ManyDup,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer, Many Duplicates: "+ totaltime);

bubblesortcheckInteger(size10SlightlyDis,10);
System.out.println("bubblesortcheckInteger ,10 ,Integer,Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheckInteger(size100,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer,random distribution: "+ totaltime);

bubblesortcheckInteger(size100Asc,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer,ascending order: "+ totaltime);

bubblesortcheckInteger(size100Des,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer,decreasing order: "+ totaltime);

bubblesortcheckInteger(size100Ide,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer, idendical keys: "+ totaltime);

bubblesortcheckInteger(size100FewDup,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer ,Few Duplicates: "+ totaltime);

bubblesortcheckInteger(size100SomeDup,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer ,Some Duplicates: "+ totaltime);

bubblesortcheckInteger(size100ManyDup,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer ,Many Duplicates: "+ totaltime);

bubblesortcheckInteger(size100SlightlyDis,100);
System.out.println("bubblesortcheckInteger ,100 ,Integer, Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheckInteger(size1000,1000);
System.out.println("bubblesortcheckInteger ,1000,Integer ,random distribution: "+ totaltime);

bubblesortcheckInteger(size100Asc,1000);
System.out.println("bubblesortcheckInteger ,1000, Integer , ascending order: "+ totaltime);

bubblesortcheckInteger(size1000Des,1000);
System.out.println("bubblesortcheckInteger ,1000,Integer , decreasing order: "+ totaltime);

bubblesortcheckInteger(size1000Ide,1000);
System.out.println("bubblesortcheckInteger ,1000, Integer ,idendical keys: "+ totaltime);

bubblesortcheckInteger(size1000FewDup,1000);
System.out.println("bubblesortcheckInteger ,1000, Integer, Few Duplicates, "+ totaltime);

bubblesortcheckInteger(size1000SomeDup,1000);
System.out.println("bubblesortcheckInteger ,1000, Integer, Some Duplicates ,"+ totaltime);

bubblesortcheckInteger(size1000ManyDup,1000);
System.out.println("bubblesortcheckInteger Time for lists of size 1000 Integer Many Duplicates, "+ totaltime);

bubblesortcheckInteger(size1000SlightlyDis,1000);
System.out.println("bubblesortcheckInteger ,1000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheckInteger(size10000,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer, random distribution: "+ totaltime);

bubblesortcheckInteger(size10000Asc,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer, ascending order: "+ totaltime);

bubblesortcheckInteger(size10000Des,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer, decreasing order: "+ totaltime);

bubblesortcheckInteger(size10000Ide,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer, idendical keys: "+ totaltime);

bubblesortcheckInteger(size10000FewDup,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer,  Few Duplicates: "+ totaltime);

bubblesortcheckInteger(size10000SomeDup,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer,  Some Duplicates: "+ totaltime);

bubblesortcheckInteger(size10000ManyDup,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer,  Many Duplicates: "+ totaltime);

bubblesortcheckInteger(size10000SlightlyDis,10000);
System.out.println("bubblesortcheckInteger ,1000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();


System.out.println();

setupDouble();

bubblesortcheckDouble(dsize10Asc,10);
System.out.println("bubblesortcheckDouble ,10, double , ascending order: "+ totaltime);

bubblesortcheckDouble(dsize10Des,10);
System.out.println("bubblesortcheckDouble ,10, double , decreasing order: "+ totaltime);

bubblesortcheckDouble(dsize10Ide,10);
System.out.println("bubblesortcheckDouble ,10, double ,idendical keys: "+ totaltime);

bubblesortcheckDouble(dsize10FewDup,10);
System.out.println("bubblesortcheckDouble ,10, double , Few Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize10SomeDup,10);
System.out.println("bubblesortcheckDouble ,10, double , Some Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize10ManyDup,10);
System.out.println("bubblesortcheckDouble ,10, double , Many Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize10SlightlyDis,10);
System.out.println("bubblesortcheckDouble ,10, double , Slightly Disordered: "+ totaltime);


System.out.println();

bubblesortcheckDouble(dsize100Asc,100);
System.out.println("bubblesortcheckDouble ,100, double , ascending order: "+ totaltime);

bubblesortcheckDouble(dsize100Des,100);
System.out.println("bubblesortcheckDouble ,100, double , decreasing order: "+ totaltime);

bubblesortcheckDouble(dsize100Ide,100);
System.out.println("bubblesortcheckDouble ,100, double , idendical keys: "+ totaltime);

bubblesortcheckDouble(dsize100FewDup,100);
System.out.println("bubblesortcheckDouble ,100, double , Few Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize100SomeDup,100);
System.out.println("bubblesortcheckDouble ,100, double ,  Some Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize100ManyDup,100);
System.out.println("bubblesortcheckDouble ,100, double ,  Many Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize100SlightlyDis,100);
System.out.println("bubblesortcheckDouble ,100, double ,  Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheckDouble(dsize1000Asc,1000);
System.out.println("bubblesortcheckDouble ,1000, double , ascending order: "+ totaltime);

bubblesortcheckDouble(dsize1000Des,1000);
System.out.println("bubblesortcheckDouble ,1000, double , decreasing order: "+ totaltime);

bubblesortcheckDouble(dsize1000Ide,1000);
System.out.println("bubblesortcheckDouble ,1000, double , idendical keys: "+ totaltime);

bubblesortcheckDouble(dsize1000FewDup,1000);
System.out.println("bubblesortcheckDouble ,1000, double , Few Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize1000SomeDup,1000);
System.out.println("bubblesortcheckDouble ,1000, double , Some Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize1000ManyDup,1000);
System.out.println("bubblesortcheckDouble ,1000, double , Many Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize1000SlightlyDis,1000);
System.out.println("bubblesortcheckDouble ,1000, double , Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheckDouble(dsize10000Asc,10000);
System.out.println("bubblesortcheckDouble ,10000, double , ascending order: "+ totaltime);

bubblesortcheckDouble(dsize10000Des,10000);
System.out.println("bubblesortcheckDouble ,10000, double ,decreasing order: "+ totaltime);

bubblesortcheckDouble(dsize10000Ide,10000);
System.out.println("bubblesortcheckDouble ,10000, double , idendical keys: "+ totaltime);

bubblesortcheckDouble(dsize10000FewDup,10000);
System.out.println("bubblesortcheckDouble ,10000, double , Few Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize10000SomeDup,10000);
System.out.println("bubblesortcheckDouble ,10000, double ,Some Duplicates: "+ totaltime);

bubblesortcheckDouble(dsize10000ManyDup,10000);
System.out.println("bubblesortcheckDouble ,10000, double ,Many Duplicates: "+ totaltime);



bubblesortcheckDouble(dsize10000SlightlyDis,10000);
System.out.println("bubblesortcheckDouble ,10000, double , Slightly Disordered: "+ totaltime);

System.out.println();


setupint();


bubblesortcheck2(int10,10);
System.out.println("bubblesortcheck2,int, 10,random distribution, "+ totaltime);

bubblesortcheck2(int10Asc,10);
System.out.println("bubblesortcheck2,int, 10, ascending order: "+ totaltime);

bubblesortcheck2(int10Des,10);
System.out.println("bubblesortcheck2,int, 10,descending order: "+ totaltime);

bubblesortcheck2(int10Ide,10);
System.out.println("bubblesortcheck2,int, 10,idendical keys: "+ totaltime);

bubblesortcheck2(int10FewDup,10);
System.out.println("bubblesortcheck2,int, 10, Few Duplicates: "+ totaltime);

bubblesortcheck2(int10SomeDup,10);
System.out.println("bubblesortcheck2,int, 10,Some Duplicates: "+ totaltime);

bubblesortcheck2(int10ManyDup,10);
System.out.println("bubblesortcheck2,int, 10,Many Duplicates: "+ totaltime);

bubblesortcheck2(int10SlightlyDis,10);
System.out.println("bubblesortcheck2,int, 10, Slightly Distributed: "+ totaltime);

System.out.println();

bubblesortcheck2(int100,100);
System.out.println("bubblesortcheck2,int, 100,random distribution: "+totaltime);

bubblesortcheck2(int100Asc,100);
System.out.println("bubblesortcheck2,int, 100, ascending order: "+ totaltime);

bubblesortcheck2(int100Des,100);
System.out.println("bubblesortcheck2,int, 100, descending order: "+ totaltime);

bubblesortcheck2(int100Ide,100);
System.out.println("bubblesortcheck2,int, 100, idendical keys: "+ totaltime);

bubblesortcheck2(int100FewDup,100);
System.out.println("bubblesortcheck2,int, 100, Few Duplicates: "+ totaltime);

bubblesortcheck2(int100SomeDup,100);
System.out.println("bubblesortcheck2,int, 100, Some Duplicates: "+ totaltime);

bubblesortcheck2(int100ManyDup,100);
System.out.println("bubblesortcheck2,int, 100, Many Duplicates: "+ totaltime);

bubblesortcheck2(int100SlightlyDis,100);
System.out.println("bubblesortcheck2,int, 100, Slightly Distributed: "+ totaltime);

System.out.println();

bubblesortcheck2(int1000,1000);
System.out.println("bubblesortcheck2,int, 1000,random distribution, "+totaltime);

bubblesortcheck2(int1000Asc,1000);
System.out.println("bubblesortcheck2,int, 1000, ascending order: "+ totaltime);

bubblesortcheck2(int1000Des,1000);
System.out.println("bubblesortcheck2,int, 1000, descending order: "+ totaltime);

bubblesortcheck2(int1000Ide,1000);
System.out.println("bubblesortcheck2,int, 1000,idendical keys: "+ totaltime);

bubblesortcheck2(int1000FewDup,1000);
System.out.println("bubblesortcheck2,int, 1000,Few Duplicates: "+ totaltime);

bubblesortcheck2(int1000SomeDup,1000);
System.out.println("bubblesortcheck2,int, 1000, Some Duplicates: "+ totaltime);

bubblesortcheck2(int1000SlightlyDis,1000);
System.out.println("bubblesortcheck2,int, 1000, Slightly Distributed: "+ totaltime);

bubblesortcheck2(int1000ManyDup,1000);
System.out.println("bubblesortcheck2,int, 1000, Many Duplicates: "+ totaltime);

System.out.println();

bubblesortcheck2(int10000,10000);
System.out.println("bubblesortcheck2,int, 10000,random distribution: "+totaltime);

bubblesortcheck2(int10000Asc,10000);
System.out.println("bubblesortcheck2,int, 10000,ascending order: "+ totaltime);

bubblesortcheck2(int10000Des,10000);
System.out.println("bubblesortcheck2,int, 10000, descending order: "+ totaltime);

bubblesortcheck2(int10000Ide,10000);
System.out.println("bubblesortcheck2,int, 10000, idendical keys: "+ totaltime);

bubblesortcheck2(int10000FewDup,10000);
System.out.println("bubblesortcheck2,int, 10000, Few Duplicates: "+ totaltime);

bubblesortcheck2(int10000SomeDup,10000);
System.out.println("bubblesortcheck2,int, 10000, Some Duplicates: "+ totaltime);

bubblesortcheck2(int10000SlightlyDis,10000);
System.out.println("bubblesortcheck2,int, 10000, Slightly Distributed: "+ totaltime);

bubblesortcheck2(int10000ManyDup,10000);
System.out.println("bubblesortcheck2,int, 10000, Many Duplicates: "+ totaltime);

System.out.println();

System.out.println();


System.out.println();


setupInteger();


bubblesortcheck2Integer(size10,10);
System.out.println("bubblesortcheck2Integer , 10, Integer, random distribution: "+ totaltime);

bubblesortcheck2Integer(size10Asc,10);
System.out.println("bubblesortcheck2Integer , 10, Integer, ascending order: "+ totaltime);

bubblesortcheck2Integer(size10Des,10);
System.out.println("bubblesortcheck2Integer , 10, Integer, decreasing order: "+ totaltime);

bubblesortcheck2Integer(size10Ide,10);
System.out.println("bubblesortcheck2Integer , 10, Integer, idendical keys: "+ totaltime);

bubblesortcheck2Integer(size10FewDup,10);
System.out.println("bubblesortcheck2Integer , 10, Integer,Few Duplicates: "+ totaltime);

bubblesortcheck2Integer(size10SomeDup,10);
System.out.println("bubblesortcheck2Integer , 10, Integer, Some Duplicates: "+ totaltime);

bubblesortcheck2Integer(size10ManyDup,10);
System.out.println("bubblesortcheck2Integer , 10, Integer, Many Duplicates: "+ totaltime);

bubblesortcheck2Integer(size10SlightlyDis,10);
System.out.println("bubblesortcheck2Integer , 10, Integer,Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheck2Integer(size100,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, random distribution: "+ totaltime);

bubblesortcheck2Integer(size100Asc,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, ascending order: "+ totaltime);

bubblesortcheck2Integer(size100Des,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, decreasing order: "+ totaltime);

bubblesortcheck2Integer(size100Ide,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, idendical keys: "+ totaltime);

bubblesortcheck2Integer(size100FewDup,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, Few Duplicates: "+ totaltime);

bubblesortcheck2Integer(size100SomeDup,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, Some Duplicates: "+ totaltime);

bubblesortcheck2Integer(size100ManyDup,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, Many Duplicates: "+ totaltime);

bubblesortcheck2Integer(size100SlightlyDis,100);
System.out.println("bubblesortcheck2Integer , 100, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheck2Integer(size1000,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer, random distribution: "+ totaltime);

bubblesortcheck2Integer(size100Asc,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer,  ascending order: "+ totaltime);

bubblesortcheck2Integer(size1000Des,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer,  decreasing order: "+ totaltime);

bubblesortcheck2Integer(size1000Ide,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer,  idendical keys: "+ totaltime);

bubblesortcheck2Integer(size1000FewDup,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer, Few Duplicates "+ totaltime);

bubblesortcheck2Integer(size1000SomeDup,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer,  Some Duplicates "+ totaltime);

bubblesortcheck2Integer(size1000ManyDup,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer,  Many Duplicates "+ totaltime);

bubblesortcheck2Integer(size1000SlightlyDis,1000);
System.out.println("bubblesortcheck2Integer , 1000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheck2Integer(size10000,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer,  random distribution: "+ totaltime);

bubblesortcheck2Integer(size10000Asc,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer,  ascending order: "+ totaltime);

bubblesortcheck2Integer(size10000Des,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer,  decreasing order: "+ totaltime);

bubblesortcheck2Integer(size10000Ide,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer, idendical keys: "+ totaltime);

bubblesortcheck2Integer(size10000FewDup,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer,  Few Duplicates: "+ totaltime);

bubblesortcheck2Integer(size10000SomeDup,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer,  Some Duplicates: "+ totaltime);

bubblesortcheck2Integer(size10000ManyDup,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer,  Many Duplicates: "+ totaltime);

bubblesortcheck2Integer(size10000SlightlyDis,10000);
System.out.println("bubblesortcheck2Integer , 10000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();


System.out.println();

setupDouble();

bubblesortcheck2Double(dsize10Asc,10);
System.out.println("bubblesortcheck2Double , 10 ,double , ascending order: "+ totaltime);

bubblesortcheck2Double(dsize10Des,10);
System.out.println("bubblesortcheck2Double , 10 ,double ,decreasing order: "+ totaltime);

bubblesortcheck2Double(dsize10Ide,10);
System.out.println("bubblesortcheck2Double , 10 ,double ,idendical keys: "+ totaltime);

bubblesortcheck2Double(dsize10FewDup,10);
System.out.println("bubblesortcheck2Double , 10 ,double , Few Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize10SomeDup,10);
System.out.println("bubblesortcheck2Double , 10 ,double ,Some Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize10ManyDup,10);
System.out.println("bubblesortcheck2Double , 10 ,double , Many Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize10SlightlyDis,10);
System.out.println("bubblesortcheck2Double , 10 ,double ,Slightly Disordered: "+ totaltime);


System.out.println();

bubblesortcheck2Double(dsize100Asc,100);
System.out.println("bubblesortcheck2Double , 100 ,double , ascending order: "+ totaltime);

bubblesortcheck2Double(dsize100Des,100);
System.out.println("bubblesortcheck2Double , 100 ,double ,decreasing order: "+ totaltime);

bubblesortcheck2Double(dsize100Ide,100);
System.out.println("bubblesortcheck2Double , 100 ,double , idendical keys: "+ totaltime);

bubblesortcheck2Double(dsize100FewDup,100);
System.out.println("bubblesortcheck2Double , 100 ,double ,Few Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize100SomeDup,100);
System.out.println("bubblesortcheck2Double , 100 ,double , Some Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize100ManyDup,100);
System.out.println("bubblesortcheck2Double , 100 ,double , Many Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize100SlightlyDis,100);
System.out.println("bubblesortcheck2Double , 100 ,double , Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheck2Double(dsize1000Asc,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double , ascending order: "+ totaltime);

bubblesortcheck2Double(dsize1000Des,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double , decreasing order: "+ totaltime);

bubblesortcheck2Double(dsize1000Ide,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double ,idendical keys: "+ totaltime);

bubblesortcheck2Double(dsize1000FewDup,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double ,Few Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize1000SomeDup,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double , Some Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize1000ManyDup,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double , Many Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize1000SlightlyDis,1000);
System.out.println("bubblesortcheck2Double , 1000 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortcheck2Double(dsize10000Asc,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double ,ascending order: "+ totaltime);

bubblesortcheck2Double(dsize10000Des,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double ,decreasing order: "+ totaltime);

bubblesortcheck2Double(dsize10000Ide,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double , idendical keys: "+ totaltime);

bubblesortcheck2Double(dsize10000FewDup,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double ,Few Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize10000SomeDup,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double ,Some Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize10000ManyDup,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double , Many Duplicates: "+ totaltime);

bubblesortcheck2Double(dsize10000SlightlyDis,10000);
System.out.println("bubblesortcheck2Double , 10000 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

System.out.println();

System.out.println();

setupInteger();


bubblecheckswap(size10,10);
System.out.println("bubblecheckswap ,10 ,Integer ,random distribution: "+ totaltime);

bubblecheckswap(size10Asc,10);
System.out.println("bubblecheckswap ,10 ,Integer , ascending order: "+ totaltime);

bubblecheckswap(size10Des,10);
System.out.println("bubblecheckswap ,10 ,Integer , decreasing order: "+ totaltime);

bubblecheckswap(size10Ide,10);
System.out.println("bubblecheckswap ,10 ,Integer , idendical keys: "+ totaltime);

bubblecheckswap(size10FewDup,10);
System.out.println("bubblecheckswap ,10 ,Integer , Few Duplicates: "+ totaltime);

bubblecheckswap(size10SomeDup,10);
System.out.println("bubblecheckswap ,10 ,Integer , Some Duplicates: "+ totaltime);

bubblecheckswap(size10ManyDup,10);
System.out.println("bubblecheckswap ,10 ,Integer ,Many Duplicates: "+ totaltime);

bubblecheckswap(size10SlightlyDis,10);
System.out.println("bubblecheckswap ,10 ,Integer ,Slightly Disordered: "+ totaltime);

System.out.println();

bubblecheckswap(size100,100);
System.out.println("bubblecheckswap ,100 ,Integer ,random distribution: "+ totaltime);

bubblecheckswap(size100Asc,100);
System.out.println("bubblecheckswap ,100 ,Integer , ascending order: "+ totaltime);

bubblecheckswap(size100Des,100);
System.out.println("bubblecheckswap ,100 ,Integer ,decreasing order: "+ totaltime);

bubblecheckswap(size100Ide,100);
System.out.println("bubblecheckswap ,100 ,Integer ,idendical keys: "+ totaltime);

bubblecheckswap(size100FewDup,100);
System.out.println("bubblecheckswap ,100 ,Integer ,Few Duplicates: "+ totaltime);

bubblecheckswap(size100SomeDup,100);
System.out.println("bubblecheckswap ,100 ,Integer ,Some Duplicates: "+ totaltime);

bubblecheckswap(size100ManyDup,100);
System.out.println("bubblecheckswap ,100 ,Integer ,Many Duplicates: "+ totaltime);

bubblecheckswap(size100SlightlyDis,100);
System.out.println("bubblecheckswap ,100 ,Integer , Slightly Disordered: "+ totaltime);

System.out.println();

bubblecheckswap(size1000,1000);
System.out.println("bubblecheckswap ,1000 ,Integer ,random distribution: "+ totaltime);

bubblecheckswap(size100Asc,1000);
System.out.println("bubblecheckswap ,1000 ,Integer , ascending order: "+ totaltime);

bubblecheckswap(size1000Des,1000);
System.out.println("bubblecheckswap ,1000 ,Integer , decreasing order: "+ totaltime);

bubblecheckswap(size1000Ide,1000);
System.out.println("bubblecheckswap ,1000 ,Integer , idendical keys: "+ totaltime);

bubblecheckswap(size1000FewDup,1000);
System.out.println("bubblecheckswap ,1000 ,Integer , Few Duplicates "+ totaltime);

bubblecheckswap(size1000SomeDup,1000);
System.out.println("bubblecheckswap ,1000 ,Integer , Some Duplicates "+ totaltime);

bubblecheckswap(size1000ManyDup,1000);
System.out.println("bubblecheckswap ,1000 ,Integer ,Many Duplicates "+ totaltime);

bubblecheckswap(size1000SlightlyDis,1000);
System.out.println("bubblecheckswap ,1000 ,Integer , Slightly Disordered: "+ totaltime);

System.out.println();

bubblecheckswap(size10000,10000);
System.out.println("bubblecheckswap ,10000 ,Integer , random distribution: "+ totaltime);

bubblecheckswap(size10000Asc,10000);
System.out.println("bubblecheckswap ,10000 ,Integer ,ascending order: "+ totaltime);

bubblecheckswap(size10000Des,10000);
System.out.println("bubblecheckswap ,10000 ,Integer , decreasing order: "+ totaltime);

bubblecheckswap(size10000Ide,10000);
System.out.println("bubblecheckswap ,10000 ,Integer , idendical keys: "+ totaltime);

bubblecheckswap(size10000FewDup,10000);
System.out.println("bubblecheckswap ,10000 ,Integer , Few Duplicates: "+ totaltime);

bubblecheckswap(size10000SomeDup,10000);
System.out.println("bubblecheckswap ,10000 ,Integer ,Some Duplicates: "+ totaltime);

bubblecheckswap(size10000ManyDup,10000);
System.out.println("bubblecheckswap ,10000 ,Integer , Many Duplicates: "+ totaltime);

bubblecheckswap(size10000SlightlyDis,10000);
System.out.println("bubblecheckswap ,10000 ,Integer , Slightly Disordered: "+ totaltime);

System.out.println();


setupint();


bubblecheckswapInt(int10,10);
System.out.println("bubblecheckswapInt, 10, int, random distribution, "+ totaltime);

bubblecheckswapInt(int10Asc,10);
System.out.println("bubblecheckswapInt, 10, int,  ascending order: "+ totaltime);

bubblecheckswapInt(int10Des,10);
System.out.println("bubblecheckswapInt, 10, int, descending order: "+ totaltime);

bubblecheckswapInt(int10Ide,10);
System.out.println("bubblecheckswapInt, 10, int, idendical keys: "+ totaltime);

bubblecheckswapInt(int10FewDup,10);
System.out.println("bubblecheckswapInt, 10, int,  Few Duplicates: "+ totaltime);

bubblecheckswapInt(int10SomeDup,10);
System.out.println("bubblecheckswapInt, 10, int,  Some Duplicates: "+ totaltime);

bubblecheckswapInt(int10ManyDup,10);
System.out.println("bubblecheckswapInt, 10, int,  Many Duplicates: "+ totaltime);

bubblecheckswapInt(int10SlightlyDis,10);
System.out.println("bubblecheckswapInt, 10, int,  Slightly Distributed: "+ totaltime);

System.out.println();

bubblecheckswapInt(int100,100);
System.out.println("bubblecheckswapInt, 100, int, random distribution: "+totaltime);

bubblecheckswapInt(int100Asc,100);
System.out.println("bubblecheckswapInt, 100, int, ascending order: "+ totaltime);

bubblecheckswapInt(int100Des,100);
System.out.println("bubblecheckswapInt, 100, int, descending order: "+ totaltime);

bubblecheckswapInt(int100Ide,100);
System.out.println("bubblecheckswapInt, 100, int, idendical keys: "+ totaltime);

bubblecheckswapInt(int100FewDup,100);
System.out.println("bubblecheckswapInt, 100, int, Few Duplicates: "+ totaltime);

bubblecheckswapInt(int100SomeDup,100);
System.out.println("bubblecheckswapInt, 100, int,Some Duplicates: "+ totaltime);

bubblecheckswapInt(int100ManyDup,100);
System.out.println("bubblecheckswapInt, 100, int, Many Duplicates: "+ totaltime);

bubblecheckswapInt(int100SlightlyDis,100);
System.out.println("bubblecheckswapInt, 100, int, Slightly Distributed: "+ totaltime);

System.out.println();

bubblecheckswapInt(int1000,1000);
System.out.println("bubblecheckswapInt, 1000, int,random distribution: "+totaltime);

bubblecheckswapInt(int1000Asc,1000);
System.out.println("bubblecheckswapInt, 1000, int, ascending order: "+ totaltime);

bubblecheckswapInt(int1000Des,1000);
System.out.println("bubblecheckswapInt, 1000, int, descending order: "+ totaltime);

bubblecheckswapInt(int1000Ide,1000);
System.out.println("bubblecheckswapInt, 1000, int, idendical keys: "+ totaltime);

bubblecheckswapInt(int1000FewDup,1000);
System.out.println("bubblecheckswapInt, 1000, int, Few Duplicates: "+ totaltime);

bubblecheckswapInt(int1000SomeDup,1000);
System.out.println("bubblecheckswapInt, 1000, int, Some Duplicates: "+ totaltime);

bubblecheckswapInt(int1000SlightlyDis,1000);
System.out.println("bubblecheckswapInt, 1000, int,Slightly Distributed: "+ totaltime);

bubblecheckswapInt(int1000ManyDup,1000);
System.out.println("bubblecheckswapInt, 1000, int, Many Duplicates: "+ totaltime);

System.out.println();

bubblecheckswapInt(int10000,10000);
System.out.println("bubblecheckswapInt, 10000, int,random distribution: "+totaltime);

bubblecheckswapInt(int10000Asc,10000);
System.out.println("bubblecheckswapInt, 10000, int, ascending order: "+ totaltime);

bubblecheckswapInt(int10000Des,10000);
System.out.println("bubblecheckswapInt, 10000, int, descending order: "+ totaltime);

bubblecheckswapInt(int10000Ide,10000);
System.out.println("bubblecheckswapInt, 10000, int,idendical keys: "+ totaltime);

bubblecheckswapInt(int10000FewDup,10000);
System.out.println("bubblecheckswapInt, 10000, int, Few Duplicates: "+ totaltime);

bubblecheckswapInt(int10000SomeDup,10000);
System.out.println("bubblecheckswapInt, 10000, int, Some Duplicates: "+ totaltime);

bubblecheckswapInt(int10000SlightlyDis,10000);
System.out.println("bubblecheckswapInt, 10000, int,Slightly Distributed: "+ totaltime);

bubblecheckswapInt(int10000ManyDup,10000);
System.out.println("bubblecheckswapInt, 10000, int, Many Duplicates: "+ totaltime);

System.out.println();

System.out.println();


System.out.println();

setupDouble();

bubblecheckswapDouble(dsize10Asc,10);
System.out.println("bubblecheckswapDouble , 10 ,double , ascending order: "+ totaltime);

bubblecheckswapDouble(dsize10Des,10);
System.out.println("bubblecheckswapDouble , 10 ,double , decreasing order: "+ totaltime);

bubblecheckswapDouble(dsize10Ide,10);
System.out.println("bubblecheckswapDouble , 10 ,double , idendical keys: "+ totaltime);

bubblecheckswapDouble(dsize10FewDup,10);
System.out.println("bubblecheckswapDouble , 10 ,double , Few Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize10SomeDup,10);
System.out.println("bubblecheckswapDouble , 10 ,double , Some Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize10ManyDup,10);
System.out.println("bubblecheckswapDouble , 10 ,double ,Many Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize10SlightlyDis,10);
System.out.println("bubblecheckswapDouble , 10 ,double , Slightly Disordered: "+ totaltime);


System.out.println();

bubblecheckswapDouble(dsize100Asc,100);
System.out.println("bubblecheckswapDouble , 100 ,double , ascending order: "+ totaltime);

bubblecheckswapDouble(dsize100Des,100);
System.out.println("bubblecheckswapDouble , 100 ,double ,  decreasing order: "+ totaltime);

bubblecheckswapDouble(dsize100Ide,100);
System.out.println("bubblecheckswapDouble , 100 ,double ,  idendical keys: "+ totaltime);

bubblecheckswapDouble(dsize100FewDup,100);
System.out.println("bubblecheckswapDouble , 100 ,double , Few Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize100SomeDup,100);
System.out.println("bubblecheckswapDouble , 100 ,double , Some Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize100ManyDup,100);
System.out.println("bubblecheckswapDouble , 100 ,double ,  Many Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize100SlightlyDis,100);
System.out.println("bubblecheckswapDouble , 100 ,double , Slightly Disordered: "+ totaltime);

System.out.println();

bubblecheckswapDouble(dsize1000Asc,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double , ascending order: "+ totaltime);

bubblecheckswapDouble(dsize1000Des,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double , decreasing order: "+ totaltime);

bubblecheckswapDouble(dsize1000Ide,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double ,idendical keys: "+ totaltime);

bubblecheckswapDouble(dsize1000FewDup,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double , Few Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize1000SomeDup,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double , Some Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize1000ManyDup,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double ,Many Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize1000SlightlyDis,1000);
System.out.println("bubblecheckswapDouble , 1000 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

bubblecheckswapDouble(dsize10000Asc,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double , ascending order: "+ totaltime);

bubblecheckswapDouble(dsize10000Des,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double , decreasing order: "+ totaltime);

bubblecheckswapDouble(dsize10000Ide,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double , idendical keys: "+ totaltime);

bubblecheckswapDouble(dsize10000FewDup,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double , Few Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize10000SomeDup,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double ,Some Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize10000ManyDup,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double , Many Duplicates: "+ totaltime);

bubblecheckswapDouble(dsize10000SlightlyDis,10000);
System.out.println("bubblecheckswapDouble , 10000 ,double , Slightly Disordered: "+ totaltime);

System.out.println();

System.out.println();
// inssort
setupint();


unwikipedia(int10,10);
System.out.println("unwikipedia , 10,int,random distribution: "+ totaltime);

unwikipedia(int10Asc,10);
System.out.println("unwikipedia , 10,int, ascending order: "+ totaltime);

unwikipedia(int10Des,10);
System.out.println("unwikipedia , 10,int, descending order: "+ totaltime);

unwikipedia(int10Ide,10);
System.out.println("unwikipedia , 10,int,idendical keys: "+ totaltime);

unwikipedia(int10FewDup,10);
System.out.println("unwikipedia , 10,int,Few Duplicates: "+ totaltime);

unwikipedia(int10SomeDup,10);
System.out.println("unwikipedia , 10,int,Some Duplicates: "+ totaltime);

unwikipedia(int10ManyDup,10);
System.out.println("unwikipedia , 10,int, Many Duplicates: "+ totaltime);

unwikipedia(int10SlightlyDis,10);
System.out.println("unwikipedia , 10,int, Slightly Distributed: "+ totaltime);

System.out.println();

unwikipedia(int100,100);
System.out.println("unwikipedia , 100,int, random distribution: "+totaltime);

unwikipedia(int100Asc,100);
System.out.println("unwikipedia , 100,int, ascending order: "+ totaltime);

unwikipedia(int100Des,100);
System.out.println("unwikipedia , 100,int, descending order: "+ totaltime);

unwikipedia(int100Ide,100);
System.out.println("unwikipedia , 100,int, idendical keys: "+ totaltime);

unwikipedia(int100FewDup,100);
System.out.println("unwikipedia , 100,int,Few Duplicates: "+ totaltime);

unwikipedia(int100SomeDup,100);
System.out.println("unwikipedia , 100,int, Some Duplicates: "+ totaltime);

unwikipedia(int100ManyDup,100);
System.out.println("unwikipedia , 100,int,Many Duplicates: "+ totaltime);

unwikipedia(int100SlightlyDis,100);
System.out.println("unwikipedia , 100,int, Slightly Distributed: "+ totaltime);

System.out.println();

unwikipedia(int1000,1000);
System.out.println("unwikipedia , 1000,int,random distribution: "+totaltime);

unwikipedia(int1000Asc,1000);
System.out.println("unwikipedia , 1000,int, ascending order: "+ totaltime);

unwikipedia(int1000Des,1000);
System.out.println("unwikipedia , 1000,int,descending order: "+ totaltime);

unwikipedia(int1000Ide,1000);
System.out.println("unwikipedia , 1000,int, idendical keys: "+ totaltime);

unwikipedia(int1000FewDup,1000);
System.out.println("unwikipedia , 1000,int,Few Duplicates: "+ totaltime);

unwikipedia(int1000SomeDup,1000);
System.out.println("unwikipedia , 1000,int,Some Duplicates: "+ totaltime);

unwikipedia(int1000SlightlyDis,1000);
System.out.println("unwikipedia , 1000,int, Slightly Distributed: "+ totaltime);

unwikipedia(int1000ManyDup,1000);
System.out.println("unwikipedia , 1000,int, Many Duplicates: "+ totaltime);

System.out.println();

unwikipedia(int10000,10000);
System.out.println("unwikipedia , 10000,int,random distribution: "+totaltime);

unwikipedia(int10000Asc,10000);
System.out.println("unwikipedia , 10000,int, ascending order: "+ totaltime);

unwikipedia(int10000Des,10000);
System.out.println("unwikipedia , 10000,int, descending order: "+ totaltime);

unwikipedia(int10000Ide,10000);
System.out.println("unwikipedia , 10000,int, idendical keys: "+ totaltime);

unwikipedia(int10000FewDup,10000);
System.out.println("unwikipedia , 10000,int,Few Duplicates: "+ totaltime);

unwikipedia(int10000SomeDup,10000);
System.out.println("unwikipedia , 10000,int,Some Duplicates: "+ totaltime);

unwikipedia(int10000SlightlyDis,10000);
System.out.println("unwikipedia , 10000,int, Slightly Distributed: "+ totaltime);

unwikipedia(int10000ManyDup,10000);
System.out.println("unwikipedia , 10000,int, Many Duplicates: "+ totaltime);

System.out.println();


System.out.println();


setupInteger();


unwikipediaInteger(size10,10);
System.out.println("unwikipediaInteger , 10 ,Integer ,random distribution: "+ totaltime);

unwikipediaInteger(size10Asc,10);
System.out.println("unwikipediaInteger , 10 ,Integer ,ascending order: "+ totaltime);

unwikipediaInteger(size10Des,10);
System.out.println("unwikipediaInteger , 10 ,Integer , decreasing order: "+ totaltime);

unwikipediaInteger(size10Ide,10);
System.out.println("unwikipediaInteger , 10 ,Integer ,idendical keys: "+ totaltime);

unwikipediaInteger(size10FewDup,10);
System.out.println("unwikipediaInteger , 10 ,Integer , Few Duplicates: "+ totaltime);

unwikipediaInteger(size10SomeDup,10);
System.out.println("unwikipediaInteger , 10 ,Integer , Some Duplicates: "+ totaltime);

unwikipediaInteger(size10ManyDup,10);
System.out.println("unwikipediaInteger , 10 ,Integer , Many Duplicates: "+ totaltime);

unwikipediaInteger(size10SlightlyDis,10);
System.out.println("unwikipediaInteger , 10 ,Integer , Slightly Disordered: "+ totaltime);

System.out.println();

unwikipediaInteger(size100,100);
System.out.println("unwikipediaInteger , 100 ,Integer , random distribution: "+ totaltime);

unwikipediaInteger(size100Asc,100);
System.out.println("unwikipediaInteger , 100 ,Integer , ascending order: "+ totaltime);

unwikipediaInteger(size100Des,100);
System.out.println("unwikipediaInteger , 100 ,Integer ,  decreasing order: "+ totaltime);

unwikipediaInteger(size100Ide,100);
System.out.println("unwikipediaInteger , 100 ,Integer , idendical keys: "+ totaltime);

unwikipediaInteger(size100FewDup,100);
System.out.println("unwikipediaInteger , 100 ,Integer , Few Duplicates: "+ totaltime);

unwikipediaInteger(size100SomeDup,100);
System.out.println("unwikipediaInteger , 100 ,Integer , Some Duplicates: "+ totaltime);

unwikipediaInteger(size100ManyDup,100);
System.out.println("unwikipediaInteger , 100 ,Integer ,  Many Duplicates: "+ totaltime);

unwikipediaInteger(size100SlightlyDis,100);
System.out.println("unwikipediaInteger , 100 ,Integer ,  Slightly Disordered: "+ totaltime);

System.out.println();

unwikipediaInteger(size1000,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer , random distribution: "+ totaltime);

unwikipediaInteger(size100Asc,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer ,ascending order: "+ totaltime);

unwikipediaInteger(size1000Des,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer ,decreasing order: "+ totaltime);

unwikipediaInteger(size1000Ide,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer ,idendical keys: "+ totaltime);

unwikipediaInteger(size1000FewDup,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer ,Few Duplicates "+ totaltime);

unwikipediaInteger(size1000SomeDup,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer , Some Duplicates "+ totaltime);

unwikipediaInteger(size1000ManyDup,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer , Many Duplicates "+ totaltime);

unwikipediaInteger(size1000SlightlyDis,1000);
System.out.println("unwikipediaInteger , 1000 ,Integer , Slightly Disordered: "+ totaltime);

System.out.println();

unwikipediaInteger(size10000,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer , random distribution: "+ totaltime);

unwikipediaInteger(size10000Asc,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer ,  ascending order: "+ totaltime);

unwikipediaInteger(size10000Des,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer ,  decreasing order: "+ totaltime);

unwikipediaInteger(size10000Ide,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer ,  idendical keys: "+ totaltime);

unwikipediaInteger(size10000FewDup,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer , Few Duplicates: "+ totaltime);

unwikipediaInteger(size10000SomeDup,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer ,  Some Duplicates: "+ totaltime);

unwikipediaInteger(size10000ManyDup,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer ,  Many Duplicates: "+ totaltime);

unwikipediaInteger(size10000SlightlyDis,10000);
System.out.println("unwikipediaInteger , 10000 ,Integer , Slightly Disordered: "+ totaltime);

System.out.println();


System.out.println();

setupDouble();

unwikipediaDouble(dsize10Asc,10);
System.out.println("unwikipediaDouble,10 ,double , ascending order: "+ totaltime);

unwikipediaDouble(dsize10Des,10);
System.out.println("unwikipediaDouble,10 ,double , decreasing order: "+ totaltime);

unwikipediaDouble(dsize10Ide,10);
System.out.println("unwikipediaDouble,10 ,double ,idendical keys: "+ totaltime);

unwikipediaDouble(dsize10FewDup,10);
System.out.println("unwikipediaDouble,10 ,double , Few Duplicates: "+ totaltime);

unwikipediaDouble(dsize10SomeDup,10);
System.out.println("unwikipediaDouble,10 ,double , Some Duplicates: "+ totaltime);

unwikipediaDouble(dsize10ManyDup,10);
System.out.println("unwikipediaDouble,10 ,double ,Many Duplicates: "+ totaltime);

unwikipediaDouble(dsize10SlightlyDis,10);
System.out.println("unwikipediaDouble,10 ,double ,Slightly Disordered: "+ totaltime);


System.out.println();

unwikipediaDouble(dsize100Asc,100);
System.out.println("unwikipediaDouble,100 ,double , ascending order: "+ totaltime);

unwikipediaDouble(dsize100Des,100);
System.out.println("unwikipediaDouble,100 ,double , decreasing order: "+ totaltime);

unwikipediaDouble(dsize100Ide,100);
System.out.println("unwikipediaDouble,100 ,double , idendical keys: "+ totaltime);

unwikipediaDouble(dsize100FewDup,100);
System.out.println("unwikipediaDouble,100 ,double , Few Duplicates: "+ totaltime);

unwikipediaDouble(dsize100SomeDup,100);
System.out.println("unwikipediaDouble,100 ,double , Some Duplicates: "+ totaltime);

unwikipediaDouble(dsize100ManyDup,100);
System.out.println("unwikipediaDouble,100 ,double , Many Duplicates: "+ totaltime);

unwikipediaDouble(dsize100SlightlyDis,100);
System.out.println("unwikipediaDouble,100 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

unwikipediaDouble(dsize1000Asc,1000);
System.out.println("unwikipediaDouble,1000 ,double ,ascending order: "+ totaltime);

unwikipediaDouble(dsize1000Des,1000);
System.out.println("unwikipediaDouble,1000 ,double , decreasing order: "+ totaltime);

unwikipediaDouble(dsize1000Ide,1000);
System.out.println("unwikipediaDouble,1000 ,double ,idendical keys: "+ totaltime);

unwikipediaDouble(dsize1000FewDup,1000);
System.out.println("unwikipediaDouble,1000 ,double ,Few Duplicates: "+ totaltime);

unwikipediaDouble(dsize1000SomeDup,1000);
System.out.println("unwikipediaDouble,1000 ,double , Some Duplicates: "+ totaltime);

unwikipediaDouble(dsize1000ManyDup,1000);
System.out.println("unwikipediaDouble,1000 ,double , Many Duplicates: "+ totaltime);

unwikipediaDouble(dsize1000SlightlyDis,1000);
System.out.println("unwikipediaDouble,1000 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

unwikipediaDouble(dsize10000Asc,10000);
System.out.println("unwikipediaDouble,10000 ,double , ascending order: "+ totaltime);

unwikipediaDouble(dsize10000Des,10000);
System.out.println("unwikipediaDouble,10000 ,double , decreasing order: "+ totaltime);

unwikipediaDouble(dsize10000Ide,10000);
System.out.println("unwikipediaDouble,10000 ,double ,idendical keys: "+ totaltime);

unwikipediaDouble(dsize10000FewDup,10000);
System.out.println("unwikipediaDouble,10000 ,double ,Few Duplicates: "+ totaltime);

unwikipediaDouble(dsize10000SomeDup,10000);
System.out.println("unwikipediaDouble,10000 ,double , Some Duplicates: "+ totaltime);

unwikipediaDouble(dsize10000ManyDup,10000);
System.out.println("unwikipediaDouble,10000 ,double , Many Duplicates: "+ totaltime);

unwikipediaDouble(dsize10000SlightlyDis,10000);
System.out.println("unwikipediaDouble,10000 ,double , Slightly Disordered: "+ totaltime);

System.out.println();

System.out.println();


setupint();


wikipedia2(int10,10);
System.out.println("wikipedia2,10,int,random distribution: "+ totaltime);

wikipedia2(int10Asc,10);
System.out.println("wikipedia2,10,int, ascending order: "+ totaltime);

wikipedia2(int10Des,10);
System.out.println("wikipedia2,10,int, descending order: "+ totaltime);

wikipedia2(int10Ide,10);
System.out.println("wikipedia2,10,int,idendical keys: "+ totaltime);

wikipedia2(int10FewDup,10);
System.out.println("wikipedia2,10,int, Few Duplicates: "+ totaltime);

wikipedia2(int10SomeDup,10);
System.out.println("wikipedia2,10,int, Some Duplicates: "+ totaltime);

wikipedia2(int10ManyDup,10);
System.out.println("wikipedia2,10,int, Many Duplicates: "+ totaltime);

wikipedia2(int10SlightlyDis,10);
System.out.println("wikipedia2,10,int, Slightly Distributed: "+ totaltime);

System.out.println();

wikipedia2(int100,100);
System.out.println("wikipedia2,100,int, random distribution: "+totaltime);

wikipedia2(int100Asc,100);
System.out.println("wikipedia2,100,int, ascending order: "+ totaltime);

wikipedia2(int100Des,100);
System.out.println("wikipedia2,100,int, descending order: "+ totaltime);

wikipedia2(int100Ide,100);
System.out.println("wikipedia2,100,int,idendical keys: "+ totaltime);

wikipedia2(int100FewDup,100);
System.out.println("wikipedia2,100,int, Few Duplicates: "+ totaltime);

wikipedia2(int100SomeDup,100);
System.out.println("wikipedia2,100,int, Some Duplicates: "+ totaltime);

wikipedia2(int100ManyDup,100);
System.out.println("wikipedia2,100,int, Many Duplicates: "+ totaltime);

wikipedia2(int100SlightlyDis,100);
System.out.println("wikipedia2,100,int, Slightly Distributed: "+ totaltime);

System.out.println();

wikipedia2(int1000,1000);
System.out.println("wikipedia2,1000,int,random distribution: "+totaltime);

wikipedia2(int1000Asc,1000);
System.out.println("wikipedia2,1000,int,ascending order: "+ totaltime);

wikipedia2(int1000Des,1000);
System.out.println("wikipedia2,1000,int, descending order: "+ totaltime);

wikipedia2(int1000Ide,1000);
System.out.println("wikipedia2,1000,int,idendical keys: "+ totaltime);

wikipedia2(int1000FewDup,1000);
System.out.println("wikipedia2,1000,int,Few Duplicates: "+ totaltime);

wikipedia2(int1000SomeDup,1000);
System.out.println("wikipedia2,1000,int, Some Duplicates: "+ totaltime);

wikipedia2(int1000SlightlyDis,1000);
System.out.println("wikipedia2,1000,int,Slightly Distributed: "+ totaltime);

wikipedia2(int1000ManyDup,1000);
System.out.println("wikipedia2,1000,int, Many Duplicates: "+ totaltime);

System.out.println();

wikipedia2(int10000,10000);
System.out.println("wikipedia2,10000,int,random distribution: "+totaltime);

wikipedia2(int10000Asc,10000);
System.out.println("wikipedia2,10000,int,ascending order: "+ totaltime);

wikipedia2(int10000Des,10000);
System.out.println("wikipedia2,10000,int, descending order: "+ totaltime);

wikipedia2(int10000Ide,10000);
System.out.println("wikipedia2,10000,int, idendical keys: "+ totaltime);

wikipedia2(int10000FewDup,10000);
System.out.println("wikipedia2,10000,int, Few Duplicates: "+ totaltime);

wikipedia2(int10000SomeDup,10000);
System.out.println("wikipedia2,10000,int, Some Duplicates: "+ totaltime);

wikipedia2(int10000SlightlyDis,10000);
System.out.println("wikipedia2,10000,int, Slightly Distributed: "+ totaltime);

wikipedia2(int10000ManyDup,10000);
System.out.println("wikipedia2,10000,int, Many Duplicates: "+ totaltime);

System.out.println();


System.out.println();


setupInteger();


wikipedia2Integer(size10,10);
System.out.println("wikipedia2Integer , 10, Integer, random distribution: "+ totaltime);

wikipedia2Integer(size10Asc,10);
System.out.println("wikipedia2Integer , 10, Integer, ascending order: "+ totaltime);

wikipedia2Integer(size10Des,10);
System.out.println("wikipedia2Integer , 10, Integer,  decreasing order: "+ totaltime);

wikipedia2Integer(size10Ide,10);
System.out.println("wikipedia2Integer , 10, Integer, idendical keys: "+ totaltime);

wikipedia2Integer(size10FewDup,10);
System.out.println("wikipedia2Integer , 10, Integer,  Few Duplicates: "+ totaltime);

wikipedia2Integer(size10SomeDup,10);
System.out.println("wikipedia2Integer , 10, Integer, Some Duplicates: "+ totaltime);

wikipedia2Integer(size10ManyDup,10);
System.out.println("wikipedia2Integer , 10, Integer,  Many Duplicates: "+ totaltime);

wikipedia2Integer(size10SlightlyDis,10);
System.out.println("wikipedia2Integer , 10, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

wikipedia2Integer(size100,100);
System.out.println("wikipedia2Integer , 100, Integer, random distribution: "+ totaltime);

wikipedia2Integer(size100Asc,100);
System.out.println("wikipedia2Integer , 100, Integer, ascending order: "+ totaltime);

wikipedia2Integer(size100Des,100);
System.out.println("wikipedia2Integer , 100, Integer,decreasing order: "+ totaltime);

wikipedia2Integer(size100Ide,100);
System.out.println("wikipedia2Integer , 100, Integer, idendical keys: "+ totaltime);

wikipedia2Integer(size100FewDup,100);
System.out.println("wikipedia2Integer , 100, Integer,Few Duplicates: "+ totaltime);

wikipedia2Integer(size100SomeDup,100);
System.out.println("wikipedia2Integer , 100, Integer,Some Duplicates: "+ totaltime);

wikipedia2Integer(size100ManyDup,100);
System.out.println("wikipedia2Integer , 100, Integer, Many Duplicates: "+ totaltime);

wikipedia2Integer(size100SlightlyDis,100);
System.out.println("wikipedia2Integer , 100, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

wikipedia2Integer(size1000,1000);
System.out.println("wikipedia2Integer , 1000, Integer, random distribution: "+ totaltime);

wikipedia2Integer(size100Asc,1000);
System.out.println("wikipedia2Integer , 1000, Integer,  ascending order: "+ totaltime);

wikipedia2Integer(size1000Des,1000);
System.out.println("wikipedia2Integer , 1000, Integer,  decreasing order: "+ totaltime);

wikipedia2Integer(size1000Ide,1000);
System.out.println("wikipedia2Integer , 1000, Integer, idendical keys: "+ totaltime);

wikipedia2Integer(size1000FewDup,1000);
System.out.println("wikipedia2Integer , 1000, Integer,  Few Duplicates "+ totaltime);

wikipedia2Integer(size1000SomeDup,1000);
System.out.println("wikipedia2Integer , 1000, Integer,  Some Duplicates "+ totaltime);

wikipedia2Integer(size1000ManyDup,1000);
System.out.println("wikipedia2Integer , 1000, Integer,  Many Duplicates "+ totaltime);

wikipedia2Integer(size1000SlightlyDis,1000);
System.out.println("wikipedia2Integer , 1000, Integer,  Slightly Disordered: "+ totaltime);

System.out.println();

wikipedia2Integer(size10000,10000);
System.out.println("wikipedia2Integer , 10000, Integer,  random distribution: "+ totaltime);

wikipedia2Integer(size10000Asc,10000);
System.out.println("wikipedia2Integer , 10000, Integer, ascending order: "+ totaltime);

wikipedia2Integer(size10000Des,10000);
System.out.println("wikipedia2Integer , 10000, Integer,  decreasing order: "+ totaltime);

wikipedia2Integer(size10000Ide,10000);
System.out.println("wikipedia2Integer , 10000, Integer, idendical keys: "+ totaltime);

wikipedia2Integer(size10000FewDup,10000);
System.out.println("wikipedia2Integer , 10000, Integer,  Few Duplicates: "+ totaltime);

wikipedia2Integer(size10000SomeDup,10000);
System.out.println("wikipedia2Integer , 10000, Integer,  Some Duplicates: "+ totaltime);

wikipedia2Integer(size10000ManyDup,10000);
System.out.println("wikipedia2Integer , 10000, Integer,  Many Duplicates: "+ totaltime);

wikipedia2Integer(size10000SlightlyDis,10000);
System.out.println("wikipedia2Integer , 10000, Integer,  Slightly Disordered: "+ totaltime);

System.out.println();


System.out.println();

setupDouble();

wikipedia2Double(dsize10Asc,10);
System.out.println("wikipedia2Double , 10 ,double , ascending order: "+ totaltime);

wikipedia2Double(dsize10Des,10);
System.out.println("wikipedia2Double , 10 ,double , decreasing order: "+ totaltime);

wikipedia2Double(dsize10Ide,10);
System.out.println("wikipedia2Double , 10 ,double , idendical keys: "+ totaltime);

wikipedia2Double(dsize10FewDup,10);
System.out.println("wikipedia2Double , 10 ,double , Few Duplicates: "+ totaltime);

wikipedia2Double(dsize10SomeDup,10);
System.out.println("wikipedia2Double , 10 ,double , Some Duplicates: "+ totaltime);

wikipedia2Double(dsize10ManyDup,10);
System.out.println("wikipedia2Double , 10 ,double , Many Duplicates: "+ totaltime);

wikipedia2Double(dsize10SlightlyDis,10);
System.out.println("wikipedia2Double , 10 ,double , Slightly Disordered: "+ totaltime);


System.out.println();

wikipedia2Double(dsize100Asc,100);
System.out.println("wikipedia2Double , 100 ,double , ascending order: "+ totaltime);

wikipedia2Double(dsize100Des,100);
System.out.println("wikipedia2Double , 100 ,double , decreasing order: "+ totaltime);

wikipedia2Double(dsize100Ide,100);
System.out.println("wikipedia2Double , 100 ,double , idendical keys: "+ totaltime);

wikipedia2Double(dsize100FewDup,100);
System.out.println("wikipedia2Double , 100 ,double , Few Duplicates: "+ totaltime);

wikipedia2Double(dsize100SomeDup,100);
System.out.println("wikipedia2Double , 100 ,double , Some Duplicates: "+ totaltime);

wikipedia2Double(dsize100ManyDup,100);
System.out.println("wikipedia2Double , 100 ,double ,Many Duplicates: "+ totaltime);

wikipedia2Double(dsize100SlightlyDis,100);
System.out.println("wikipedia2Double , 100 ,double , Slightly Disordered: "+ totaltime);

System.out.println();

wikipedia2Double(dsize1000Asc,1000);
System.out.println("wikipedia2Double , 1000 ,double , ascending order: "+ totaltime);

wikipedia2Double(dsize1000Des,1000);
System.out.println("wikipedia2Double , 1000 ,double , decreasing order: "+ totaltime);

wikipedia2Double(dsize1000Ide,1000);
System.out.println("wikipedia2Double , 1000 ,double , idendical keys: "+ totaltime);

wikipedia2Double(dsize1000FewDup,1000);
System.out.println("wikipedia2Double , 1000 ,double , Few Duplicates: "+ totaltime);

wikipedia2Double(dsize1000SomeDup,1000);
System.out.println("wikipedia2Double , 1000 ,double ,Some Duplicates: "+ totaltime);

wikipedia2Double(dsize1000ManyDup,1000);
System.out.println("wikipedia2Double , 1000 ,double ,Many Duplicates: "+ totaltime);

wikipedia2Double(dsize1000SlightlyDis,1000);
System.out.println("wikipedia2Double , 1000 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

wikipedia2Double(dsize10000Asc,10000);
System.out.println("wikipedia2Double , 10000 ,double , ascending order: "+ totaltime);

wikipedia2Double(dsize10000Des,10000);
System.out.println("wikipedia2Double , 10000 ,double ,decreasing order: "+ totaltime);

wikipedia2Double(dsize10000Ide,10000);
System.out.println("wikipedia2Double , 10000 ,double ,idendical keys: "+ totaltime);

wikipedia2Double(dsize10000FewDup,10000);
System.out.println("wikipedia2Double , 10000 ,double , Few Duplicates: "+ totaltime);

wikipedia2Double(dsize10000SomeDup,10000);
System.out.println("wikipedia2Double , 10000 ,double , Some Duplicates: "+ totaltime);

wikipedia2Double(dsize10000ManyDup,10000);
System.out.println("wikipedia2Double , 10000 ,double , Many Duplicates: "+ totaltime);

wikipedia2Double(dsize10000SlightlyDis,10000);
System.out.println("wikipedia2Double , 10000 ,double ,Slightly Disordered: "+ totaltime);

System.out.println();

System.out.println();


System.out.println();

setupInteger();


bubblesort(size10,10);
System.out.println("bubblesort ,10, Integer, random distribution: "+ totaltime);

bubblesort(size10Asc,10);
System.out.println("bubblesort ,10, Integer,ascending order: "+ totaltime);

bubblesort(size10Des,10);
System.out.println("bubblesort ,10, Integer, decreasing order: "+ totaltime);

bubblesort(size10Ide,10);
System.out.println("bubblesort ,10, Integer,idendical keys: "+ totaltime);

bubblesort(size10FewDup,10);
System.out.println("bubblesort ,10, Integer, Few Duplicates: "+ totaltime);

bubblesort(size10SomeDup,10);
System.out.println("bubblesort ,10, Integer, Some Duplicates: "+ totaltime);

bubblesort(size10ManyDup,10);
System.out.println("bubblesort ,10, Integer, Many Duplicates: "+ totaltime);

bubblesort(size10SlightlyDis,10);
System.out.println("bubblesort ,10, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

bubblesort(size100,100);
System.out.println("bubblesort ,100, Integer,random distribution: "+ totaltime);

bubblesort(size100Asc,100);
System.out.println("bubblesort ,100, Integer, ascending order: "+ totaltime);

bubblesort(size100Des,100);
System.out.println("bubblesort ,100, Integer,decreasing order: "+ totaltime);

bubblesort(size100Ide,100);
System.out.println("bubblesort ,100, Integer,idendical keys: "+ totaltime);

bubblesort(size100FewDup,100);
System.out.println("bubblesort ,100, Integer, Few Duplicates: "+ totaltime);

bubblesort(size100SomeDup,100);
System.out.println("bubblesort ,100, Integer, Some Duplicates: "+ totaltime);

bubblesort(size100ManyDup,100);
System.out.println("bubblesort ,100, Integer, Many Duplicates: "+ totaltime);

bubblesort(size100SlightlyDis,100);
System.out.println("bubblesort ,100, Integer,Slightly Disordered: "+ totaltime);

System.out.println();

bubblesort(size1000,1000);
System.out.println("bubblesort ,1000, Integer, random distribution: "+ totaltime);

bubblesort(size100Asc,1000);
System.out.println("bubblesort ,1000, Integer,  ascending order: "+ totaltime);

bubblesort(size1000Des,1000);
System.out.println("bubblesort ,1000, Integer, decreasing order: "+ totaltime);

bubblesort(size1000Ide,1000);
System.out.println("bubblesort ,1000, Integer, idendical keys: "+ totaltime);

bubblesort(size1000FewDup,1000);
System.out.println("bubblesort ,1000, Integer,  Few Duplicates "+ totaltime);

bubblesort(size1000SomeDup,1000);
System.out.println("bubblesort ,1000, Integer,  Some Duplicates "+ totaltime);

bubblesort(size1000ManyDup,1000);
System.out.println("bubblesort ,1000, Integer, Many Duplicates "+ totaltime);

bubblesort(size1000SlightlyDis,1000);
System.out.println("bubblesort ,1000, Integer, Slightly Disordered: "+ totaltime);

System.out.println();

bubblesort(size10000,10000);
System.out.println("bubblesort ,10000, Integer, random distribution: "+ totaltime);

bubblesort(size10000Asc,10000);
System.out.println("bubblesort ,10000, Integer, ascending order: "+ totaltime);

bubblesort(size10000Des,10000);
System.out.println("bubblesort ,10000, Integer, decreasing order: "+ totaltime);

bubblesort(size10000Ide,10000);
System.out.println("bubblesort ,10000, Integer,idendical keys: "+ totaltime);

bubblesort(size10000FewDup,10000);
System.out.println("bubblesort ,10000, Integer, Few Duplicates: "+ totaltime);

bubblesort(size10000SomeDup,10000);
System.out.println("bubblesort ,10000, Integer, Some Duplicates: "+ totaltime);

bubblesort(size10000ManyDup,10000);
System.out.println("bubblesort ,10000, Integer, Many Duplicates: "+ totaltime);

bubblesort(size10000SlightlyDis,10000);
System.out.println("bubblesort ,10000, Integer,Slightly Disordered: "+ totaltime);

System.out.println();


System.out.println();

setupDouble();

bubblesortDouble(dsize10Asc,10);
System.out.println("bubblesortDouble , 10, double , ascending order: "+ totaltime);

bubblesortDouble(dsize10Des,10);
System.out.println("bubblesortDouble , 10, double , decreasing order: "+ totaltime);

bubblesortDouble(dsize10Ide,10);
System.out.println("bubblesortDouble , 10, double ,idendical keys: "+ totaltime);

bubblesortDouble(dsize10FewDup,10);
System.out.println("bubblesortDouble , 10, double , Few Duplicates: "+ totaltime);

bubblesortDouble(dsize10SomeDup,10);
System.out.println("bubblesortDouble , 10, double ,Some Duplicates: "+ totaltime);

bubblesortDouble(dsize10ManyDup,10);
System.out.println("bubblesortDouble , 10, double , Many Duplicates: "+ totaltime);

bubblesortDouble(dsize10SlightlyDis,10);
System.out.println("bubblesortDouble , 10, double , Slightly Disordered: "+ totaltime);


System.out.println();

bubblesortDouble(dsize100Asc,100);
System.out.println("bubblesortDouble , 100, double , ascending order: "+ totaltime);

bubblesortDouble(dsize100Des,100);
System.out.println("bubblesortDouble , 100, double , decreasing order: "+ totaltime);

bubblesortDouble(dsize100Ide,100);
System.out.println("bubblesortDouble , 100, double ,  idendical keys: "+ totaltime);

bubblesortDouble(dsize100FewDup,100);
System.out.println("bubblesortDouble , 100, double ,  Few Duplicates: "+ totaltime);

bubblesortDouble(dsize100SomeDup,100);
System.out.println("bubblesortDouble , 100, double ,  Some Duplicates: "+ totaltime);

bubblesortDouble(dsize100ManyDup,100);
System.out.println("bubblesortDouble , 100, double , Many Duplicates: "+ totaltime);

bubblesortDouble(dsize100SlightlyDis,100);
System.out.println("bubblesortDouble , 100, double ,  Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortDouble(dsize1000Asc,1000);
System.out.println("bubblesortDouble , 1000, double ,  ascending order: "+ totaltime);

bubblesortDouble(dsize1000Des,1000);
System.out.println("bubblesortDouble , 1000, double ,  decreasing order: "+ totaltime);

bubblesortDouble(dsize1000Ide,1000);
System.out.println("bubblesortDouble , 1000, double ,  idendical keys: "+ totaltime);

bubblesortDouble(dsize1000FewDup,1000);
System.out.println("bubblesortDouble , 1000, double ,  Few Duplicates: "+ totaltime);

bubblesortDouble(dsize1000SomeDup,1000);
System.out.println("bubblesortDouble , 1000, double , Some Duplicates: "+ totaltime);

bubblesortDouble(dsize1000ManyDup,1000);
System.out.println("bubblesortDouble , 1000, double , Many Duplicates: "+ totaltime);

bubblesortDouble(dsize1000SlightlyDis,1000);
System.out.println("bubblesortDouble , 1000, double ,  Slightly Disordered: "+ totaltime);

System.out.println();

bubblesortDouble(dsize10000Asc,10000);
System.out.println("bubblesortDouble , 10000, double ,  ascending order: "+ totaltime);

bubblesortDouble(dsize10000Des,10000);
System.out.println("bubblesortDouble , 10000, double ,  decreasing order: "+ totaltime);

bubblesortDouble(dsize10000Ide,10000);
System.out.println("bubblesortDouble , 10000, double , idendical keys: "+ totaltime);

bubblesortDouble(dsize10000FewDup,10000);
System.out.println("bubblesortDouble , 10000, double ,  Few Duplicates: "+ totaltime);

bubblesortDouble(dsize10000SomeDup,10000);
System.out.println("bubblesortDouble , 10000, double , Some Duplicates: "+ totaltime);

bubblesortDouble(dsize10000ManyDup,10000);
System.out.println("bubblesortDouble , 10000, double , Many Duplicates: "+ totaltime);

bubblesortDouble(dsize10000SlightlyDis,10000);
System.out.println("bubblesortDouble , 10000, double ,  Slightly Disordered: "+ totaltime);

System.out.println();


System.out.println();


setupint();


bubblesortInt(int10,10);
System.out.println("bubblesortInt ,int, 10,random distribution: "+ totaltime);

bubblesortInt(int10Asc,10);
System.out.println("bubblesortInt ,int, 10, ascending order: "+ totaltime);

bubblesortInt(int10Des,10);
System.out.println("bubblesortInt ,int, 10, descending order: "+ totaltime);

bubblesortInt(int10Ide,10);
System.out.println("bubblesortInt ,int, 10, idendical keys: "+ totaltime);

bubblesortInt(int10FewDup,10);
System.out.println("bubblesortInt ,int, 10,Few Duplicates: "+ totaltime);

bubblesortInt(int10SomeDup,10);
System.out.println("bubblesortInt ,int, 10,Some Duplicates: "+ totaltime);

bubblesortInt(int10ManyDup,10);
System.out.println("bubblesortInt ,int, 10, Many Duplicates: "+ totaltime);

bubblesortInt(int10SlightlyDis,10);
System.out.println("bubblesortInt ,int, 10,Slightly Distributed: "+ totaltime);

System.out.println();

bubblesortInt(int100,100);
System.out.println("bubblesortInt ,int, 100,random distribution: "+totaltime);

bubblesortInt(int100Asc,100);
System.out.println("bubblesortInt ,int, 100,ascending order: "+ totaltime);

bubblesortInt(int100Des,100);
System.out.println("bubblesortInt ,int, 100,descending order: "+ totaltime);

bubblesortInt(int100Ide,100);
System.out.println("bubblesortInt ,int, 100,idendical keys: "+ totaltime);

bubblesortInt(int100FewDup,100);
System.out.println("bubblesortInt ,int, 100, Few Duplicates: "+ totaltime);

bubblesortInt(int100SomeDup,100);
System.out.println("bubblesortInt ,int, 100, Some Duplicates: "+ totaltime);

bubblesortInt(int100ManyDup,100);
System.out.println("bubblesortInt ,int, 100, Many Duplicates: "+ totaltime);

bubblesortInt(int100SlightlyDis,100);
System.out.println("bubblesortInt ,int, 100,Slightly Distributed: "+ totaltime);

System.out.println();

bubblesortInt(int1000,1000);
System.out.println("bubblesortInt ,int, 1000,random distribution: "+totaltime);

bubblesortInt(int1000Asc,1000);
System.out.println("bubblesortInt ,int, 1000, ascending order: "+ totaltime);

bubblesortInt(int1000Des,1000);
System.out.println("bubblesortInt ,int, 1000,descending order: "+ totaltime);

bubblesortInt(int1000Ide,1000);
System.out.println("bubblesortInt ,int, 1000,idendical keys: "+ totaltime);

bubblesortInt(int1000FewDup,1000);
System.out.println("bubblesortInt ,int, 1000, Few Duplicates: "+ totaltime);

bubblesortInt(int1000SomeDup,1000);
System.out.println("bubblesortInt ,int, 1000, Some Duplicates: "+ totaltime);

bubblesortInt(int1000SlightlyDis,1000);
System.out.println("bubblesortInt ,int, 1000,Slightly Distributed: "+ totaltime);

bubblesortInt(int1000ManyDup,1000);
System.out.println("bubblesortInt ,int, 1000, Many Duplicates: "+ totaltime);

System.out.println();

bubblesortInt(int10000,10000);
System.out.println("bubblesortInt ,int, 10000,random distribution:  "+totaltime);

bubblesortInt(int10000Asc,10000);
System.out.println("bubblesortInt ,int, 10000, ascending order: "+ totaltime);

bubblesortInt(int10000Des,10000);
System.out.println("bubblesortInt ,int, 10000, descending order: "+ totaltime);

bubblesortInt(int10000Ide,10000);
System.out.println("bubblesortInt ,int, 10000,idendical keys: "+ totaltime);

bubblesortInt(int10000FewDup,10000);
System.out.println("bubblesortInt ,int, 10000, Few Duplicates: "+ totaltime);

bubblesortInt(int10000SomeDup,10000);
System.out.println("bubblesortInt ,int, 10000, Some Duplicates: "+ totaltime);

bubblesortInt(int10000SlightlyDis,10000);
System.out.println("bubblesortInt ,int, 10000,Slightly Distributed: "+ totaltime);

bubblesortInt(int10000ManyDup,10000);
System.out.println("bubblesortInt ,int, 10000, Many Duplicates: "+ totaltime);

System.out.println();


}

// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheck(int[] A,int length) {

int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
  for (int i=runs; i<runs+length-1; i++) {// Insert i'th record
    boolean swaps = false;
    for (int j=runs+1; j<runs+length-i; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        swaps = true;
      }
  }
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);
}


// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheckDouble(double[] A,int length) {

int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
for (int i=runs; i<runs+length-1; i++) {// Insert i'th record
boolean swaps = false;
for (int j=runs+1; j<runs+length-i; j++)
if (A[j-1] > A[j]) {
swapDouble(A, j-1, j);
swaps = true;
}
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);
}

// A flag check if a pass did not have any swaps, which lets us quit
static void bubblesortcheckInteger(Integer[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
for (int i=runs; i<runs+length-1; i++) {// Insert i'th record
boolean swaps = false;
for (int j=1+runs; j<runs+length-i; j++)
if (A[j-1].compareTo(A[j]) > 0) {
swapInteger(A, j-1, j);
swaps = true;
}
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);
}

// Modify the flag to check position of last swap taken
static void bubblesortcheck2(int[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
  for (int i=runs; i<runs+length-1; i++) {// Insert i'th record
    int lastseen = 0;
    int top = length;
    for (int j=runs+1; j<top+runs; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        lastseen = j-1;
      }
    top = lastseen;
  }
long endTime   = millis();
 totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);
}

// Modify the flag to check position of last swap taken
static void bubblesortcheck2Double(double[] A,int length) {

int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
for (int i=runs; i<runs+length-1; i++) {// Insert i'th record
int lastseen = 0;
int top = length;
for (int j=runs+1; j<+runs+top; j++)
if (A[j-1] > A[j]) {
swapDouble(A, j-1, j);
lastseen = j-1;
}
top = lastseen;
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);
}


// Modify the flag to check position of last swap taken
static void bubblesortcheck2Integer(Integer[] A,int length) {

int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
//for (int i=0; i<length; i++) tmp[i] = new Integer(A[i]);
long startTime=millis();
for (int i=runs; i<runs+length-1; i++) {// Insert i'th record
int lastseen = 0;
int top = length;
for (int j=runs+1; j<runs+top; j++)
if (A[j-1].compareTo(A[j])>0) {
swapInteger(A, j-1, j);
lastseen = j-1;
}
top = lastseen;
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);
}


// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswap(Integer[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
  int n = runs + length - 1;
  while (n > runs) {
    int newn = 0;
    for (int i = runs; i < n; i++) {
      /* if this pair is out of order */
      if (A[i].compareTo(A[i+1]) > 0) {
        swap(A, i, i+1);
        newn = i;
      }
    }
    n = newn;
  }
long endTime   = millis();
 totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);


}

// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswapInt(int[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
int n = runs+length - 1;
while (n > runs) {
int newn = 0;
for (int i = runs; i < n; i++) {
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swap(A, i, i+1);
newn = i;
}
}
n = newn;
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);


}


// Wikipedia article "optimization" to only swap up to the last swap seen
/* *** ODSATag: BubblesortCheck *** */
static void bubblecheckswapDouble(double[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
int n = runs+length - 1;
while (n > runs) {
int newn = 0;
for (int i = runs; i < n; i++) {
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swapDouble(A, i, i+1);
newn = i;
}
}
n = newn;
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);


}

/* *** ODSAendTag: BubblesortCheck *** */

// Wikipedia article "optimization" to only swap up to the last swap seen
static void unwikipedia(int[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();

  int n = runs+length-1;
  while (n>runs) {
    for (int i=runs; i<n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
      }
    n -= 1;
  }
long endTime   = millis();
 totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}

// Wikipedia article "optimization" to only swap up to the last swap seen
static void unwikipediaDouble(double[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
//for (int i=0; i<length; i++) tmp[i] = A[i];
long startTime=millis();

int n = runs+length-1;
while (n>runs) {
for (int i=runs; i<n; i++)
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swapDouble(A, i, i+1);
}
n -= 1;
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}


// Wikipedia article "optimization" to only swap up to the last swap seen
static void unwikipediaInteger(Integer[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE;runs+=length) {
//for (int i=0; i<length; i++) tmp[i] = new Integer(A[i]);
long startTime=millis();

int n = runs+length-1;
while (n>runs) {
for (int i=runs; i<n; i++)
/* if this pair is out of order */
if (A[i].compareTo(A[i+1])>0) {
swapInteger(A, i, i+1);
}
n -= 1;
}
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}


// Wikipedia article "optimization" rewritten with a for loop
static void wikipedia2(int[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
//for (int i=0; i<length; i++) tmp[i] = A[i];
long startTime=millis();


  int newn;
  int loopcnt = 0;
  for(int n=runs+length-1; n>runs; n=newn) {
    loopcnt++;
    newn = 0;
    for (int i=runs; i<n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i+1]) {
        swap(A, i, i+1);
        newn = i;
      }
  }
 // println("Loopcnt was " + loopcnt);
long endTime   = millis();
 totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}


// Wikipedia article "optimization" rewritten with a for loop
static void wikipedia2Integer(Integer[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
int newn;
int loopcnt = 0;
for(int n=runs+length-1; n>runs; n=newn) {
loopcnt++;
newn = 0;
for (int i=runs; i<n; i++)
/* if this pair is out of order */
if (A[i].compareTo(A[i+1])>0) {
swapInteger(A, i, i+1);
newn = i;
}
}
// println("Loopcnt was " + loopcnt);
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}


// Wikipedia article "optimization" rewritten with a for loop
static void wikipedia2Double(double[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
int newn;
int loopcnt = 0;
for(int n=runs+length-1; n>runs; n=newn) {
loopcnt++;
newn = 0;
for (int i=runs; i<n; i++)
/* if this pair is out of order */
if (A[i] > A[i+1]) {
swapDouble(A, i, i+1);
newn = i;
}
}
// println("Loopcnt was " + loopcnt);
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}

@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B,int length) {


  int i;
  Integer[] A = new Integer[B.length];
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  bubblesort(A,length);
  if (!checkorder(A)) return false;

  //  KVPair[] AKV = (KVPair[])new Object[B.length];
  //  for (i=0; i<B.length; i++)
  //    AKV[i] = new KVPair(new Integer(B[i]), new Integer(B[i]));
  //  inssort(A);
  //  if (!checkorder(A)) return false;
  return true;



}

/* *** ODSATag: Bubblesort *** */
static void bubblesort(Integer[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();

  for (int i=runs; i<runs+length-1; i++) // Insert i'th record
    for (int j=runs+1; j<runs+length-i; j++)
      if (A[j-1].compareTo(A[j]) > 0)
        swap(A, j-1, j);
long endTime   = millis();
 totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}
/* *** ODSAendTag: Bubblesort *** */


/* *** ODSATag: Bubblesort *** */
static void bubblesortInt(int[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();
for (int i=runs; i<runs+length-1; i++) // Insert i'th record
for (int j=runs+1; j<runs+length-i; j++)
if (A[j-1] > A[j])
swap(A, j-1, j);
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}
/* *** ODSAendTag: Bubblesort *** */


/* *** ODSATag: Bubblesort *** */
static void bubblesortDouble(double[] A,int length) {
int runs;
for (runs=0; runs<TESTSIZE; runs+=length) {
long startTime=millis();

for (int i=runs; i<runs+length-1; i++) // Insert i'th record
for (int j=runs+1; j<runs+length-i; j++)
if (A[j-1] > A[j])
swapDouble(A, j-1, j);
long endTime   = millis();
totaltime += (endTime - startTime);
}
totaltime = totaltime/(TESTSIZE/length);

}
/* *** ODSAendTag: Bubblesort *** */



