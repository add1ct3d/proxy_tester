const express = require('express')
const bodyParser = require('body-parser')
const exec = require('child_process').exec
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.post('/check', function(req, res){
	console.log('got a post')
	
	// validate user input here
	if(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(req.body.host) == false){
		res.json({'summary': 'invalid IP'})
	}

	if(/^[0-9]+$/.test(req.body.port) == false){
		res.json({'summary': 'invalid port'})
	}

	// start sniffing
	const sniff = exec('python sniff.py ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
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

app.listen(2222, function(){
	console.log('Listening on port 2222...')
})
