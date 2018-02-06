function UsuarioDAO(connection){
	this._connection = connection;
}

//Lista o cod_usuario, login e a senha dos Usuários.
UsuarioDAO.prototype.listarUsuario = function(callback){
	this._connection.query('SELECT cod_usuario, login, senha FROM usuario', callback);
}

module.exports = function(){
	return UsuarioDAO;
};