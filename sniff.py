import sys, re, os, requests
from scapy.all import *

ERR_ARG_COUNT		= 1
ERR_ARG_INVALID 	= 2

if len(sys.argv) != 2:
	sys.exit(ERR_ARG_COUNT)

if not re.match(sys.argv[0], '[\d]+\.[\d]+\.[\d]+\.[\d]+'):
	sys.exit(ERR_ARG_INVALID)

if not re.match(sys.argv[1], '[\d]+'):
	sys.exit(ERR_ARG_INVALID)

if int(sys.argv[1]) > 65535:
	sys.exit(ERR_ARG_INVALID)

host = sys.argv[0]
port = int(sys.argv[1])

def callback(x):
	if IP in x and x[IP].src == host and TCP in x and x[TCP].sport == port and Raw in x:
		raw = str(x[Raw])
		
		header = raw.split('\r\n\r\n')[0]

		print header

sniff(filter = 'tcp and host ' + host + ' and port ' + str(port), prn = callback, store = 0)

r = requests.get('http://shiuhsenang.com', proxies = { 'http': 'http://' + host + ':' + port })

