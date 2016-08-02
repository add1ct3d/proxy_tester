const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/proxy_tester', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.post('/proxy_tester/check', function(req, res){
	const script = spawn('./run.sh', [req.body.host, req.body.port])

	script.stdout.on('data', function(data){
		const jsondata = JSON.parse(data)

		res.json(jsondata)
	})

	script.stderr.on('data', function(data){
		// console.log(data)
		res.json({summary: "Ops, there is something wrong with this proxy check"})
	})
})

app.listen(9000, function(){
	console.log('Listening on port 9000...')
})
