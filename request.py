#!/usr/bin/python

import requests, sys, json

assert len(sys.argv) == 3

proxy = 'http://{}:{}'.format(sys.argv[1], sys.argv[2])
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'}

try:
	r = requests.get('http://shiuhsenang.com', headers = headers, proxies = {'http': proxy}, timeout = 
20)
	print r
except:
	print json.dumps({'summary': 'request.py failed'})
