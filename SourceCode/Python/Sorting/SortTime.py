testsize = 10000
time1 = 0
time2 = 0

def checkorder(A):
  for i in range(1, len(A)-1):
    if (A[i] < A[i - 1]):
      print "Error! Value ", A[i], " at position ", i, " was less than ", A[i - 1], " at position ", (i - 1)

A = [randrange(1,1000) for _ in range(testsize)]
# A = [(x+1) for x in range(testsize)]
# A = [(200000-x) for x in range(testsize)]

sorttime(A)
