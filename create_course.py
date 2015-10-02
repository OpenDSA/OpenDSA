import json, sys, requests

# print(sys.argv[1])
# print(sys.argv[2])

book_json_file = sys.argv[1]
conf_json_file = sys.argv[2]
f = open(book_json_file, 'r')
book_json = json.loads(f.read())
f.close()
f = open(conf_json_file, 'r')
conf_json = json.loads(f.read())
f.close()

# book_json= json.loads(sys.argv[1])
# conf_json= json.loads(sys.argv[2])

# req = urllib2.Request('http://abc.com/api/posts/create')
# req.add_header('Content-Type', 'application/json')

conf_json['book_json'] = book_json
# print(json.dumps(conf_json))

# response = urllib2.urlopen(req, json.dumps(data))
# use requests
url = 'https://ltitest.cs.vt.edu:8443/api/v1/module/createcourse/'
# payload = {'some': 'data'}
headers = {'content-type': 'application/json'}

response = requests.post(url, data=json.dumps(conf_json), headers=headers, verify=False)
# response = requests.post(url, data=conf_json, headers=headers, verify=False)
# response = requests.post(url, data=conf_json, verify=False)
print response.content
