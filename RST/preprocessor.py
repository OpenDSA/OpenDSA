#The preprocessor role is to create a dictionary of book objects and 
#a number representing their order of appearance in the document.
#The number is used as hyperlink text for cross referencing.
#The preprocessor also edit the html page to insert correct chapter and section numbers. 

__author__ = 'efouh'

import os
import sys
import re
import datetime
import shutil
import subprocess
import fnmatch
import json
import config
from optparse import OptionParser
from operator import itemgetter, attrgetter
from xml.dom.minidom import parse, parseString
from string import whitespace as ws


#a method to detect if the topic element is an example
def isExample(topic):
    if 'example' in topic.lower() and topic.startswith('.. topic::'):
        return True
    else:
        return False

def isTable(topic):
    if 'table' in topic.lower() and topic.startswith('.. topic::'):
        return True
    else:
        return False


def isTheorem(topic):
    if 'theorem' in topic.lower() and topic.startswith('.. topic::'):
        return True
    else:
        return False


#defines the color of output text (warnings, errors, and info)
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

    def disable(self):
        self.HEADER = ''
        self.OKBLUE = ''
        self.OKGREEN = ''
        self.WARNING = ''
        self.FAIL = ''
        self.ENDC = ''


#a class representing modules. Object attributes are module metadata.
#The constructor parses module file to extract metadata indentified by keywords
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
      self.exercises = []  #list of exercises in the module.
      p = re.compile('(%s)' % ('|'.join([c for c in ws])))
      flag = 0
      cpt=0
      start=-1
      end=-1
      len_wthsp=-1
      type=''
      desc=''
      fig = 1
      tab = 1
      exp = 1
      thr = 1 
      label = ''
      fls = open(filename,'r')
      data = fls.readlines()
      new_data = []
      fls.close()
      self.name = os.path.basename(filename)
      now = datetime.datetime.now()
      self.creation_date = now.strftime("%Y-%m-%d %H:%M:%S")
      self.last_modified = now.strftime("%Y-%m-%d %H:%M:%S")
      for line in data:
         cpt=cpt+1
         if ':short_name:' in line:
            str =  re.split('short_name:', line, re.IGNORECASE)[1]
            self.description = p.sub('',str.replace(' ',''))
         if ':prerequisites:' in line:
            str =  re.split('prerequisites:', line, re.IGNORECASE)[1]
            self.prereq = p.sub('',str).split(',')
         if ':author:' in line:
            str =  re.split('author:', line, re.IGNORECASE)[1]
            self.author = p.sub('',str.replace(' ','_')).replace('_',' ')
         if ':exercises:' in line:
            str =  re.split('exercises:', line, re.IGNORECASE)[1]
            self.exercises = p.sub('',str).split(',')
         if ':topic:' in line:
            str =  re.split('topic:', line, re.IGNORECASE)[1]
            self.covers =  p.sub('',str).split(',')
         #label = ''
         if line.startswith('.. _'):
            label =  re.split(':', re.split('.. _', line, re.IGNORECASE)[1], re.IGNORECASE)[0]
            if data[cpt+1].startswith('.. figure::') or data[cpt+1].startswith('.. odsafig::') or data[cpt+1].startswith('.. inlineav::'): 
               if os.path.splitext(os.path.basename(filename))[0] in config.table:
                 tb = config.table[os.path.splitext(os.path.basename(filename))[0]]
                 config.table[label] = tb + '.%s#' %fig
                 fig+=1
            if data[cpt+1].startswith('.. table::') or data[cpt+1].startswith('.. odsatab') or isTable(data[cpt+1]):
                if os.path.splitext(os.path.basename(filename))[0] in config.table:
                  tb = config.table[os.path.splitext(os.path.basename(filename))[0]]
                  config.table[label] = tb + '.%s#' %tab
                  tab+=1
                label = '-1' 
            if isExample(data[cpt+1]):
                if os.path.splitext(os.path.basename(filename))[0] in config.table:
                   tb = config.table[os.path.splitext(os.path.basename(filename))[0]]
                   config.table[label] = tb + '.%s#' %exp
                exp+=1
                label = '-2'
            if isTheorem(data[cpt+1]):
                if os.path.splitext(os.path.basename(filename))[0] in config.table:
                   tb = config.table[os.path.splitext(os.path.basename(filename))[0]]
                   config.table[label] = tb + '.%s#' %thr
                   thr+=1
                label = '-3'
 
         if isExample(line):
             if label == '-2':
                 label = ''
             else:
                 exp+=1
                    
         if isTheorem(line):
             if label == '-3':
                 label = ''
             else:
                 thr+=1
   

         if ':target:' in line:
             trgt =  re.split('target:', line, re.IGNORECASE)[1]
             trgt=p.sub('',trgt)
             if os.path.splitext(os.path.basename(filename))[0] in config.table:
                 tb = config.table[os.path.splitext(os.path.basename(filename))[0]]
                 config.table[trgt] = tb + '.%s#' %fig
                 fig+=1 
 
         if ('.. TODO::' in line  or '.. todo::' in line) and len_wthsp==-1 and start==-1 and end==-1:
            start = cpt+1
         if start==cpt:
            if line.isspace():
               start = cpt+1
            else:
               expr = re.match(r"^:\w+",line.replace(' ',''))
               if expr is not None:
                  if  ':type:' not in line:
                     print bcolors.FAIL + 'Error: in %s line %s... unknown Option %s for TODO directive'%(filename,cpt,expr.group()[1:]) + bcolors.ENDC
                     sys.exit(0)
               if ':type:' in line:
                  type =  re.split('type:', line, re.IGNORECASE)[1]
               len_wthsp = len(re.match(r'\s*',line).group())
               end =cpt+1
         if len_wthsp !=-1 and start!=end and start!=-1 and end!=-1 and not  line.isspace():
            if  len(re.match(r'\s*',line).group())== len_wthsp:
               end = cpt+1
               if cpt==len(data):
                  for i in range(start-1,end-1):
                     desc+=data[i]
                  config.todolist.append((filename,type,desc))
                  type=''
                  desc=''
                  start=-1
                  end=0
                  len_wthsp=-1
            else:
               end=cpt-1
               for i in range(start-1,end):
                  desc+=data[i]
               config.todolist.append((filename,type,desc))
               type=''
               desc=''
               start=-1
               end=0
               len_wthsp=-1
         if ('.. TODO::' in line  or '.. todo::' in line) and len_wthsp==-1 and start==-1 and end==0:
            start = cpt+1
            end = -1
         new_data.append(line)

      self.prereqNum = len(self.prereq)

   #Function that verifies that module prerequisites are in index.rst
   def verifPreref(self, modRoster):
      set1 = set(self.prereq)
      set2 = set(modRoster)
      for i in self.prereq:
         if i not in modRoster:
            self.prereq.remove(i)
      if not (set1.issubset(set2)):
         self.verifPreref(modRoster)
      self.prereqNum = len(self.prereq)


