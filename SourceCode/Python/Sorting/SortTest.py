from array import *
from random import *
from datetime import datetime

def success():
  print "Success! (We need to define this)"

numtests = 5
testsize = 10
SUCCESSx = True

# Perform numtests trials to test this
for tests in range(numtests):
  A = [randrange(1,1000) for _ in range(testsize)]
  print A
  sorttest(A)
  for i in (1, len(A)-1):
    if A[i] < A[i-1]:
      print "Error! Value ", A[i], " at position ", i, " was less than ", A[i-1], " at position ", (i-1)
      SUCCESSx = False
  print "Done!"

if SUCCESSx:
  success()
