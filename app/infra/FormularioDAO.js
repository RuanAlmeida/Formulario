function FormularioDAO(connection){
	this._connection = connection;
}

//Query para listar todos os dados.
FormularioDAO.prototype.listarform = function(callback){
    this._connection.query('SELECT form.*, municipio.uf, municipio.nome_municipio FROM form INNER JOIN municipio ON form.cod_ibge = municipio.cod_ibge ORDER BY municipio.uf, municipio.nome_municipio', callback);
};

//Query para listar os Municipios de uma determinada UF.
FormularioDAO.prototype.listarMunicipios = function(uf, callback){
    this._connection.query('SELECT * FROM municipio WHERE uf = ? ORDER BY nome_municipio', [uf], callback);
};

//Query para editar as informações do Formulario.
FormularioDAO.prototype.editarInformacoes = function(dados, cod_ibge, callback){
	this._connection.query('UPDATE form SET ? WHERE cod_ibge = ?', [dados, cod_ibge], callback);
}

module.exports = () => {
	return FormularioDAO;
};