module.exports = function(app){

    var formulario = app.api.formulario;
    var gerarPDF = app.api.gerarPDF;
    
    //Rota para salvar os dados do Formulario e as Localidades.
    app.route('/ipt/formulario')
        .post(formulario.salvaFormulario);
    
    //Rota para listar todos os dados do Formulario.
    app.route('/ipt/formulario/:cod_usuario')
        .get(formulario.listaDadosFormulario);
    
    //Rota para editar os dados do Formulario e as Localidades.
    app.route('/ipt/formulario/:cod_entidade')
        .put(formulario.editaFormulario);
    
    //Rota para apagar uma Localidade.
    app.route('/ipt/localidade/:cod_localidade')
        .delete(formulario.apagaLocalidade);
    
    //Rota para atualizar se o Usuário aceitou o termo de adesão.
    app.route('/ipt/aceitarTermo/:cod_entidade')
        .put(formulario.aceitaTermo);
    
    //Rota para gerar o PDF.
    app.route('/pdf/:cod_usuario/:token')
        .get(gerarPDF.geraPDF);
    
    
};