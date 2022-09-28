a=False
while not a:
     try:
        f_n=input("Enter file name")
        i_f = open(F_n,'r')
        print("File open successfully")
     except:
          print("Input file not found")
