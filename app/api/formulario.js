module.exports = function(app){
    var api = {};
    
    //Lista os dados do Formulario.
    api.listaDadosFormulario = function (req, res){
        var cod_usuario = req.params.cod_usuario;
        
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);

        formularioDAO.listarDadosFormulario(cod_usuario, function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                
                if(resultado[0].cod_entidade){
                    if(resultado[0].cod_localidades){
                        var cod_localidades = resultado[0].cod_localidades.split(",");
                        var nomes = resultado[0].nomes.split(",");
                        var latitudes = resultado[0].latitudes.split(",");
                        var longitudes = resultado[0].longitudes.split(",");
                        var populacao = resultado[0].populacao.split(",");

                        var locais = new Array();
                        for(var i=0; i<nomes.length; i++){
                            locais[i] = {
                                cod_localidade: cod_localidades[i],
                                nome: nomes[i],
                                latitude: latitudes[i],
                                longitude: longitudes[i],
                                populacao: populacao[i]
                            }
                        }

                        var dadosFormulario = {
                            nome: resultado[0].nome,
                            email: resultado[0].email,
                            formulario: [{
                                cod_entidade: resultado[0].cod_entidade,
                                cod_usuario: resultado[0].cod_usuario,
                                municipio: resultado[0].municipio,
                                uf: resultado[0].uf,
                                cnpj: resultado[0].cnpj,
                                nome_prefeito: resultado[0].nome_prefeito,
                                nacionalidade_prefeito: resultado[0].nacionalidade_prefeito,
                                identidade_prefeito: resultado[0].identidade_prefeito,
                                orgao_expedidor: resultado[0].orgao_expedidor,
                                cpf_prefeito: resultado[0].cpf_prefeito,
                                residencia_prefeito: resultado[0].residencia_prefeito,
                                telefone1: resultado[0].telefone1,
                                telefone2: resultado[0].telefone2,
                                email_prefeito: resultado[0].email_prefeito,
                                aceite: resultado[0].aceite,
                                locais: locais
                            }]
                        };

                        res.status(200).json(dadosFormulario);
                        
                    }else{
                        var dados = {
                            nome: resultado[0].nome,
                            email: resultado[0].email,
                            formulario: [{
                                cod_entidade: resultado[0].cod_entidade,
                                cod_usuario: resultado[0].cod_usuario,
                                municipio: resultado[0].municipio,
                                uf: resultado[0].uf,
                                cnpj: resultado[0].cnpj,
                                nome_prefeito: resultado[0].nome_prefeito,
                                nacionalidade_prefeito: resultado[0].nacionalidade_prefeito,
                                identidade_prefeito: resultado[0].identidade_prefeito,
                                orgao_expedidor: resultado[0].orgao_expedidor,
                                cpf_prefeito: resultado[0].cpf_prefeito,
                                residencia_prefeito: resultado[0].residencia_prefeito,
                                telefone1: resultado[0].telefone1,
                                telefone2: resultado[0].telefone2,
                                aceite: resultado[0].aceite,
                                email_prefeito: resultado[0].email_prefeito
                            }]
                        }
                        res.status(200).json(dados);
                    }
                    
                }else{
                    var dados = {
                            nome: resultado[0].nome,
                            email: resultado[0].email,
                            formulario: []
                        }
                    res.status(200).json(dados);
                }
            }
        });

        connection.end();
    };

    
    
    //Salva os dados do Formulario.
    api.salvaFormulario = function(req, res){
        var formulario = req.body;
        
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        var error = false;
        var j = 0;
        
        var entidade = {
            cod_usuario: formulario.cod_usuario,
            municipio: formulario.municipio,
            uf: formulario.uf,
            cnpj: formulario.cnpj,
            nome_prefeito: formulario.nome_prefeito,
            nacionalidade_prefeito: formulario.nacionalidade_prefeito,
            identidade_prefeito: formulario.identidade_prefeito,
            orgao_expedidor: formulario.orgao_expedidor,
            cpf_prefeito: formulario.cpf_prefeito,
            residencia_prefeito: formulario.residencia_prefeito,
            telefone1: formulario.telefone1,
            telefone2: formulario.telefone2,
            email_prefeito: formulario.email_prefeito
        };
        
        formularioDAO.salvarFormulario(entidade, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                salvaLocalidade(resultado.insertId);
            }
        });
        
        connection.end();
        
        function salvaLocalidade(codEntidade){
            var connection = app.conexao.connectionBD();
            var formularioDAO = new app.infra.FormularioDAO(connection);
            
            var locais = req.body.locais;
            for(var i=0; i<locais.length; i++){
                var localidade = {
                    cod_entidade: codEntidade,
                    nome: locais[i].nome,
                    latitude: locais[i].latitude,
                    longitude: locais[i].longitude,
                    populacao: locais[i].populacao
                };
                
                formularioDAO.salvarLocalidade(localidade, function(erro, resultado){
                    if(erro){
                        console.log(erro);
                        error = true;
                    }

                    j++;

                    if(i == j){
                        if(error){
                            res.sendStatus(500);
                        }else{
                            res.sendStatus(200);
                        }
                    }
                });
                
            };
            
            connection.end();
        }
    };
    
    
    
    //Edita os dados do Formulario com base no ID.
    api.editaFormulario = function(req, res){
        var formulario = req.body;
        
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        var cod_entidade = req.params.cod_entidade;
        var entidade = {
            cod_usuario: formulario.cod_usuario,
            municipio: formulario.municipio,
            uf: formulario.uf,
            cnpj: formulario.cnpj,
            nome_prefeito: formulario.nome_prefeito,
            nacionalidade_prefeito: formulario.nacionalidade_prefeito,
            identidade_prefeito: formulario.identidade_prefeito,
            orgao_expedidor: formulario.orgao_expedidor,
            cpf_prefeito: formulario.cpf_prefeito,
            residencia_prefeito: formulario.residencia_prefeito,
            telefone1: formulario.telefone1,
            telefone2: formulario.telefone2,
            email_prefeito: formulario.email_prefeito
        };
        
        formularioDAO.editarFormulario(entidade, cod_entidade, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                salvaLocalidade();
            }
        });
        
        connection.end();
        
        function salvaLocalidade(){
            var connection = app.conexao.connectionBD();
            var formularioDAO = new app.infra.FormularioDAO(connection);
            
            var error = false;
            var j = 0;
            
            var locais = req.body.locais;
            if(locais.length == 0){
                res.sendStatus(200);
            }else{
                for(var i=0; i<locais.length; i++){
                    var localidade = {
                        cod_entidade: cod_entidade,
                        nome: locais[i].nome,
                        latitude: locais[i].latitude,
                        longitude: locais[i].longitude,
                        populacao: locais[i].populacao
                    };

                    formularioDAO.salvarLocalidade(localidade, function(erro, resultado){
                        if(erro){
                            console.log(erro);
                            error = true;
                        }

                        j++;

                        if(i == j){
                            if(error){
                                res.sendStatus(500);
                            }else{
                                res.sendStatus(200);
                            }
                        }
                    });

                };
            }
            
            connection.end();
        }
    };
    
    
    
    //Apaga uma Localidade com base no ID.
    api.apagaLocalidade = function(req, res){
        var cod_localidade = req.params.cod_localidade;

        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);

        formularioDAO.apagarLocalidade(cod_localidade, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Coloca "1" na coluna Aceite em Entidade caso o Usuário tenha aceitado o termo de adesão.
    api.aceitaTermo = function(req, res){
        var cod_entidade = req.params.cod_entidade;
        var aceite = req.body;
        
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        formularioDAO.aceitarTermo(aceite, cod_entidade, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
        
        connection.end();
    };
    
    
    return api;
};