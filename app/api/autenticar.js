var jwt = require('jsonwebtoken');

module.exports = function(app){
    var api = {};
    
    //Valida o Login do Usuário e cria o Token de acesso. 
    api.autentica = function (req, res){
        
        var connection = app.conexao.connectionBD();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);
        
        var user = req.body;
        usuarioDAO.listarUsuario(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var usuario = resultado.find(function(usuario){
                    return usuario.login == user.login && usuario.senha == user.senha;
                });

                if(usuario == null){
                    /*console.log('Login ou senha inválidos');*/
                    res.sendStatus(401);
                }else{
                    var token = jwt.sign( {login: usuario.login}, app.get('secret'), { expiresIn: 86400 });
                    /*console.log('Autenticado: token adicionado na resposta');*/
                    res.set({'x-access-token': token,
                             'idUser' : usuario.cod_usuario}); 
                    res.end();
                }
            }
        });
        
        connection.end();
    };
    
    
    //Verifica o Token de acesso do Usuário.
    api.verificaToken = function(req, res, next){
        var token = req.headers['x-access-token'];
        if(token){
            /*console.log('Token recebido, decodificando');*/
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if(err){
                    /*console.log('Token rejeitado');*/
                    return res.sendStatus(401);
                }else{
                    /*console.log('Token aceito');*/
                    req.usuario = decoded;    
                    next();
                }
            });
        }else{
            /*console.log('Nenhum token enviado');*/
            return res.sendStatus(401);
        }
	};
    
    return api;
};