import os
import sys
import re
import datetime
import shutil
import subprocess
import fnmatch
import json
from operator import itemgetter, attrgetter
from xml.dom.minidom import parse, parseString
from string import whitespace as ws


class modPreReq:
   
   def __init__(self,filename):
      self.name =''  #field short_display_name in the database
      self.description=''   #field name in the database
      self.prereq=[]    # field prerequisites in the database
      self.prereqNum =0
      self.short_display_name=''
      self.v_position=0
      self.h_position=0
      self.seconds_per_fast_problem=5.0
      self.live='true'
      self.summative='false'
      self.author = ''
      self.raw_html=''
      self.creation_date = ''
      self.last_modified =''
      self.covers=''
      p = re.compile('(%s)' % ('|'.join([c for c in ws])))
      flag = 0
      fls = open(filename,'r')
      data = fls.readlines()
      fls.close()
      self.name = os.path.basename(filename)
      now = datetime.datetime.now()
      self.creation_date = now.strftime("%Y-%m-%d %H:%M:%S")
      self.last_modified = now.strftime("%Y-%m-%d %H:%M:%S")
      for line in data:
         if ':short_name:' in line:
            str =  re.split('short_name:', line, re.IGNORECASE)[1]
            self.description = p.sub('',str.replace(' ',''))
         if ':prerequisites:' in line:
            str =  re.split('prerequisites:', line, re.IGNORECASE)[1]
            self.prereq = p.sub('',str).split(',')   #.append(str.partition('"')[0])
         if ':author:' in line:
            str =  re.split('author:', line, re.IGNORECASE)[1]
            self.author = p.sub('',str.replace(' ','_')).replace('_',' ')     
         if ':topic:' in line:
            str =  re.split('topic:', line, re.IGNORECASE)[1]
            self.covers =  p.sub('',str).split(',')         #str 
      self.prereqNum = len(self.prereq)


   def verifPreref(self, modRoster):
      modRosterl = [x.lower() for x in modRoster]
      set1 = set(self.prereq)
      set2 = set(modRosterl)
      for i in self.prereq:
         if i not in modRosterl:
            self.prereq.remove(i)
      if not (set1.issubset(set2)):
         self.verifPreref(modRosterl)
      self.prereqNum = len(self.prereq) 
      

def generateJSON(modRoster, modDest):
    
    jsonString='['
    l=1
    try:
       gfile = open(modDest+'/modules.json','w')
       #gfile.writelines('[\n')
       for k in modRoster :
          jsonString = jsonString +'{"pk": %s,"model": "showfile.exercise",'%l
          jsonString = jsonString +'"fields": {"summative": %s,'%k.summative
	  jsonString = jsonString +'"h_position": %s,'%k.h_position
          jsonString = jsonString +'"name": "'+k.description+'",'
          jsonString = jsonString +'"last_modified": "'+k.last_modified+'",'
          jsonString = jsonString +'"author": "'+k.author+'",'
          pq= ('-'.join(map(str,k.prereq)), '')[k.prereqNum==0]
          jsonString = jsonString +'"prerequisites": "'+ pq+'",'
          jsonString = jsonString +'"covers": "'+",".join(k.covers)+'",'
          jsonString = jsonString +'"creation_date": "'+k.creation_date+'",'
          jsonString = jsonString +'"seconds_per_fast_problem": %s,'%k.seconds_per_fast_problem
          jsonString = jsonString +'"live": %s,'%k.live
          jsonString = jsonString +'"short_display_name": "'+k.name[:-4]+'",'
          jsonString = jsonString +'"v_position": %s,'%k.v_position
          jsonString = jsonString +'"raw_html": "'+k.raw_html+'"}},'
          l=l+1
       jsonString = jsonString[:-1] +']'
       gfile.writelines(jsonString)
       gfile.close
    except IOError:
       print 'ERROR: When saving JSON file'

def generateCSV(modRoster, modDest):

    csvString='last_sanitized,h_position,name,v_position,author,prerequisites,summative,covers,seconds_per_fast_problem,live,short_display_name,key\n'
    l=2001
    try:
       gfile = open(modDest+'/modules.csv','w')
       #gfile.writelines('[\n')
       for k in modRoster :
          s = datetime.datetime.strptime(k.last_modified, "%Y-%m-%d %H:%M:%S") 
          csvString = csvString +s.strftime("%Y-%m-%dT%H:%M:%S")+',' 
          csvString = csvString +'%s,'%k.h_position
          csvString = csvString +k.name[:-5]+','                                              #k.description+','  #name 
          csvString = csvString +'%s,'%k.v_position   #v_position 
          csvString = csvString +k.author+',' #author
          pq= (';'.join(map(str,k.prereq)), '')[k.prereqNum==0] #prerequisites 
          csvString = csvString +pq+','
          csvString = csvString +'%s,'%k.summative 
          csvString = csvString +",".join(k.covers)+','
          csvString = csvString +'%s,'%k.seconds_per_fast_problem
          csvString = csvString +'%s,'%k.live
          csvString = csvString +k.description+','                                             #k.name[:-5]+',' 
          csvString = csvString +'%s\n'%l
          l=l+1
       gfile.writelines(csvString)
       gfile.close
    except IOError:
       print 'ERROR: When saving CSV file'


