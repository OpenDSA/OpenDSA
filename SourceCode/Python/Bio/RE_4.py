import re 
DNA_Seq='''ATTCG     AGGTC     CCGAT     GGCAT
         GATCA     TCGAT     TACAT     GCCAT'''
         
regex=re.sub('\d|\n|\t| ',"",DNA_Seq)
print(regex)