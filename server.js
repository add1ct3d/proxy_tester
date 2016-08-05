const express = require('express')
const bodyParser = require('body-parser')
const exec = require('child_process').exec
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/proxy_tester', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.post('/proxy_tester/check', function(req, res){
	// validate user input here
	if(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(req.body.host) == false){
		res.json({'summary': 'invalid IP'})
	}

	if(/^[0-9]+$/.test(req.body.port) == false){
		res.json({'summary': 'invalid port'})
	}

	// start sniffing
	const sniff = exec('/bin/bash run.sh ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		if(err){
			res.json({'summary': err})
		}else{
			if(stdout.length == 0){
				res.json({'summary': 'proxy connection timed out'})
			}else{
				res.json(JSON.parse(stdout))
			}
		}
	})

	// send request
	const request = exec('python request.py ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		if(err){
			res.json({'summary': err})
		}
	})
})

app.listen(9000, function(){
	console.log('Listening on port 9000...')
})
