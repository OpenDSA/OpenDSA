import re
DNA_Seq = 'GAGCGCTATGATTCGGCCCAAAAAA'
regex=re.find('ATG[ATGC]{3,30}A{5,10}',DNA_Seq)
print(regex.group(0))