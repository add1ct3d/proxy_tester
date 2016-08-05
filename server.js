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

	const sniff = exec('python sniff.py ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		console.log('err: ' + err)
		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
	})

	const request = exec('curl -s -x ' + req.body.host + ':' + req.body.port + ' -m 20 shiuhsenang.com > /dev/null', function(err, stdout, stderr){
		console.log('err: ' + err)
		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
	})
})

app.listen(9000, function(){
	console.log('Listening on port 9000...')
})
