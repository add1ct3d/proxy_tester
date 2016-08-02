const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn
const app = express()

app.use(express.static(__dirname + '/'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.sendFile('index.html')
})

app.post('/proxy-check', function(req, res){
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

app.listen(8080, function(){
	console.log('Listening on port 8080...')
})