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

	const sniff = exec('/bin/bash run.sh ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		console.log('err: ' + err)
		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
	})

	const request = exec('python request.py ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		console.log('err: ' + err)
		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
	})
})

app.listen(9000, function(){
	console.log('Listening on port 9000...')
})
