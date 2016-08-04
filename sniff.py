import sys, re, os
from scapy.all import *

assert len(sys.argv) == 3

def callback(p):
	if IP in p and p[IP].src == host and p[IP].dst == '52.42.253.195' and TCP in p and p[TCP].dport == 80 and Raw in p:
		raw = str(p[Raw])
		
		header = raw.split('\r\n\r\n')[0]

		print header

filter = 'tcp and host {} and port {}'.format(sys.argv[1], sys.argv[2])

sniff(filter = filter, prn = callback, store = 0, timeout = 10)
