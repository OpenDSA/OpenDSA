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

# f = open(book_json_file, 'r')
# book_json = json.loads(f.read())
# f.close()

# f = open(course_json_file, 'r')
# course_json = json.loads(f.read())
# f.close()

course_json['book_json'] = book_json

url = 'https://ltitest.cs.vt.edu:8443/api/v1/module/createcourse/'
headers = {'content-type': 'application/json'}

# response = requests.post(url, data=json.dumps(course_json), headers=headers, verify=False)
response = requests.post(url, data=course_json, headers=headers, verify=False)
print response.content
