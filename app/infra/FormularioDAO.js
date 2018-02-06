function FormularioDAO(connection){
	this._connection = connection;
}

//Query para lista os dados do Formulario e suas Localidades.
FormularioDAO.prototype.listarDadosFormulario = function(cod_usuario, callback){
	this._connection.query('SELECT usuario.nome, usuario.email, usuario.login, entidade.cod_entidade, entidade.cod_usuario, entidade.municipio, entidade.uf, entidade.cnpj, entidade.nome_prefeito, entidade.nacionalidade_prefeito, entidade.identidade_prefeito, entidade.orgao_expedidor, entidade.cpf_prefeito, entidade.residencia_prefeito, entidade.telefone1, entidade.telefone2, entidade.email_prefeito, entidade.aceite, GROUP_CONCAT(localidade.cod_localidade) AS "cod_localidades", GROUP_CONCAT(localidade.nome) AS "nomes" , GROUP_CONCAT(localidade.latitude) AS "latitudes", GROUP_CONCAT(localidade.longitude) AS "longitudes", GROUP_CONCAT(localidade.populacao) AS "populacao" from usuario INNER JOIN entidade ON usuario.cod_usuario = entidade.cod_usuario LEFT JOIN localidade ON entidade.cod_entidade = localidade.cod_entidade WHERE usuario.cod_usuario = ?', [cod_usuario], callback);
}

//Query para atualizar o "aceite" do termo de adesão em Entidade.
FormularioDAO.prototype.aceitarTermo = function(aceite, cod_entidade, callback){
	this._connection.query('UPDATE entidade SET ? WHERE cod_entidade = ?', [aceite, cod_entidade], callback);
}


//---------------Querys de Entidade---------------//

//Query para inserir os dados do Formulario.
FormularioDAO.prototype.salvarFormulario = function(entidade, callback){
	this._connection.query('INSERT INTO entidade SET ?', entidade, callback);
}

//Query para inserir os dados do Formulario.
FormularioDAO.prototype.editarFormulario = function(entidade, cod_entidade, callback){
	this._connection.query('UPDATE entidade SET ? WHERE cod_entidade = ?', [entidade, cod_entidade], callback);
}


//---------------Querys de localidade---------------//

//Query para inserir as Localidades do Formulario.
FormularioDAO.prototype.salvarLocalidade = function(localidade, callback){
	this._connection.query('INSERT INTO localidade SET ?', localidade, callback);
}

//Query para apagar uma Localidade.
FormularioDAO.prototype.apagarLocalidade = function(cod_localidade, callback){
	this._connection.query('DELETE FROM localidade WHERE cod_localidade = ?', [cod_localidade], callback);
}

module.exports = function(){
	return FormularioDAO;
};