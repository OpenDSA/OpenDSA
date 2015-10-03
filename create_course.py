import json, sys, requests
'''
This program sends the required information to OpenDSA-server api to create canvas
course and to register the book.
'''

book_json_file = sys.argv[1]
conf_json_file = sys.argv[2]

f = open(book_json_file, 'r')
book_json = json.loads(f.read())
f.close()

f = open(conf_json_file, 'r')
conf_json = json.loads(f.read())
f.close()

conf_json['book_json'] = book_json

url = 'https://ltitest.cs.vt.edu:8443/api/v1/module/createcourse/'
headers = {'content-type': 'application/json'}

response = requests.post(url, data=json.dumps(conf_json), headers=headers, verify=False)
print response.content
