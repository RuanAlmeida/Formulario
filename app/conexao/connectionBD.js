//Carrega o modulo do mysql.
var mysql = require('mysql');

//Cria a conexão com o Banco de Dados.
var connectMYSQL = () => {
	return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'form_ipt'
	});
};

//Retorna a conexão.
module.exports = () => {
	return connectMYSQL;
};