#!/bin/bash

if [ "$#" -ne 2 ]; then
	echo "{\"summary\": \"You didn't provide enough argument\"}"
else
	# curl -I -v -x http://$1:$2 http://shiuhsenang.com
	curl http://shiuhsenang.com &> /dev/null

	if [ "$?" -eq 0 ]; then
		output="$(cat /home/ubuntu/access.log | grep 5.6.7.8 | tail -1)"

		IFS='|' read -r -a array <<< "${output}"

		echo "{ \"x_real_ip\": \"${array[1]}\","
		echo " \"x_forwarded_for\": \"${array[2]}\","
		echo " \"via\": \"${array[3]}\","

		if [ "${array[1]}" == "-" ]; then
			echo " \"x_real_ip_analysis\": \"Your real ip is not visible\","
		else
			echo " \"x_real_ip_analysis\": \"Your real ip is exposed!\","
		fi

		if [ "${array[2]}" == "-" ]; then
			echo " \"x_forwarded_for_analysis\": \"Your real ip is not visible\","
		else
			echo " \"x_forwarded_for_analysis\": \"Your real ip is exposed!\","
		fi

		if [ "${array[3]}" == "-" ]; then
			echo " \"via_analysis\": \"People don't know you are using proxy\","
		else
			echo " \"via_analysis\": \"People know you are using proxy!\","
		fi

		if [ "${array[1]}" != "-" ] || [ "${array[2]}" != "-" ] ; then
			echo " \"summary\": \"Proxy server is transparent\"}"
		else
			if [ "${array[3]}" != "-" ]; then
				echo " \"summary\": \"Proxy server is anonymous\"}"
			else
				echo " \"summary\": \"Proxy server is elite anonymous\"}"
			fi
		fi
	else
		echo "{\"summary\": \"Ops, there is something wrong with this proxy check\"}"
	fi
fi