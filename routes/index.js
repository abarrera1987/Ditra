
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
exports.login2 = function(req, res){
  res.render('login2', { title: 'Digital Transfer' });
};
exports.inicio = function(req, res){
  res.render('inicio', { title: 'Digital Transfer' });
};