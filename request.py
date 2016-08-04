import requests, sys

assert len(sys.argv) == 3

proxy = 'http://{}:{}'.format(sys.argv[1], sys.argv[2])

try:
	requests.get('http://shiuhsenang.com', proxies = {'http': proxy}, timeout = 5)
except requests.exceptions.Timeout:
	sys.exit(-1)