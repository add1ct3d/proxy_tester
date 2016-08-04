import sys, re, os, json
from scapy.all import *

assert len(sys.argv) == 3

def callback(p):
	#if IP in p and TCP in p:
	#	print p[IP].src + ':' + str(p[TCP].sport) + ' -> ' + p[IP].dst + ':' + str(p[TCP].dport)

	if IP in p and p[IP].src == sys.argv[1]  and TCP in p and p[TCP].dport == 80 and Raw in p:
		raw = str(p[Raw])
		
		header = raw.split('\r\n\r\n')[0]

		d = dict()

		for i, field in enumerate(header.split('\r\n')):
			if i > 0:
				d[field.split(': ')[0]] = field.split(': ')[1]

		if 'X-Forwarded-For' in d:
			d['summary'] = 'The proxy server ' + sys.argv[1] + ':' + sys.argv[2] + ' is transparent'
		elif 'Via' in d:
			d['summary'] = 'The proxy server ' + sys.argv[1] + ':' + sys.argv[2] + ' is anonymous'
		elif:
			d['summary'] = 'The proxy server ' + sys.argv[1] + ':' + sys.argv[2] + ' is elite anonymous'

		json.dumps(d)
		sys.exit(0)

filter = 'tcp and host {} and port {}'.format(sys.argv[1], sys.argv[2])

sniff(filter = filter, prn = callback, store = 0, timeout = 30)
