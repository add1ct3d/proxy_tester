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
	const sniff = exec('python sniff.py ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		console.log(err)
		console.log(stdout)
		console.log(stderr)
	})

	const request = exec('python request.py ' + req.body.host + ' ' + req.body.port, function(err, stdout, stderr){
		console.log(err)
		console.log(stdout)
		console.log(stderr)
	})
})

app.listen(9000, function(){
	console.log('Listening on port 9000...')
})
