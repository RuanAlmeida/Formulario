module.exports = function(app){
    
    var autenticar = app.api.autenticar;
    
    app.route('/ipt/usuario')
        .post(autenticar.autentica);
    
    app.use('/ipt/*', autenticar.verificaToken);
    
};