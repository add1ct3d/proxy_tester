import requests, sys

assert len(sys.argv) == 3

proxy = 'http://{}:{}'.format(sys.argv[1], sys.argv[2])
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'}

print proxy

try:
	r = requests.get('http://shiuhsenang.com', headers = headers, proxies = {'http': proxy}, timeout = 30)
	print r
except requests.exceptions.Timeout:
	sys.exit(-1)
except:
	sys.exit(-100)
