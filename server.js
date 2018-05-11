const cp = require('child_process');
const express = require('express');
const port = 3000;

const app = express();

app.use('/backstop_data', express.static('backstop_data'));

app.get('/', function (req, res) {
	res.writeHead(301, { 'Location': '/test' });
	res.end();
});

app.get('/test', function (req, res) {
	console.log('Starting backstop test');
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('Starting backstop test ' + new Date().toString() + ' <br/>')
	cp.exec('npm run test', (error, stdout, stderr) => {
		if (error) {
			res.end('Error:', error.message);
			return;
		}
		console.log('Finished backstop test');
		console.log(stdout);
		res.write('<a href="/backstop_data/html_report/index.html">See results here</a>')
		res.write('<pre>' + stdout + '</pre>');
		res.end();
	});
});

app.listen(port, function () {
	console.log('App is listening on port 3000!');
});