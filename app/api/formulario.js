module.exports = (app) => {
    var api = {};
    
    //Array com os Estados e suas respectivas Ufs.
    var estado = [{ uf: 'AC', nome: 'Acre'}, { uf: 'AL', nome: 'Alagoas'}, { uf: 'AM', nome: 'Amazonas'}, { uf: 'AP', nome: 'Amapá'}, { uf: 'BA', nome: 'Bahia'}, { uf: 'CE', nome: 'Ceará'}, { uf: 'DF', nome: 'Distrito Federal'}, { uf: 'ES', nome: 'Espírito Santo'}, { uf: 'GO', nome: 'Goiás'}, { uf: 'MA', nome: 'Maranhão'}, { uf: 'MT', nome: 'Mato Grosso'}, { uf: 'MS', nome: 'Mato Grosso do Sul'}, { uf: 'MG', nome: 'Minas Gerais'}, { uf: 'PA', nome: 'Pará'}, { uf: 'PB', nome: 'Paraíba'}, { uf: 'PR', nome: 'Paraná'}, { uf: 'PE', nome: 'Pernambuco'}, { uf: 'PI', nome: 'Piauí'}, { uf: 'RJ', nome: 'Rio de Janeiro'}, { uf: 'RN', nome: 'Rio Grande do Norte'}, { uf: 'RS', nome: 'Rio Grande do Sul'}, { uf: 'RO', nome: 'Rondônia'}, { uf: 'RR', nome: 'Roraima'}, { uf: 'SC', nome: 'Santa Catarina'}, { uf: 'SP', nome: 'São Paulo'}, { uf: 'SE', nome: 'Sergipe'}, { uf: 'TO', nome: 'Tocantins'}];
    
    
    //Retorna o Array de Estados.
    api.listaEstados = (req, res) => {
        res.status(200).json(estado);
    };
    
    
    //Lista todos os dados.
    api.listaform = (req, res) => {
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        formularioDAO.listarform((erro, resultado) => {
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });
        
        connection.end();
    } 
    
    //Lista os Municipios de uma determinado UF.
    api.listarMunicipios = (req, res) => {
        var { uf } = req.params;
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        formularioDAO.listarMunicipios(uf, (erro, resultado) => {
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });
        
        connection.end();
    }
    
    
    //Edita as informações com base no cod_ibge.
    api.editaInformacoes = (req, res) => {
        var connection = app.conexao.connectionBD();
        var formularioDAO = new app.infra.FormularioDAO(connection);
        
        var dados = {
                cod_ibge: req.body.cod_ibge,
                municipio_contatado: req.body.municipio_contatado,
                nome_prefeito: req.body.nome_prefeito,
                solicitante: req.body.solicitante,
                telefone1: req.body.telefone1,
                email1: req.body.email1,
                email_oficial: req.body.email_oficial,
                oficio_enviado: req.body.oficio_enviado,
                oficio_recebido: req.body.oficio_recebido,
                termo_adesao: req.body.termo_adesao,
                link_enviado: req.body.link_enviado,
                termo_ok: req.body.termo_ok,
                ass_sei: req.body.ass_sei,
                processo_sei: req.body.processo_sei,
                obs: req.body.obs
        };
        
        console.log('\n-------------------------------------------------------');
        console.log(dados);
        
        var cod_ibge = req.body.cod_ibge;
        formularioDAO.editarInformacoes(dados, cod_ibge, (erro, resultado) => {
            if (erro){
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