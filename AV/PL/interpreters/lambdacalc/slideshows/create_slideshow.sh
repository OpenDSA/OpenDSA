#!/bin/bash
exp="$1"
name="slideshow_${exp}.html"

echo "var LAMBDA = {};" > tmp.js;
echo "var running_in_node = true;" >> tmp.js
echo "var exp = '${exp}';"  >> tmp.js
echo "var require = undefined;"  >> tmp.js
cat ../version1.4/scripts/grammar.js >> tmp.js
cat ../version1.4/scripts/absyn.js >> tmp.js
cat ../version1.4/scripts/interpreter.js >> tmp.js

cat ./utils/interpreter-top.html > "./AV/${name}"
echo "var lambdaexp = '${exp}';" >> "./AV/${name}"
echo "var reduction_steps = " >> "./AV/${name}"
node tmp.js >> "./AV/${name}"
rm tmp.js
cat ./utils/interpreter-bottom.html >> "./AV/${name}"
