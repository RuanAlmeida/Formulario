var express = require('express')
	,app = express()
	,consign = require('consign')
	,bodyParser = require('body-parser');

app.use(express.static('./public'));

app.set('view engine','ejs');
app.set('views', './public');
app.use(bodyParser.json());

consign({cwd : 'app'})
    .include('conexao')
    .then('api')
	.then('routes')
    .then('infra')
	.into(app);

module.exports = app;