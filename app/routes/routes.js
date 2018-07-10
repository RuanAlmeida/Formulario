module.exports = (app) => {

    var formulario = app.api.formulario;
    var exportar = app.api.exportarExcel;
    
    //Rota para listar todos os Estados.
    app.route('/ipt/estados')
        .get(formulario.listaEstados);
    
    //Rota para listar todos os dados.
    app.route('/ipt/form/')
        .get(formulario.listaform)
        .put(formulario.editaInformacoes); //Rota para editar os dados do Formulario.
    
    //Rota para listar os Municipios de uma determinada UF.
    app.route('/ipt/municipios/:uf')
        .get(formulario.listarMunicipios);
    
    //Rota para exportar os dados do Banco de Dados em Excel.
    app.route('/excel')
        .get(exportar.exportarExcel);
};