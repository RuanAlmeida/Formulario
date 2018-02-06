var jwt = require('jsonwebtoken');
var htmlToPdf = require('html-to-pdf');
var ejs = ejs = require('ejs');

module.exports = function(app){
    var api = {};
    
    api.geraPDF = function(req, res){
        var token = req.params.token;
        if(token){
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if(err){
                    return res.sendStatus(401);
                
                }else{
                    var cod_usuario = req.params.cod_usuario;
                    var conteudo;
                    var locais = new Array();
                    var date = new Date();
                    var dataDocumento = date.toISOString().slice(8,10)+"/"+date.toISOString().slice(5,7)+"/"+date.toISOString().slice(0,4);

                    var connection = app.conexao.connectionBD();
                    var formularioDAO = new app.infra.FormularioDAO(connection);

                    formularioDAO.listarDadosFormulario(cod_usuario, function (erro, resultado){
                        if(erro){
                            console.log(erro);
                            return res.sendStatus(500);
                            
                        }else{
                            if(resultado[0].cod_localidades){
                                var nomes = resultado[0].nomes.split(",");
                                var latitudes = resultado[0].latitudes.split(",");
                                var longitudes = resultado[0].longitudes.split(",");
                                var populacao = resultado[0].populacao.split(",");

                                for(var i=0; i<nomes.length; i++){
                                    locais[i] = {
                                        nome: nomes[i],
                                        latitude: latitudes[i],
                                        longitude: longitudes[i],
                                        populacao: populacao[i]
                                    }
                                }

                                conteudo = {
                                    municipio: resultado[0].municipio,
                                    uf: resultado[0].uf,
                                    cnpj: resultado[0].cnpj,
                                    nome_prefeito: resultado[0].nome_prefeito,
                                    nacionalidade_prefeito: resultado[0].nacionalidade_prefeito,
                                    identidade_prefeito: resultado[0].identidade_prefeito,
                                    orgao_expedidor: resultado[0].orgao_expedidor,
                                    cpf_prefeito: resultado[0].cpf_prefeito,
                                    residencia_prefeito: resultado[0].residencia_prefeito,
                                    dataDocumento: dataDocumento,
                                    locais: locais
                                };

                            }else{
                                conteudo = {
                                    municipio: resultado[0].municipio,
                                    uf: resultado[0].uf,
                                    cnpj: resultado[0].cnpj,
                                    nome_prefeito: resultado[0].nome_prefeito,
                                    nacionalidade_prefeito: resultado[0].nacionalidade_prefeito,
                                    identidade_prefeito: resultado[0].identidade_prefeito,
                                    orgao_expedidor: resultado[0].orgao_expedidor,
                                    cpf_prefeito: resultado[0].cpf_prefeito,
                                    residencia_prefeito: resultado[0].residencia_prefeito,
                                    dataDocumento: dataDocumento,
                                    locais: locais
                                };
                            }

                            var html;
                            ejs.renderFile('./public/js/diretivas/termoAdesao.ejs', conteudo, function(erro, resultado) {
                                if(erro){
                                    console.log(erro);
                                    return res.sendStatus(500);
                                }else{
                                    html = resultado;
                                }
                            });
                            
                            var nomePDF = resultado[0].login;
                            var diretorio = 'public/views/' + nomePDF + '.pdf';

                            htmlToPdf.setInputEncoding('UTF-8');
                            htmlToPdf.setOutputEncoding('UTF-8');
                            htmlToPdf.convertHTMLString(html, diretorio, function (erro, success) {
                                if (erro) {
                                    console.log(error);
                                    return res.sendStatus(500);
                                } else {
                                    var filename = 'Termo de Adesão ' + resultado[0].municipio + '.pdf'; 
                                    res.download(diretorio, filename);
                                }
                            });
                        }
                    });

                    connection.end();
                }
            });
            
        }else{
            return res.sendStatus(401);
        }
    };
    
    return api;
};