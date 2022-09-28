set={"pop","rock","soul","Hard rock","rock","rock","Easy"}
set
set1={"AbdElrahman","Omar","Salah"}
set2={"Nader","Amr","Ali"}
set1.add("Osama")
set1.update(set2)
set1.discard("Amr")
set1.remove("Amr")
set3={"Ali","Ezzat","Emad"}
set4 = set2.intersection(set3)
set4
set2.intersection_update(3)
set5={"AbdElrahman","Omar","Salah"}
set6={"Nader","Amr","Ali"}
set5.symmetric_difference_update(set6)
set7 = set5.symmetric_difference(set6)
set7



