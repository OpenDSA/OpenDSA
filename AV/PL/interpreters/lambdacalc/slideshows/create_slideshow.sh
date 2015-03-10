#!/bin/bash
exp="$1"
name="slideshow_${exp}.html"
cat ./utils/interpreter-top.html > "./AV/${name}"
echo "var lambdaexp = '${exp}';" >> "./AV/${name}"
echo "var reduction_steps = " >> "./AV/${name}"
node ./utils/scripts/interpreter.js "${exp}" >> "./AV/${name}"
cat ./utils/interpreter-bottom.html >> "./AV/${name}"