#Creates dump of all modules into a JSON file
def generateJSON(modRoster, modDest):

    jsonString='['
    l=1
    try:
       gfile = open(modDest+'/modules.json','w')
       for k in modRoster :
          jsonString = jsonString +'{"pk": %s,"model": "opendsa.module",'%l
          jsonString = jsonString +'"fields": {'    # "summative": %s,'%k.summative
          #jsonString = jsonString +'"h_position": %s,'%k.h_position
          jsonString = jsonString +'"name": "'+k.description+'",'
          jsonString = jsonString +'"last_modified": "'+k.last_modified+'",'
          jsonString = jsonString +'"author": "'+k.author+'",'
          pq= ('-'.join(map(str,k.prereq)), '')[k.prereqNum==0]
          jsonString = jsonString +'"prerequisites": "'+ pq+'",'
          #pe = ','.join(k.exercises)
          #jsonString = jsonString +'"exercise_list": "'+ pe+'",'
          jsonString = jsonString +'"covers": "'+",".join(k.covers)+'",'
          jsonString = jsonString +'"creation_date": "'+k.creation_date+'",'
          jsonString = jsonString +'"short_display_name": "'+k.name[:-4]+'",'
          #jsonString = jsonString +'"v_position": %s,'%k.v_position
          #jsonString = jsonString +'"raw_html": "'+k.raw_html+
          '"}},'
          l=l+1
       jsonString = jsonString[:-1] +']'
       gfile.writelines(jsonString)
       gfile.close
    except IOError:
       print 'ERROR: When saving JSON file'


#Creates dump of all modules into a CSV file
def generateCSV(modRoster, modDest):

    csvString='h_position,name,v_position,author,prerequisites,summative,covers,seconds_per_fast_problem,live,short_display_name,key\n'
    l=2001
    try:
       gfile = open(modDest+'/modules.csv','w')
       for k in modRoster :
          s = datetime.datetime.strptime(k.last_modified, "%Y-%m-%d %H:%M:%S")
          csvString = csvString +s.strftime("%Y-%m-%dT%H:%M:%S")+','
          csvString = csvString +'%s,'%k.h_position
          csvString = csvString +k.name[:-5]+','
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

