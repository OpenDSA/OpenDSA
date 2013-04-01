testsize = 1000
time1 = 0
time2 = 0

def checkorder(A):
  for i in range(1, len(A)-1):
    if (A[i] < A[i - 1]):
      print "Error! Value ", A[i], " at position ", i, " was less than ", A[i - 1], " at position ", (i - 1)

A = [randrange(1,1000) for _ in range(testsize)]
sorttime(A)
