/*hola a migos
/**
 * Module dependencies.
 */
 
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var models = require('./models');
models.createSchema(mongoose);

var fs = require('fs');
var async = require('async');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'hola' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.post('/', routes.index);
app.get('/users', user.list);
app.get('/registro', routes.registro);
app.post("/index", function(req,res){
  var nombreu = req.body.nombres;
  var apellido = req.body.apellido;
  var dia = req.body.dia;
  var mes = req.body.mes;
  var año = req.body.año;
  var sexo = req.body.sexo;
  var cedula = req.body.cedula;
  var telefono = req.body.telefono;
  var email = req.body.correo;
  var nick = req.body.nick;
  var contraseña = req.body.contraseña;
  var saldo = req.body.saldo;
     new Usuario({
        nombre: nombreu,
        apellido: apellido,
        dia: dia,
        mes: mes,
        año: año,
        sexo: sexo,
        cedula: cedula,
        telefono: telefono,
        correo: email,
        nick: nick,
        contraseña: contraseña
        
      }).save(function(err,docs){
      if(err) res.send("error");
      res.send(docs);      
   });   
   res.render('index');
  });
app.get('/recarga', function(req, res){
    var recarga = req.body,carga;    
    if (req.session.miVariable!=null) {        
    Usuario.findOne({nick: req.session.miVariable}).exec(function (err, resources) {
    Usuario.findOne({nick: req.session.miVariable}).exec(function (err, docs) {      
              res.render("recarga", {
                  usuarios: resources,
                  users: docs,
                  title: "Buscar Usuario" 

     });
     });
     });              
  } else{
    res.render('index',{mensaje: "Debes iniciar sesion primero para ingresar.",title:'Inicio'});
  };     
});
app.post('/recargas', function(req, res){
  var nusaldo = req.body.carga;
  var resta;
  resta :Usuario.saldo - nusaldo
  res.render('recarga');

  });
app.get('/inicio', function(req, res){
if (req.session.miVariable != null) {
      Usuario.findOne({nick: req.session.miVariable}, function  (err, docs) {
        res.render('inicio', {users: docs, title: 'Inicio'});
      })
    } else{
      res.render('index',{mensaje: "No has iniciado sesion."});
    };
   });    
app.post("/inicio", function(req, res){
 Usuario.findOne({nick: req.body.nicks, contraseña: req.body.contraseñas } ,function (err, usuario) {
    //Se verifica si encontro algun usuario 
    if (usuario == null) {
      //como no encontro ningun usuario re direcciona a login con un mensaje 
      res.render('index',{mensaje: "La contraseña y el usuario que introdujiste no coinciden."});
    } else{
      req.session.miVariable = usuario.nick;
      res.render('inicio' ,{users: usuario , usua: req.session.loggedIn});
    } 
  });
 
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
