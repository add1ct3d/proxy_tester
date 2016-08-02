const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static(__dirname + '/'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.sendFile('index.html')
})

app.post('/proxy-check', function(req, res){
	console.log('host: ' + req.body.host)
	console.log('port: ' + req.body.port)

	res.json({
		summary: 'a',
		x_real_ip: 'b',
		x_real_ip_analysis: 'c',
		x_forwarded_for: 'd',
		x_forwarded_for_analysis: 'e',
		via: 'f',
		via_analysis: 'g'
	})
})

app.listen(8080, function(){
	console.log('Listening on port 8080...')
})