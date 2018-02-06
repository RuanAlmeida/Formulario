module.exports = function(app){
    
	app.all('/*', function(req, res){
        res.render('index', function(err, html) {
            res.send(html);
        });
    });
    
};