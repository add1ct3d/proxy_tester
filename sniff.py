import sys, re, os
from scapy.all import *

assert len(sys.argv) == 3

def callback(p):
	#print p[IP].src + ':' + str(p[TCP].sport) + ' -> ' + p[IP].dst + ':' + str(p[TCP].dport)

	if  Raw in p:
		raw = str(p[Raw])
		
		header = raw.split('\r\n\r\n')[0]

		print header

filter = 'tcp and src host {} and dst port 80'.format(sys.argv[1])

print filter

sniff(filter = filter, prn = callback, store = 0, timeout = 30)
