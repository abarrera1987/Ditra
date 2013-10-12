
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Digital Transfer' });
};

exports.registro = function(req, res){
  res.render('registro', { title: 'Digital Transfer' });
};
exports.buscar = function(req, res){
  res.render('buscar', { title: 'Digital Transfer' });
};
exports.login = function(req, res){
  res.render('login', { title: 'Digital Transfer' });
};