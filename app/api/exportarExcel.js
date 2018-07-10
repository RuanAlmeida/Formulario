var excel = require('node-excel-export');

module.exports = (app) => {
    var api = {};
    
    api.exportarExcel = function(req, res){
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        formularioDAO.listarform((erro, resultado) => {
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                const styles = {
                    header: {
                        /*fill: {
                            fgColor: {
                                rgb: '000000'
                            }
                        },*/
                        font: {
                            /*color: {
                                rgb: 'FFFFFF'
                            },*/
                            sz: 14,
                            bold: true
                        },
                        alignment: {
                            horizontal: 'center'
                        }
                    } 
                };
                const heading = [];

                const specification = {
                    cod_ibge: {
                        displayName: 'Código IBGE', 
                        headerStyle: styles.header, 
                        cellStyle: '',
                        width: 105
                    },
                    uf: {
                        displayName: 'UF',
                        headerStyle: styles.header,
                        cellStyle: '',
                        width: 50 
                    },
                    nome_municipio: {
                        displayName: 'Município',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 225 
                    },
                    municipio_contatado: {
                        displayName: 'Município contatado',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 175 
                    },
                    oficio_enviado: {
                        displayName: 'Email enviado (Ofício)',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 185 
                    },
                    oficio_recebido: {
                        displayName: 'Recebimento ofício',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 165 
                    },
                    link_enviado: {
                        displayName: 'Link Enviado',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 108 
                    },
                    termo_adesao: {
                        displayName: 'Assinatura Prefeito',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 225 
                    },
                    termo_ok: {
                        displayName: 'Termo OK',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 225 
                    },
                    ass_sei: {
                        displayName: 'Ministro SEI',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 225 
                    },
                    processo_sei: {
                        displayName: 'Número SEI',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 225 
                    },
                    nome_prefeito: {
                        displayName: 'Nome do prefeito',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 220 
                    },
                    solicitante: {
                        displayName: 'Solicitante',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 220 
                    },
                    telefone1: {
                        displayName: 'Telefone',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 220 
                    },
                    email1: {
                        displayName: 'Email',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 220 
                    },
                    email_oficial: {
                        displayName: 'Email oficial',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 220 
                    },
                    obs: {
                        displayName: 'Observação',
                        headerStyle: styles.header,
                        cellStyle: '', 
                        width: 220 
                    }
                }

                const dataset = resultado;

                const merges = [];
                const report = excel.buildExport(
                    [
                        {
                            name: 'Report',
                            heading: heading,
                            merges: merges,
                            specification: specification,
                            data: dataset
                        }
                    ]
                );

                res.attachment('Internet para Todos.xlsx');
                return res.send(report);
            }
        });

        connection.end();
    };
    
    return api;
};