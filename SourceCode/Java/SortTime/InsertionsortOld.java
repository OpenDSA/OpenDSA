static void sorttime(){

 // inssort
 setupint();
System.out.println("Insertion Sort");

System.out.println("Method Name,  Array Type, Array Size,Data Distribution");


 System.out.println("inssort,int, 10, random distribution, ");
funcInssort(int10,10,"inssort");

 System.out.println("inssort,int,10 , ascending order, ");
funcInssort(int10Asc,10,"inssort");

 System.out.println("inssort Time ,int, 10 , descending order, ");
funcInssort(int10Des,10,"inssort");

 System.out.println("inssort , int, 10, idendical keys, ");
funcInssort(int10Ide,10,"inssort");

 System.out.println("inssort Time , int , 10 , Few Duplicates,");
funcInssort(int10FewDup,10,"inssort");

 System.out.println("inssort ,int,10, Some Duplicates, ");
funcInssort(int10SomeDup,10,"inssort");

 System.out.println("inssort Time , int , 10 ,Many Duplicates, ");
funcInssort(int10ManyDup,10,"inssort");

 System.out.println("inssort ,int,10 ,Slightly Distributed, ");
funcInssort(int10SlightlyDis,10,"inssort");

 System.out.println();
 
 System.out.println("inssort , int , 100, random distribution, ");
funcInssort(int100,100,"inssort");

 System.out.println("inssort , int , 100 , ascending order, ");
funcInssort(int100Asc,100,"inssort");

 System.out.println("inssort , int , 100 , descending order, ");
funcInssort(int100Des,100,"inssort");

 System.out.println("inssort , int,  100 ,idendical keys, ");
funcInssort(int100Ide,100,"inssort");

 System.out.println("inssort , int , 100 , Few Duplicates, ");
funcInssort(int100FewDup,100,"inssort");

 System.out.println("inssort Time , int , 100 ,Some Duplicates, ");
funcInssort(int100SomeDup,100,"inssort");

 System.out.println("inssort Time , int, 100 ,Many Duplicates, ");
funcInssort(int100ManyDup,100,"inssort");

 System.out.println("inssort ,int, 100 ,Slightly Distributed, ");
funcInssort(int100SlightlyDis,100,"inssort");

 System.out.println();
 
 System.out.println("inssort ,int, 1000,random distribution, ");
funcInssort(int1000,1000,"inssort");

 System.out.println("inssort ,int, 1000 , ascending order, ");
funcInssort(int1000Asc,1000,"inssort");

 System.out.println("inssort ,int,1000 ,descending order,");
funcInssort(int1000Des,1000,"inssort");

 System.out.println("inssort , int, 1000, idendical keys,");
funcInssort(int1000Ide,1000,"inssort");

 System.out.println("inssort Time,int, 1000 ,Few Duplicates, ");
funcInssort(int1000FewDup,1000,"inssort");

 System.out.println("inssort Time ,int, 1000 ,Some Duplicates, ");
funcInssort(int1000SomeDup,1000,"inssort");

 System.out.println("inssort Time,int, 1000 ,Slightly Distributed, ");
funcInssort(int1000SlightlyDis,1000,"inssort");

 System.out.println("inssort Time ,int,1000 ,Many Duplicates,");
funcInssort(int1000ManyDup,1000,"inssort");

 System.out.println();


 System.out.println("inssort ,int, 10000, random distribution ");

funcInssort(int10000,10000,"inssort");


System.out.println("inssort ,int,10000 , ascending order,");
funcInssort(int10000Asc,10000,"inssort");

 System.out.println("inssort ,int, 10000 , descending order,");
funcInssort(int10000Des,10000,"inssort");

 System.out.println("inssort ,int, 10000 ,idendical keys, ");
funcInssort(int10000Ide,10000,"inssort");

 System.out.println("inssort ,int,10000 ,Few Duplicates, ");
funcInssort(int10000FewDup,10000,"inssort");

 System.out.println("inssort ,int, 10000 ,Some Duplicates, ");
funcInssort(int10000SomeDup,10000,"inssort");

 System.out.println("inssort ,int, 10000 ,Slightly Distributed, ");
funcInssort(int10000SlightlyDis,10000,"inssort");

 System.out.println("inssort ,int, 10000 ,Many Duplicates, ");
funcInssort(int10000ManyDup,10000,"inssort");

    System.out.println();
 /*
 funcInssort(int100000,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000: "+totaltime);
 
 funcInssort(int100000Asc,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 in ascending order: "+ totaltime);
 
 funcInssort(int100000Des,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 in descending order: "+ totaltime);
 
 funcInssort(int100000Ide,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 idendical keys: "+ totaltime);
 
 funcInssort(int100000FewDup,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 Few Duplicates: "+ totaltime);
 
 funcInssort(int100000SomeDup,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 Some Duplicates: "+ totaltime);
 
 funcInssort(int100000SlightlyDis,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 Slightly Distributed: "+ totaltime);
 
 funcInssort(int100000ManyDup,100000,"inssort");
 System.out.println("inssort Time for lists of size 100000 Many Duplicates: "+ totaltime);
 
 System.out.println();

 funcInssort(int1000000,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000: "+totaltime);
 
 funcInssort(int1000000Asc,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 in ascending order: "+ totaltime);
 
 funcInssort(int1000000Des,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 in descending order: "+ totaltime);
 
 funcInssort(int1000000Ide,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 idendical keys: "+ totaltime);
 
 funcInssort(int1000000FewDup,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 Few Duplicates: "+ totaltime);
 
 funcInssort(int1000000SomeDup,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 Some Duplicates: "+ totaltime);
 
 funcInssort(int1000000SlightlyDis,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 Slightly Distributed: "+ totaltime);
 
 funcInssort(int1000000ManyDup,1000000,"inssort");
 System.out.println("inssort Time for lists of size 1000000 Many Duplicates: "+ totaltime); */


 // inssort2
 setupint();
 System.out.println();
 
 
 System.out.println("inssort2 ,int , 10, random distribution");
funcInssort(int10,10,"inssort2");

 System.out.println("inssort2,int, 10 ,ascending order, ");
funcInssort(int10Asc,10,"inssort2");

 System.out.println("inssort2 ,int, 10 ,descending order, ");
funcInssort(int10Des,10,"inssort2");

 System.out.println("inssort2 ,int,10 ,idendical keys, ");
funcInssort(int10Ide,10,"inssort2");

 System.out.println("inssort2 ,int, 10 ,Few Duplicates, ");
funcInssort(int10FewDup,10,"inssort2");

 System.out.println("inssort2 ,int,10 ,Some Duplicates, ");
funcInssort(int10SomeDup,10,"inssort2");

 System.out.println("inssort2 ,int, 10 ,Many Duplicates, ");
funcInssort(int10ManyDup,10,"inssort2");

 System.out.println("inssort2 ,int, 100 ,Slightly Distributed,");
funcInssort(int10SlightlyDis,10,"inssort2");

 System.out.println();
 
 System.out.println("inssort2 ,int, 100,random distribution ");
funcInssort(int100,100,"inssort2");

 System.out.println("inssort2 ,int, 100 , ascending order, ");
funcInssort(int100Asc,100,"inssort2");

 System.out.println("inssort2 , int, 100 , descending order, ");
funcInssort(int100Des,100,"inssort2");

 System.out.println("inssort2 ,int, 100 ,idendical keys, ");
funcInssort(int100Ide,100,"inssort2");

 System.out.println("inssort2 ,int, 100 ,Few Duplicates,");
funcInssort(int100FewDup,100,"inssort2");

 System.out.println("inssort2 ,int,100 ,Some Duplicates, ");
funcInssort(int100SomeDup,100,"inssort2");

 System.out.println("inssort2 ,int, 100 ,Slightly Distributed, ");
funcInssort(int100SlightlyDis,100,"inssort2");

 System.out.println("inssort2,int, 100 ,Many Duplicates,");
funcInssort(int100ManyDup,100,"inssort2");

 System.out.println();
 
 System.out.println("inssort2 ,int,1000,random distribution ,");
funcInssort(int1000,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000 , ascending order,");
funcInssort(int1000Asc,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000 , descending order,");
funcInssort(int1000Des,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000, idendical keys, ");
funcInssort(int1000Ide,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000 ,Few Duplicates, ");
funcInssort(int1000FewDup,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000 ,Some Duplicates, ");
funcInssort(int1000SomeDup,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000 ,Slightly Distributed, ");
funcInssort(int1000SlightlyDis,1000,"inssort2");

 System.out.println("inssort2 ,int, 1000 ,Many Duplicates, ");
funcInssort(int1000ManyDup,1000,"inssort2");

 System.out.println();

 System.out.println("inssort2 ,int, 10000,random distribution,");
funcInssort(int10000,10000,"inssort2");

 System.out.println("inssort2 ,int, 10000 ,ascending order, ");
funcInssort(int10000Asc,10000,"inssort2");

 System.out.println("inssort2 ,int,10000 , descending order,");
funcInssort(int10000Des,10000,"inssort2");

 System.out.println("inssort2 ,int, 10000 ,idendical keys, ");
funcInssort(int10000Ide,10000,"inssort2");

 System.out.println("inssort2 ,int, 10000,Few Duplicates,");
funcInssort(int10000FewDup,10000,"inssort2");

 System.out.println("inssort2 ,int, 10000 ,Some Duplicates,");
funcInssort(int10000SomeDup,10000,"inssort2");

 System.out.println("inssort2 ,int, 10000 ,Slightly Distributed, ");
funcInssort(int10000SlightlyDis,10000,"inssort2");

 System.out.println("inssort2 ,int,10000 ,Many Duplicates,");
funcInssort(int10000ManyDup,10000,"inssort2");

 System.out.println();
/*
 funcInssort(int100000,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000: "+totaltime);
 
 funcInssort(int100000Asc,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 in ascending order: "+ totaltime);
 
 funcInssort(int100000Des,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 in descending order: "+ totaltime);
 
 funcInssort(int100000Ide,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 idendical keys: "+ totaltime);
 
 funcInssort(int100000FewDup,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 Few Duplicates: "+ totaltime);
 
 funcInssort(int100000SomeDup,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 Some Duplicates: "+ totaltime);
 
 funcInssort(int100000SlightlyDis,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 Slightly Distributed: "+ totaltime);
 
 funcInssort(int100000ManyDup,100000,"inssort2");
 System.out.println("inssort2 Time for lists of size 100000 Many Duplicates: "+ totaltime);
 
 System.out.println();
 
 funcInssort(int1000000,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000: "+totaltime);
 
 funcInssort(int1000000Asc,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 in ascending order: "+ totaltime);
 
 funcInssort(int1000000Des,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 in descending order: "+ totaltime);
 
 funcInssort(int1000000Ide,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 idendical keys: "+ totaltime);
 
 funcInssort(int1000000FewDup,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 Few Duplicates: "+ totaltime);
 
 funcInssort(int1000000SomeDup,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 Some Duplicates: "+ totaltime);
 
 funcInssort(int1000000SlightlyDis,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 Slightly Distributed: "+ totaltime);
 
 funcInssort(int1000000ManyDup,1000000,"inssort2");
 System.out.println("inssort2 Time for lists of size 1000000 Many Duplicates: "+ totaltime);
*/
 System.out.println();
 
 setupInteger();
 
 
 System.out.println("inssort , 10 ,Integer ,random distribution, ");
funcInssortInteger(size10,10,"inssortInteger");

 System.out.println("inssort ,10 ,Integer ,ascending order, ");
funcInssortInteger(size10Asc,10,"inssortInteger");

 System.out.println("inssort ,10 ,Integer , decreasing order, ");
funcInssortInteger(size10Des,10,"inssortInteger");

 System.out.println("inssort, 10 ,Integer, idendical keys, ");
funcInssortInteger(size10Ide,10,"inssortInteger");

 System.out.println("inssort , 10 ,Integer ,Few Duplicates, ");
funcInssortInteger(size10FewDup,10,"inssortInteger");

 System.out.println("inssort ,10 ,Integer ,Some Duplicates,");
funcInssortInteger(size10SomeDup,10,"inssortInteger");

 System.out.println("inssort ,10 ,Integer ,Many Duplicates, ");
funcInssortInteger(size10ManyDup,10,"inssortInteger");

 System.out.println("inssort , 10 ,Integer ,Slightly Disordered,");
funcInssortInteger(size10SlightlyDis,10,"inssortInteger");

 System.out.println();
 
 System.out.println("inssort ,100, Integer, random distribution, ");
funcInssortInteger(size100,100,"inssortInteger");

 System.out.println("inssort ,100, Integer , ascending order, ");
funcInssortInteger(size100Asc,100,"inssortInteger");

 System.out.println("inssort , 100, Integer , decreasing order, ");
funcInssortInteger(size100Des,100,"inssortInteger");

 System.out.println("inssort ,100 ,Integer ,idendical keys, ");
funcInssortInteger(size100Ide,100,"inssortInteger");

 System.out.println("inssort ,100, Integer ,Few Duplicates, ");
funcInssortInteger(size100FewDup,100,"inssortInteger");

 System.out.println("inssort , 100 ,Integer, Some Duplicates, ");
funcInssortInteger(size100SomeDup,100,"inssortInteger");

 System.out.println("inssort ,100 ,Integer ,Many Duplicates, ");
funcInssortInteger(size100ManyDup,100,"inssortInteger");

 System.out.println("inssort , 100, Integer, Slightly Disordered, ");
funcInssortInteger(size100SlightlyDis,100,"inssortInteger");

 System.out.println();
 
 System.out.println("inssort , 1000 ,Integer ,random distribution, ");
funcInssortInteger(size1000,1000,"inssortInteger");

 System.out.println("inssort , 1000 ,Integer , ascending order, ");
funcInssortInteger(size100Asc,1000,"inssortInteger");

 System.out.println("inssort ,1000, Integer , decreasing order,");
funcInssortInteger(size1000Des,1000,"inssortInteger");

 System.out.println("inssort , 1000 ,Integer ,idendical keys, ");
funcInssortInteger(size1000Ide,1000,"inssortInteger");

 System.out.println("inssort , 1000 ,Integer ,Few Duplicates ,");
funcInssortInteger(size1000FewDup,1000,"inssortInteger");

 System.out.println("inssort ,1000 ,Integer, Some Duplicates, ");
funcInssortInteger(size1000SomeDup,1000,"inssortInteger");

 System.out.println("inssort , 1000 , Integer, Many Duplicates,");
funcInssortInteger(size1000ManyDup,1000,"inssortInteger");

 System.out.println("inssort, 1000 , Integer , Slightly Disordered, ");
funcInssortInteger(size1000SlightlyDis,1000,"inssortInteger");

 System.out.println();

 System.out.println("inssort ,10000, Integer ,random distribution, ");
funcInssortInteger(size10000,10000,"inssortInteger");

 System.out.println("inssort , 10000 , Integer , ascending order,");
funcInssortInteger(size10000Asc,10000,"inssortInteger");

 System.out.println("inssort ,10000 , Integer , decreasing order, ");
funcInssortInteger(size10000Des,10000,"inssortInteger");

 System.out.println("inssort , 10000 , Integer, idendical keys,");
funcInssortInteger(size10000Ide,10000,"inssortInteger");

 System.out.println("inssort ,10000, Integer ,Few Duplicates, ");
funcInssortInteger(size10000FewDup,10000,"inssortInteger");

 System.out.println("inssort ,10000 ,Integer ,Some Duplicates, ");
funcInssortInteger(size10000SomeDup,10000,"inssortInteger");

 System.out.println("inssort, 10000, Integer ,Many Duplicates, ");
funcInssortInteger(size10000ManyDup,10000,"inssortInteger");

 System.out.println("inssort , 10000 , Integer ,Slightly Disordered, ");
funcInssortInteger(size10000SlightlyDis,10000,"inssortInteger");

 System.out.println();
 
 System.out.println("inssort2, 10 ,Integer, random distribution, ");
funcInssortInteger(size10,10,"inssort2Integer");

 System.out.println("inssort2 , 10 ,Integer , ascending order, ");
funcInssortInteger(size10Asc,10,"inssort2Integer");

 System.out.println("inssort2 ,10, Integer , decreasing order, ");
funcInssortInteger(size10Des,10,"inssort2Integer");

 System.out.println("inssort2 , 10 ,Integer ,idendical keys, ");
funcInssortInteger(size10Ide,10,"inssort2Integer");

 System.out.println("inssort2 ,10 ,Integer ,Few Duplicates,");
funcInssortInteger(size10FewDup,10,"inssort2Integer");

 System.out.println("inssort2 , 10 ,Integer, Many Duplicates, ");
funcInssortInteger(size10ManyDup,10,"inssort2Integer");

 System.out.println("inssort2 , 10 ,Integer, Some Duplicates, ");
funcInssortInteger(size10SomeDup,10,"inssort2Integer");

 System.out.println("inssort2 , 10, Integer, Slightly Disordered, ");
funcInssortInteger(size10SlightlyDis,10,"inssort2Integer");

 System.out.println();
 
 System.out.println("inssort2 ,100 ,Integer, random distribution, ");
funcInssortInteger(size100,100,"inssort2Integer");

 System.out.println("inssort2 , 100, Integer ,ascending order, ");
funcInssortInteger(size100Asc,100,"inssort2Integer");

System.out.println("inssort2 , 100 ,Integer , decreasing order, ");
 funcInssortInteger(size100Des,100,"inssort2Integer");

System.out.println("inssort2, 100 ,Integer ,idendical keys, ");
 funcInssortInteger(size100Ide,100,"inssort2Integer");

System.out.println("inssort2 , 100, Integer iFew Duplicates,");
 funcInssortInteger(size100FewDup,100,"inssort2Integer");

System.out.println("inssort2 , 100 ,Integer ,Some Duplicates, ");
 funcInssortInteger(size100SomeDup,100,"inssort2Integer");

System.out.println("inssort2 , 100 ,Integer, Many Duplicates, ");
 funcInssortInteger(size100ManyDup,100,"inssort2Integer");

System.out.println("inssort2 , 100 ,Integer ,Slightly Disordered, ");
 funcInssortInteger(size100SlightlyDis,100,"inssort2Integer");

 System.out.println();

System.out.println("inssort2 , 1000 ,Integer ,random distribution, ");
 funcInssortInteger(size1000,1000,"inssort2Integer");

System.out.println("inssort2 ,1000, Integer , ascending order, ");
 funcInssortInteger(size1000Asc,1000,"inssort2Integer");

System.out.println("inssort2 ,1000, Integer , decreasing order, ");
 funcInssortInteger(size1000Des,1000,"inssort2Integer");

System.out.println("inssort2 , 1000 ,Integer ,idendical keys, ");
 funcInssortInteger(size1000Ide,1000,"inssort2Integer");

System.out.println("inssort2 ,1000 ,Integer, Few Duplicates, ");
 funcInssortInteger(size1000FewDup,1000,"inssort2Integer");

System.out.println("inssort2 ,1000, Integer ,Some Duplicates ,");
 funcInssortInteger(size1000SomeDup,1000,"inssort2Integer");

System.out.println("inssort2 , 1000, Integer ,Many Duplicates, ");
 funcInssortInteger(size1000ManyDup,1000,"inssort2Integer");

System.out.println("inssort2 ,1000, Integer, Slightly Disordered, ");
 funcInssortInteger(size1000SlightlyDis,1000,"inssort2Integer");

 System.out.println();

System.out.println("inssort2 ,10000, Integer, random distribution, ");
 funcInssortInteger(size10000,10000,"inssort2Integer");

System.out.println("inssort2 , 10000 ,Integer , ascending order,");
 funcInssortInteger(size10000Asc,10000,"inssort2Integer");

System.out.println("inssort2 , 10000 ,Integer , decreasing order, ");
 funcInssortInteger(size10000Des,10000,"inssort2Integer");

System.out.println("inssort2 ,10000, Integer, idendical keys, ");
 funcInssortInteger(size10000Ide,10000,"inssort2Integer");

System.out.println("inssort2 , 10000 ,Integer, Few Duplicates, ");
 funcInssortInteger(size10000FewDup,10000,"inssort2Integer");

System.out.println("inssort2 ,10000 ,Integer ,Some Duplicates, ");
 funcInssortInteger(size10000SomeDup,10000,"inssort2Integer");

System.out.println("inssort2 , 10000 ,Integer ,Many Duplicates, ");
 funcInssortInteger(size10000ManyDup,10000,"inssort2Integer");

System.out.println("inssort2 , 10000, Integer, Slightly Disordered, ");
 funcInssortInteger(size10000SlightlyDis,10000,"inssort2Integer");

 System.out.println();
 
 setupDouble();

System.out.println("inssort, 10 ,double , ascending order, ");
 funcInssortDouble(dsize10Asc,10,"inssortDouble");

System.out.println("inssort ,10,double,  decreasing order, ");
 funcInssortDouble(dsize10Des,10,"inssortDouble");

System.out.println("inssort , 10 ,double ,idendical keys, ");
 funcInssortDouble(dsize10Ide,10,"inssortDouble");

System.out.println("inssort, 10 ,double ,Few Duplicates, ");
 funcInssortDouble(dsize10FewDup,10,"inssortDouble");

System.out.println("inssort , 10, double, Some Duplicates, ");
 funcInssortDouble(dsize10SomeDup,10,"inssortDouble");

System.out.println("inssort, 10 ,double ,Many Duplicates, ");
 funcInssortDouble(dsize10ManyDup,10,"inssortDouble");

System.out.println("inssort,10 ,double, Slightly Disordered,");
 funcInssortDouble(dsize10SlightlyDis,10,"inssortDouble");

 
 System.out.println();
System.out.println("inssort ,100, double ,ascending order, ");
 funcInssortDouble(dsize100Asc,100,"inssortDouble");

System.out.println("inssort ,100,double, decreasing order, ");
 funcInssortDouble(dsize100Des,100,"inssortDouble");

System.out.println("inssort , 100, double ,idendical keys, ");
 funcInssortDouble(dsize100Ide,100,"inssortDouble");

System.out.println("inssort , 100 ,double ,Few Duplicates, ");
 funcInssortDouble(dsize100FewDup,100,"inssortDouble");

System.out.println("inssort , 100 ,double, Some Duplicates, ");
 funcInssortDouble(dsize100SomeDup,100,"inssortDouble");

System.out.println("inssort , 100 ,double ,Many Duplicates,");
 funcInssortDouble(dsize100ManyDup,100,"inssortDouble");

System.out.println("inssort,100, double, Slightly Disordered, ");
 funcInssortDouble(dsize100SlightlyDis,100,"inssortDouble");

 System.out.println();

System.out.println("inssort , 1000 ,double , ascending order,");
 funcInssortDouble(dsize1000Asc,1000,"inssortDouble");

System.out.println("inssort,1000, double, decreasing order, ");
 funcInssortDouble(dsize1000Des,1000,"inssortDouble");

System.out.println("inssort , 1000 ,double ,idendical keys, ");
 funcInssortDouble(dsize1000Ide,1000,"inssortDouble");

System.out.println("inssort , 1000 ,double ,Few Duplicates,");
 funcInssortDouble(dsize1000FewDup,1000,"inssortDouble");

System.out.println("inssort ,1000 ,double ,Some Duplicates,");
 funcInssortDouble(dsize1000SomeDup,1000,"inssortDouble");

System.out.println("inssort , 1000 ,double ,Many Duplicates,");
 funcInssortDouble(dsize1000ManyDup,1000,"inssortDouble");

System.out.println("inssort,1000, double ,Slightly Disordered, ");
 funcInssortDouble(dsize1000SlightlyDis,1000,"inssortDouble");

 System.out.println();
System.out.println("inssort ,10000 ,double , ascending order, ");
 funcInssortDouble(dsize10000Asc,10000,"inssortDouble");

System.out.println("inssort , 10000 ,double, decreasing order,");
 funcInssortDouble(dsize10000Des,10000,"inssortDouble");

System.out.println("inssort , 10000 ,double, idendical keys, ");
 funcInssortDouble(dsize10000Ide,10000,"inssortDouble");

System.out.println("inssort , 10000, double, Few Duplicates, ");
 funcInssortDouble(dsize10000FewDup,10000,"inssortDouble");

System.out.println("inssort , 10000 ,double, Some Duplicates, ");
 funcInssortDouble(dsize10000SomeDup,10000,"inssortDouble");

System.out.println("inssort,10000 ,double, Many Duplicates, ");
 funcInssortDouble(dsize10000ManyDup,10000,"inssortDouble");

System.out.println("inssort , 10000, double, Slightly Disordered, ");
 funcInssortDouble(dsize10000SlightlyDis,10000,"inssortDouble");

 System.out.println();

 setupDouble();
System.out.println("inssort2 , 10 , double , ascending order: ");
 funcInssortDouble(dsize10Asc,10,"inssort2Double");

System.out.println("inssort2 , 10 ,double , decreasing order: ");
 funcInssortDouble(dsize10Des,10,"inssort2Double");

System.out.println("inssort2 ,10 ,double ,idendical keys: ");
 funcInssortDouble(dsize10Ide,10,"inssort2Double");

System.out.println("inssort2 , 10 ,double ,Few Duplicates: ");
 funcInssortDouble(dsize10FewDup,10,"inssort2Double");

System.out.println("inssort2 ,10 ,double, Many Duplicates: ");
 funcInssortDouble(dsize10ManyDup,10,"inssort2Double");

System.out.println("inssort2 ,10 ,double ,Some Duplicates: ");
 funcInssortDouble(dsize10SomeDup,10,"inssort2Double");

System.out.println("inssort2 , 10 ,double ,Slightly Disordered: ");
 funcInssortDouble(dsize10SlightlyDis,10,"inssort2Double");

 System.out.println();

System.out.println("inssort2 , 100, double , ascending order, ");
 funcInssortDouble(dsize100Asc,100,"inssort2Double");

System.out.println("inssort2 ,100 ,double , decreasing order,");
 funcInssortDouble(dsize100Des,100,"inssort2Double");

System.out.println("inssort2 ,100 ,double, idendical keys, ");
 funcInssortDouble(dsize100Ide,100,"inssort2Double");

System.out.println("inssort2 , 100 ,double, Few Duplicates, ");
 funcInssortDouble(dsize100FewDup,100,"inssort2Double");

System.out.println("inssort2 ,100, double, Some Duplicates, ");
 funcInssortDouble(dsize100SomeDup,100,"inssort2Double");

System.out.println("inssort2 ,100, double, Many Duplicates, ");
 funcInssortDouble(dsize100ManyDup,100,"inssort2Double");

System.out.println("inssort2 ,100 ,double ,Slightly Disordered, ");
 funcInssortDouble(dsize100SlightlyDis,100,"inssort2Double");

 System.out.println();

System.out.println("inssort2 ,1000 ,double , ascending order, ");
 funcInssortDouble(dsize1000Asc,1000,"inssort2Double");
System.out.println("inssort2,1000, double , decreasing order,");

 funcInssortDouble(dsize1000Des,1000,"inssort2Double");
System.out.println("inssort2 , 1000, double ,idendical keys, ");

 funcInssortDouble(dsize1000Ide,1000,"inssort2Double");
System.out.println("inssort2,1000 ,double, Few Duplicates ,");

 funcInssortDouble(dsize1000FewDup,1000,"inssort2Double");
System.out.println("inssort2 , 1000, double, Some Duplicates, ");

 funcInssortDouble(dsize1000SomeDup,1000,"inssort2Double");
System.out.println("inssort2 , 1000 ,double, Many Duplicates ,");

 funcInssortDouble(dsize1000ManyDup,1000,"inssort2Double");
System.out.println("inssort2 , 1000 ,double ,Slightly Disordered, ");

 funcInssortDouble(dsize1000SlightlyDis,1000,"inssort2Double");

 System.out.println();
System.out.println("inssort2 , 10000, double , ascending order,");

 funcInssortDouble(dsize10000Asc,10000,"inssort2Double");
System.out.println("inssort2 , 10000, double , decreasing order, ");

 funcInssortDouble(dsize10000Des,10000,"inssort2Double");
System.out.println("inssort2 , 10000 ,double ,idendical keys, ");

 funcInssortDouble(dsize10000Ide,10000,"inssort2Double");
System.out.println("inssort2 , 10000, double ,Few Duplicates, ");

 funcInssortDouble(dsize10000FewDup,10000,"inssort2Double");
System.out.println("inssort2 ,10000 ,double ,Some Duplicates, ");

 funcInssortDouble(dsize10000SomeDup,10000,"inssort2Double");
System.out.println("inssort2 , 10000 ,double, Many Duplicates,");

 funcInssortDouble(dsize10000ManyDup,10000,"inssort2Double");
System.out.println("inssort2 , 10000 ,double, Slightly Disordered, ");

 funcInssortDouble(dsize10000SlightlyDis,10000,"inssort2Double");

}
// Standard insertion sort
static void inssort(int[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      swap(A, j, j-1);
    }
}


// Standard insertion sort for Integer class
static void inssortInteger(Integer[] A, int startpos, int length) {
int temp;
for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
for (int j = i; (j>startpos) && (A[j].compareTo(A[j-1]) < 0); j--) {
swapInteger(A, j, j-1);
}
}

// Standard insertion sort for double type array
static void inssortDouble(double[] A,int startpos, int length) {
int temp;
for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
swapDouble(A, j, j-1);
}
}

// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2Integer(Integer[] A, int startpos, int length) {
Integer temp;
for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
for (int j = i; (j>startpos) && (A[j].compareTo(A[j-1]) < 0); j--) {
temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
}
}


// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2Double(double[] A, int startpos, int length) {
double temp;
for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
}
}

// Same as standard insertion sort, except get rid of the swap
// function call
static void inssort2(int[] A, int startpos, int length) {
  int temp;
  for (int i = startpos + 1; i < startpos + length; i++) // Insert i'th record
    for (int j = i; (j>startpos) && (A[j] < A[j-1]); j--) {
      temp = A[j]; A[j] = A[j-1]; A[j-1] = temp;
    }
}

    @SuppressWarnings("unchecked")
     static void funcInssort(int[] A,int length,String methodName){
        try {
            int [] array = new int[A.length];
            SortTest s = new SortTest();
            Class cls = s.getClass();
            Class[] c = new Class[3];
            c[0] = array.getClass();
            c[1] = int.class;
            c[2] = int.class;
            Method method = cls.getDeclaredMethod(methodName,c);
            method.setAccessible(true);

            int i;
            int numruns;
            for(numruns=0;numruns<20;numruns++){
            totaltime = 0;
            time1 = millis();
            for (i=0; i<TESTSIZE; i+=length)
            {
                Object[] arguments = { A,i,length };
                method.invoke(s,arguments);
            }
            time2 = millis();
            totaltime = time2 - time1;
       //     totaltime = totaltime/(TESTSIZE/length);
         //   System.out.println(totaltime);
            }
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }

    @SuppressWarnings("unchecked")
     static void funcInssortDouble(double[] A,int length,String methodName){
        try {
            double [] array = new double[A.length];
            SortTest s = new SortTest();
            Class cls = s.getClass();
            Class[] c = new Class[3];
            c[0] = array.getClass();
            c[1] = int.class;
            c[2] = int.class;
            Method method = cls.getDeclaredMethod(methodName,c);
            method.setAccessible(true);
            int numruns;
            int i;
            for(numruns=0;numruns<20;numruns++){
                totaltime = 0;
                time1 = millis();
            for (i=0; i<TESTSIZE; i+=length)
            {
                Object[] arguments = { A,i,length };
                method.invoke(s,arguments);
            }
            time2 = millis();
            totaltime = time2 - time1;
        //    totaltime = totaltime/(TESTSIZE/length);
         //   System.out.println(totaltime);
            }
        }
        catch(Exception ex){
            ex.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")

static void funcInssortInteger(Integer[] A,int length,String methodName){
    try {
        Integer [] array = new Integer[A.length];
        SortTest s = new SortTest();
        Class cls = s.getClass();
        Class[] c = new Class[3];
        c[0] = array.getClass();
        c[1] = int.class;
        c[2] = int.class;
        Method method = cls.getDeclaredMethod(methodName,c);
        method.setAccessible(true);

        int numruns;
        int i;
        for(numruns=0;numruns<20;numruns++){
            totaltime = 0;
            time1 = millis();
            for (i=0; i<TESTSIZE; i+=length)
            {
                Object[] arguments = { A,i,length };
                method.invoke(s,arguments);
            }
            time2 = millis();
            System.out.println(time1+"  "+time2);

            totaltime = time2 - time1;
          //  totaltime = totaltime/(TESTSIZE/length);
           // System.out.println(totaltime);
        }
    }
    catch(Exception ex){
        ex.printStackTrace();
    }
}

