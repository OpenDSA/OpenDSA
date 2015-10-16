import json, sys, requests, collections
'''
This program sends the required information to OpenDSA-server api to create canvas
course and to register the book.
'''

book_json_file = sys.argv[1]
conf_json_file = sys.argv[2]

with open(book_json_file) as book_config:
    book_json = json.load(book_config, object_pairs_hook=collections.OrderedDict)
with open(conf_json_file) as course_config:
    course_json = json.load(course_config, object_pairs_hook=collections.OrderedDict)

course_json['book_json'] = book_json

url = 'https://ltitest.cs.vt.edu:8443/api/v1/module/createcourse/'
headers = {'content-type': 'application/json'}

response = requests.post(url, data=json.dumps(course_json), headers=headers, verify=False)
print('Please wait, the course is being created in Canvas LMS ...')
response_obj = json.loads(response.content)

if response_obj['saved']:
  print('Course was created successfully')
else
  print('Somthing wrong happened ...')
