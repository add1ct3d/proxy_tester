import requests, sys

assert len(sys.argv) == 3

proxy = 'http://{}:{}'.format(sys.argv[1], sys.argv[2])

print proxy

try:
	r = requests.get('http://shiuhsenang.com', proxies = {'http': proxy}, timeout = 30)
	print r
except requests.exceptions.Timeout:
	sys.exit(-1)
except:
	sys.exit(-100)