def modOrdering(modRoster):

   finalMod=[]
   tmpMod=[]
   q = len(modRoster)
   v = 1
   h = 1
   for k in modRoster :
      if k.prereqNum == 0:
         k.v_position = v
         finalMod.append(k)
         modRoster.remove(k)
         tmpMod.append(os.path.splitext(os.path.basename(k.name))[0])
         v =v+1
   v=1
   while len(finalMod) <= q:
      for l in modRoster:
         set1 = set(l.prereq)
         set2 = set(tmpMod)
         set3 = set1.difference(set2)
         if len(set3)==0:
            l.v_position = v
            l.h_position = h
            finalMod.append(l)
            tmpMod.append(os.path.splitext(os.path.basename(l.name))[0])
            modRoster.remove(l)
            v=v+1
      h=h+1
      v=1 
      if(len(modRoster)==1):
         m = modRoster.pop()
         m.v_position = v
         m.h_position = h
         finalMod.append(m)
         #tmpMod.append(os.path.splitext(os.path.basename(modRoster.pop().name))[0])
            #modRoster.remove(l)
         return finalMod
   return finalMod




def remove_eol (line):
        if line[-1] == '\n':
           return line[:-1]
        else:
            return line


def which(program):
    def is_exe(fpath):
        return os.path.exists(fpath) and os.access(fpath, os.X_OK)

    def ext_candidates(fpath):
        yield fpath
        for ext in os.environ.get("PATHEXT", "").split(os.pathsep):
            yield fpath + ext

    fpath, fname = os.path.split(program)
    if fpath:
        if is_exe(program):
            return program
    else:
        for path in os.environ["PATH"].split(os.pathsep):
            exe_file = os.path.join(path, program)
            for candidate in ext_candidates(exe_file):
                if is_exe(candidate):
                    return candidate

    return None

def copyfiles(srcdir, dstdir, filepattern):
    def failed(exc):
        raise exc

    for dirpath, dirs, files in os.walk(srcdir, topdown=True, onerror=failed):
        for file in fnmatch.filter(files, filepattern):
            shutil.copy2(os.path.join(dirpath, file), dstdir)
        break # no recursion



def control(argv):
   if (len(argv) < 3 or len(argv) > 3):
      sys.stderr.write("Usage: %s <source directory>  <destination directory>\n" % (argv[0],))
      sys.exit(0)
      #return 1
   if len(argv)==3:
      if not os.path.exists(argv[1]):
         sys.stderr.write("ERROR: <module directory> %s does not exist! \n" % (argv[1],))
         sys.exit(0)
      if not os.path.exists(argv[2]):
         os.mkdir(argv[2])
   
def enumFile(folder):

   filelist = []
   iFile = open(folder+'index.rst','r')
   iLine = iFile.readlines()
   iFile.close()
   iLine1 = [] 
   p = re.compile('(%s)' % ('|'.join([c for c in ws])))
   for e in iLine:
      iLine1.append(p.sub('',e))

   for filename in os.listdir(folder):
     if os.path.splitext(filename)[0] in iLine1:
        filelist.append(folder+filename)
   return filelist



def main(argv):
  control(argv)
  modDir=''
  modDest=''
  sc='' 
  if len(argv)==3:
     modDir=argv[1]
     modDest=argv[2]

  fileLst =  enumFile(modDir)
  modList =[]
  modRost=[]
  for fl in fileLst:
     if os.path.splitext(fl)[1][1:] == 'rst': 
        modRost.append(os.path.splitext(os.path.basename(fl))[0])
        x = modPreReq(fl)
        modList.append(x)

  modList1 = sorted(modList,key = attrgetter('prereqNum'))
  for ml in modList1:
     ml.verifPreref(modRost)
  finalList =modOrdering(modList1)

  #create JSON and CSV files with modules information
  generateJSON(finalList, modDest)
  generateCSV(finalList, modDest) 

if __name__ == "__main__":
   sys.exit(main(sys.argv))
