import os
import sys
import re
import datetime
import shutil
import subprocess
import fnmatch
import json
import time
from optparse import OptionParser
from operator import itemgetter, attrgetter
from xml.dom.minidom import parse, parseString
from string import whitespace as ws







def generateJSON():
    jsonString='['
    l=1
    try:
       gfile = open('initial_data.json','w')
       for filename in os.listdir("."):
          gfile = open('initial_data.json','w')
          if os.path.splitext(filename)[1][1:] == 'xml':   
             dom = parse(filename)
             node = dom.documentElement 
             short_name = os.path.splitext(filename)[0]    
             titles = dom.getElementsByTagName("title")
             for title in titles:
                nodes = title.childNodes
                for node in nodes:
                   if node.nodeType == node.TEXT_NODE:
                      name=node.data

             jsonString = jsonString +'{"pk": %s,"model": "opendsa.exercise",'%l
             jsonString = jsonString +'"fields": {"summative": "False",'  
             jsonString = jsonString +'"h_position": "0",'   
             jsonString = jsonString +'"name": "'+ short_name +'",'
             jsonString = jsonString +'"description": "'+ name +'",' 
             mod_time = datetime.datetime.fromtimestamp(float(os.path.getmtime(filename)))   
             #jsonString = jsonString +'"last_modified": "",' #%mod_time      
             jsonString = jsonString +'"author": "",'
             jsonString = jsonString +'"prerequisites": "",'
             jsonString = jsonString +'"covers": "",'
             #jsonString = jsonString +'"creation_date": "",'
             jsonString = jsonString +'"seconds_per_fast_problem": "10",'
             jsonString = jsonString +'"live": "True",'   
             jsonString = jsonString +'"short_display_name": "'+short_name+'",'
             jsonString = jsonString +'"v_position": "0",' 
             jsonString = jsonString +'"raw_html": ""}},'
             l=l+1

       jsonString = jsonString[:-1] +']'
       gfile.writelines(jsonString)
       gfile.close
    except IOError:
       print 'ERROR: When saving JSON file'

def main(argv):
   generateJSON()   


if __name__ == "__main__":
   sys.exit(main(sys.argv)) 