#creates a tree of modules based on the number of prerequisites.
#it was/will be use for the concept/knowledge map
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


def is_file_modified(dict, dir, file, run_number):

     if run_number == 0:
          return True
     if file in dict:
         return str(os.path.getmtime(dir+'/'+file)).strip() != str(dict[file]).strip()
     else:
         return False

#This method is run after Sphinx has created all html files. 
#It loads the correct chapter and section numbers of each section and hyperlink from page_chapter.json file created
# by enumFile method before running Sphinx. The method also writes in count.txt the modification date of the file to avoid
#parsing non modified files  
def updateTOC(args):
    iFile = open(args[0]+'index.rst','r')
    iLine = iFile.readlines()
    iFile.close()
    directive=0
    sectnum = 0
    chapter = ''
    prefix = ''
    start = False
    for lins in iLine:
      if '.. sectnum::' or '.. chapnum::' in lins:
         directive=1
      if ':prefix:' in lins:
         prefix = re.split('prefix:', lins, re.IGNORECASE)[1]
         #break
      if ':start:' in lins:
         sectnum = int(re.split('start:', lins, re.IGNORECASE)[1])
         start = True
    if directive==0:
       print bcolors.FAIL + 'Error: No .. sectnum:: or .. chapnum:: directive in index.rst. Please include the directive and try again.'+bcolors.ENDC
       sys.exit(0)


    try:
       table=open('page_chapter.json')
       data = json.load(table)
       table.close()
    except IOError:
       print 'ERROR: No table.json file.'


    cFile = open(args[1]+'/count.txt','r')
    cLine = cFile.readlines()
    cFile.close()
    num = int(cLine[0])
    f_dict ={}
    if len(cLine)>1:
        for cln in cLine:
           if ':' in cln:
               f_dict[cln.split(':')[0]] = cln.split(':')[1]

    for pagename in os.listdir(args[1]):
       if pagename=='index.html':
          idx  = open(args[1]+'/index.html','r')
          idxL = idx.readlines()
          idx.close()
          modIndex =[]
          for idxLine in idxL:
             #inject css rule to remove haiku's orange bullets
             if '</head>' in idxLine:      
                 idxLine = idxLine.replace('</head>','<style>\nul li {\n\tbackground: none;\n\tlist-style-type: none;\n}\n</style>\n</head>')      
             if 'class="section"' in idxLine:
                if not start:
                    sectnum+=1
                else:
                    start = False
             if 'class="headerlink"' in idxLine:
                chapter = re.split('>',re.split('<a class="headerlink"', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
             if 'class="toctree-l' in idxLine and 'Gradebook' not in idxLine:
                 str1 = re.split('>', re.split('</a>', idxLine, re.IGNORECASE)[0], re.IGNORECASE)
                 str = str1[len(str1)-1]
                 str2 ='%s.' % sectnum + str
                 idxLine = idxLine.replace(str,str2)
             modIndex.append(idxLine)
          otfile = open(args[1]+'/index.html','wb')
          otfile.writelines(modIndex)
          otfile.close()

       processedFiles=[]
       if pagename[:-5] not in processedFiles:
          processedFiles.append(pagename[:-5])
          if os.path.splitext(pagename)[1][1:] =='html' and is_file_modified(f_dict, args[1], pagename, num):
             idx  = open(args[1]+'/'+pagename,'r')
             idxL = idx.readlines()
             idx.close()
             modIndex =[]
             pagename = pagename[:-5]
             header =''
             td = 0
             if pagename in data:
                chap = data[pagename]
                header = '%s %s %s' %(prefix,chap[1],chap[0])
             else: #special case ToDo.html, we put all the other files in the Appendix chapter
                chap = data['Bibliography']
                header = '%s %s %s' %(prefix,chap[1],chap[0])
                td = 1
             for idxLine in idxL:
                if 'id="prevmod"' in idxLine or 'id="nextmod"' in idxLine or 'id="prevmod1"' in idxLine or 'id="nextmod1"' in idxLine:
                   prev = re.split('">',re.split('</a>', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
                   href = re.split('href="',re.split('">', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
                   if href[:-5] in data:
                      chap = data[href[:-5]]
                      str = '%s.' %chap[1] + prev
                      idxLine = idxLine.replace(prev,str)
                   if  href[:-5]=='ToDO':   #special case ToDo.html
                      chap = data['Bibliography']
                      str = '%s.' %chap[1] + prev
                      idxLine = idxLine.replace(prev,str)
                if '<h2 class="heading"><span>'  in idxLine and pagename != 'index' and pagename != 'Gradebook':
                   heading = re.split('<span>',re.split('</span>', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
                   idxLine = idxLine.replace(heading,header)
                if '<title>'  in idxLine and pagename != 'index' and pagename != 'Gradebook':
                   title = re.split('<title>',re.split('</title>', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
                   number_title = '%s.' %chap[1] + title
                   idxLine = idxLine.replace(title,number_title)
                for i in range(1,7):
                   if '<h%s>' %i in idxLine and td==0 and pagename != 'index' and pagename != 'Gradebook':
                      par  = re.split('<h%s>'%i,re.split('<a', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
                      par1 = '%s.' %data[pagename][1] + par
                      idxLine = idxLine.replace(par,par1)
                if td == 1 and pagename != 'index' and pagename != 'Gradebook':
                    if 'a class="headerlink"' in idxLine:
                      par  = re.split('<h1>',re.split('<a', idxLine, re.IGNORECASE)[0],re.IGNORECASE)[1]
                      par1 = '%s.' %chap[1] + par
                      idxLine = idxLine.replace(par,par1)
                modIndex.append(idxLine)
             otfile = open(args[1]+'/'+pagename+'.html','wb')
             otfile.writelines(modIndex)
             otfile.close()
             otfile = open(args[1]+'/count.txt','a')
             tsize = os.path.getmtime(args[1]+'/'+pagename+'.html')
             otfile.writelines('%s.html:%s\n'%(pagename,tsize))
             otfile.close()

#creates the ToDo.html page
def todoHTML(todolst):

   tp =''
   mn=0
   rst='.. _Todo:\n\n.. raw:: html\n\n   <script>ODSA.SETTINGS.DISP_MOD_COMP = false;ODSA.SETTINGS.MODULE_NAME = "ToDo";ODSA.SETTINGS.MODULE_LONG_NAME = "ToDo";</script>\n\n.. index:: ! todo\n\nTODO List\n=========\n\n'
   for i, (k,v,s) in enumerate(todolst):
         if tp=='' and v=='':
            if mn==0:
               rst+='.. raw:: html\n\n   <hr /><h1>No Category</h1><hr />\n   <p></p><h2>%s</h2>\n\n.. TODO::\n%s\n'%(k.replace('/',': ')[:-4],s[:-1])
               mn=-1
            else:
               rst+='.. raw:: html\n\n   <h2>%s</h2>\n\n.. TODO::\n%s\n'%(k.replace('/',': ')[:-4],s)
         if tp==v and v!='' and tp!='':
            rst+='.. raw:: html\n\n   <h2>%s</h2>\n\n.. TODO::\n%s\n'%(k.replace('/',': ')[:-4],s)
         if tp=='' and v!='':
            tp=v
            rst+='.. raw:: html\n\n   <hr /><h1>%s</h1>\n   <hr />\n\n.. raw:: html\n\n   <h2>%s</h2>\n\n.. TODO::\n%s\n'%(v.capitalize()[:-1],k.replace('/',': ')[:-4],s[:-1])
         if tp!=v and  v!='' and tp!='':
            tp=v
            rst+='.. raw:: html\n\n   <hr /><h1>%s</h1>\n   <hr />\n\n.. raw:: html\n\n   <h2>%s</h2>\n\n.. TODO::\n%s\n'%(v.capitalize()[1:-1],k.replace('/',': ')[:-4],s[:-1])
   otfile = open('source/ToDo.rst','w')
   otfile.writelines(rst)
   otfile.close()
   return rst

def control(argv, args):
   if len(args)==2:
      if not os.path.exists(args[0]):
         sys.stderr.write("ERROR: <module directory> %s does not exist! \n" % (args[0],))
         sys.exit(0)
      if not os.path.exists(args[1]):
         os.mkdir(args[1])
   else:
      print bcolors.FAIL +"ERROR. Usage: %s [-p]  <source directory>  <destination directory>\n" % (argv[0],)  + bcolors.ENDC
      sys.exit(0)


def isSection(txt):
   if txt.startswith('-') or txt.startswith('+') or txt.startswith('=') or txt.startswith('*'):
      return True
   else:
      return False

def isIncludeChapter(txt):
   if txt.startswith('='):
      return True
   else:
      return False

#get the start number for sectnum and chapnum directives
def getSectionStartNumb(indexfile):

   directive = 0
   iFile = open(indexfile,'r')
   iLine = iFile.readlines()
   iFile.close()
   for lins in iLine:
      if '.. sectnum::' or '.. chapnum::' in lins:
         directive=1
      if ':start:' in lins and directive == 1 :
         sectnum = int(re.split('start:', lins, re.IGNORECASE)[1])
         return sectnum-1
   return 0


#Parses all modules files in index.rst and associates each section to their chaper and section numbers 
# in the following format "chapter_number.section_number". The dictionary created is dumped into a file.
#the file will be used after all html files are created to replace sphinx hyperlink text with numbers. 
def enumFile(folder, folder1):

   filelist = []
   dirlist=[]
   iFile = open(folder+'index.rst','r')
   iLine = iFile.readlines()
   iFile.close()
   iLine1 = []
   chap = ''
   chap_mod = {}
   t = 0
   section = getSectionStartNumb(folder+'index.rst')
   chapter = 1
   flag = -1

   p = re.compile('(%s)' % ('|'.join([c for c in ws])))

   for filename in os.listdir(folder):
      dirlist.append(os.path.splitext(filename)[0])
   j = 0
   for e in iLine:
      iLine1.append(p.sub('',e))
      j+=1
   chap = ''
   for flnm in iLine1:
     if t < len(iLine1)-1:
        if isSection(iLine1[t+1]):
           flag = 1
           chap = iLine[t]
        if flnm in dirlist and not isSection(iLine1[t+1]):
           chaplist =[]
           filelist.append(folder+flnm+'.rst')
           #in case we have multiple chapter in a single file
           iFile2 = open(folder+flnm+'.rst','r')
           iLine2 = iFile2.readlines()
           iFile2.close()
           line_number = 0
           is_first_chapter = True
           for mod in iLine2:
              if isIncludeChapter(mod):
                 if is_first_chapter:
                    config.table[flnm]='%s.%s'%(section,chapter)
                    chaplist.append(chap.rstrip('\n'))
                    chaplist.append(section)
                    chap_mod[flnm]= chaplist
                    is_first_chapter = False
                 else:
                    config.table[flnm+'#'+iLine2[line_number-1].rstrip('\n').replace(' ','-').lower()]='%s.%s'%(section,chapter)
                    chaplist.append(chap.rstrip('\n'))
                    chaplist.append(section)
                    chap_mod[flnm+'#'+iLine2[line_number].rstrip('\n').replace(' ','-').lower()]= chaplist
                 chapter+=1
              line_number +=1
     if isSection(flnm):
           section +=1
           chapter = 1
           flag=-1
     t=t+1
   filelist.append(folder+'index.rst')
   try:
        otfile = open('page_chapter.json','w')
        json.dump(chap_mod,otfile)
        otfile.close()
   except IOError:
        print 'ERROR: When saving JSON file'
   return filelist



def main(argv):
  parser = OptionParser()
  parser.add_option("-p", "--postprocess", help="updates the table of content after the book is built", dest="postp", action="store_true")
  (options, args) = parser.parse_args()
  control(argv,args)

  if options.postp is not None:
     updateTOC(args)
  else:
     modDir=''
     modDest=''
     sc=''
     modDir=args[0]
     modDest=args[1]

     fileLst =  enumFile(modDir,modDest)
     modList =[]
     modRost=[]


     for fl in fileLst:
        if os.path.splitext(fl)[1][1:] == 'rst' and 'ToDo.rst' not in fl:
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

     #ToDO list page
     todolist1 = sorted(config.todolist, key=lambda todo: todo[1])
     todoHTML(todolist1)

     #Write table to a file
     try:
        otfile = open('table.json','wb')
        json.dump(config.table,otfile)
     except IOError:
        print 'ERROR: When saving JSON file'

     num = -1
     cLine = [0]
     if (os.path.exists(modDest+'/count.txt')):
        cFile = open(modDest+'/count.txt','r')
        cLine = cFile.readlines()
        cFile.close()
        num = int(cLine[0])
     if num == -1 :
        num = 0
     else:
        num += 1

     try:
        gfile = open(modDest+'/count.txt','wb')
        cLine[0] = '%s\n'%num
        gfile.writelines(cLine)
        gfile.close
     except IOError:
        print 'ERROR: When saving file'


if __name__ == "__main__":
   sys.exit(main(sys.argv))
