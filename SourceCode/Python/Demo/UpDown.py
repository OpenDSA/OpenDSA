runs = 1000

count = 1000
print "Doing ", count, " times"

time1 = datetime.now()
sum1 = 0
for i in xrange(0, runs):
  for j in xrange(0, count):
    sum1 = sum1 + 1
time2 = datetime.now()

sum2 = 0;
for i in reversed(xrange(0, runs)):
  for j in reversed(xrange(0, count)):
    sum2 = sum2 + 1
time3 = datetime.now()

sum3 = 0; i = 0; j = 0;
while i != runs:
  j = 0;
  while j != count:
    sum3 = sum3 + 1;
    j = j + 1;
  i = i + 1;
time4 = datetime.now()

sum4 = 0; i = 0; j = 0;
while i < runs:
  j = 0;
  while j < count:
    sum4 = sum4 + 1;
    j = j + 1;
  i = i + 1;
time5 = datetime.now()

print "Up time is ", millis(time2 - time1)
print "Down time is ", millis(time3 - time2)
print "While time is ", millis(time4 - time3)
print "While time 2 is ", millis(time5 - time4)

print "Sum1 is ", sum1, ", sum2 is ", sum2
print "Sum3 is ", sum3
print "Sum4 is ", sum4
